import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetAddressDto } from './dto/get-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { ConfigService } from '@nestjs/config';
import { AddresseInterface } from './interface/addresseInterface';
import { RiskInterface } from './interface/riskInterface';

@Injectable()
export class AddressesService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async getAddresses(getAddressDto: GetAddressDto) {
    const { q } = getAddressDto;
    try {
      const response = await fetch(
        this.configService.get<string>('api.addresses.baseUrl') + q,
      );
      if (!response.ok) throw new Error();
      const fetchedAdress: AddresseInterface = await response.json();
      if (fetchedAdress.features.length == 0) throw new NotFoundException();
      const payload = {
        label: fetchedAdress.features[0].properties.label,
        housenumber: fetchedAdress.features[0].properties.housenumber,
        street: fetchedAdress.features[0].properties.street,
        postcode: parseInt(fetchedAdress.features[0].properties.postcode),
        citycode: parseInt(fetchedAdress.features[0].properties.citycode),
        latitude: fetchedAdress.features[0].geometry.coordinates[1].toString(),
        longitude: fetchedAdress.features[0].geometry.coordinates[0].toString(),
      };
      return await this.addressRepository.save(payload);
    } catch (errors) {
      if (errors instanceof NotFoundException) {
        throw new HttpException(
          {
            error:
              'Adresse non trouvée. Aucun résultat ne correspond à votre recherche.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          error: "Erreur serveur : impossible de contacter l'API externe.",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRisks(id: number) {
    try {
      const adress: Address = await this.addressRepository.findOneOrFail({
        where: { id },
      });
      if (!adress) throw new NotFoundException();
      const response = await fetch(
        this.configService.get<string>('api.georisques.baseUrl') +
          `${adress.longitude},${adress.latitude}`,
      );
      if (!response.ok) {
        throw new Error();
      }
      const risks: RiskInterface = await response.json();
      return risks;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          { error: 'Adresse non trouvée.' },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          error:
            'Erreur serveur: échec de la récupération des données de Géorisques.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
