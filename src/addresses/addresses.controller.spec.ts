import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { GetAddressDto } from './dto/get-address.dto';

describe('AddressesController', () => {
  let controller: AddressesController;
  let service: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [
        {
          provide: AddressesService,
          useValue: {
            getAddresses: jest.fn(),
            getRisks: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
    service = module.get<AddressesService>(AddressesService);
  });

  describe('getAddresses', () => {
    it('should return address information', async () => {
      const getAddressDto: GetAddressDto = { q: '35+rue+de+koestlach' };
      const expectedResult = {
        label: '35 Rue de Koestlach 68480 Vieux-Ferrette',
        housenumber: '35',
        street: 'Rue de Koestlach',
        postcode: 68480,
        citycode: 68347,
        latitude: '47.503982',
        longitude: '7.295802',
        id: 3,
      };

      jest.spyOn(service, 'getAddresses').mockResolvedValue(expectedResult);

      const result = await controller.getAddresses(getAddressDto);
      expect(result).toEqual(expectedResult);
      expect(service.getAddresses).toHaveBeenCalledWith(getAddressDto);
    });
  });

  describe('getRisks', () => {
    it('should return risks for an address', async () => {
      const addressId = 1;
      const expectedResult = {
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

      jest.spyOn(service, 'getRisks').mockResolvedValue(expectedResult);

      const result = await controller.findOne(addressId);
      expect(result).toEqual(expectedResult);
      expect(service.getRisks).toHaveBeenCalledWith(addressId);
    });
  });
});
