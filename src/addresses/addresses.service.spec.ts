import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { GetAddressDto } from './dto/get-address.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AddressesService', () => {
  let service: AddressesService;
  let configService: ConfigService;
  let addressRepository: any;

  const mockAddressRepository = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('https://api-adresse.data.gouv.fr/search/'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
    configService = module.get<ConfigService>(ConfigService);
    addressRepository = module.get(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAddresses', () => {
    const getAddressDto: GetAddressDto = { q: '35+rue+de+koestlach' };
    const mockApiResponse = {
      features: [
        {
          properties: {
            label: '35 Rue de Koestlach 68480 Vieux-Ferrette',
            housenumber: '35',
            street: 'Rue de Koestlach',
            postcode: '68480',
            citycode: '68347',
          },
          geometry: {
            coordinates: [7.295802, 47.503982],
          },
        },
      ],
    };

    const expectedAddress = {
      label: '35 Rue de Koestlach 68480 Vieux-Ferrette',
      housenumber: '35',
      street: 'Rue de Koestlach',
      postcode: 68480,
      citycode: 68347,
      latitude: '47.503982',
      longitude: '7.295802',
      id: 3,
    };

    it('should return address information when API call is successful', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      mockAddressRepository.save.mockResolvedValue({
        ...expectedAddress,
        id: 1,
      });

      const result = await service.getAddresses(getAddressDto);
      expect(result).toEqual({ ...expectedAddress, id: 1 });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api-adresse.data.gouv.fr/search/35+rue+de+koestlach',
      );
    });

    it('should throw NotFoundException when no address is found', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ features: [] }),
      });

      await expect(service.getAddresses(getAddressDto)).rejects.toThrow(
        new HttpException(
          {
            error:
              'Adresse non trouvée. Aucun résultat ne correspond à votre recherche.',
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should throw HttpException when API call fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });

      await expect(service.getAddresses(getAddressDto)).rejects.toThrow(
        new HttpException(
          {
            error: "Erreur serveur : impossible de contacter l'API externe.",
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getRisks', () => {
    const addressId = 1;
    const mockAddress = {
      id: 1,
      latitude: '47.503982',
      longitude: '7.295802',
    };

    const mockRisksResponse = {
      adresse: {
        libelle: '35 Rue de Koestlach 68480 Vieux-Ferrette',
        longitude: 7.295802,
        latitude: 47.503983,
      },
      commune: {
        libelle: 'Vieux-Ferrette',
        codePostal: '68480',
        codeInsee: '68347',
      },
      url: 'https://georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport2?typeForm=adresse&city=Vieux-Ferrette&codeInsee=68347&lon=7.295802&lat=47.503982&adresse=35+Rue+de+Koestlach+68480+Vieux-Ferrette',
      risquesNaturels: {
        inondation: {
          present: true,
          libelle: 'Inondation',
        },
        risqueCotier: {
          present: false,
          libelle: 'Risques côtiers (submersion marine, tsunami)',
        },
        seisme: {
          present: true,
          libelle: 'Séisme',
        },
        mouvementTerrain: {
          present: true,
          libelle: 'Mouvements de terrain',
        },
        reculTraitCote: {
          present: false,
          libelle: 'Recul du trait de côte',
        },
        retraitGonflementArgile: {
          present: true,
          libelle: 'Retrait gonflement des argiles',
        },
        avalanche: {
          present: false,
          libelle: 'Avalanche',
        },
        feuForet: {
          present: false,
          libelle: 'Feu de forêt',
        },
        eruptionVolcanique: {
          present: false,
          libelle: 'Volcan',
        },
        cyclone: {
          present: false,
          libelle: 'Vent violent',
        },
        radon: {
          present: true,
          libelle: 'Radon',
        },
      },
      risquesTechnologiques: {
        icpe: {
          present: false,
          libelle: 'Installations industrielles classées (ICPE)',
        },
        nucleaire: {
          present: false,
          libelle: 'Nucléaire',
        },
        canalisationsMatieresDangereuses: {
          present: true,
          libelle: 'Canalisations de transport de matières dangereuses',
        },
        pollutionSols: {
          present: false,
          libelle: 'Pollution des sols',
        },
        ruptureBarrage: {
          present: false,
          libelle: 'Rupture de barrage',
        },
        risqueMinier: {
          present: false,
          libelle: 'Risques miniers',
        },
      },
    };

    it('should return risks information when both database and API calls are successful', async () => {
      mockAddressRepository.findOneOrFail.mockResolvedValue(mockAddress);
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRisksResponse),
      });

      const result = await service.getRisks(addressId);
      expect(result).toEqual(mockRisksResponse);
      expect(mockAddressRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: addressId },
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('7.295802,47.503982'),
      );
    });

    it('should throw HttpException when address is not found', async () => {
      mockAddressRepository.findOneOrFail.mockRejectedValue(new Error());

      await expect(service.getRisks(addressId)).rejects.toThrow(
        new HttpException(
          { error: 'Adresse non trouvée.' },
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should throw HttpException when API call fails', async () => {
      mockAddressRepository.findOneOrFail.mockResolvedValue(mockAddress);
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });

      await expect(service.getRisks(addressId)).rejects.toThrow(
        new HttpException(
          {
            error:
              'Erreur serveur: échec de la récupération des données de Géorisques.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
