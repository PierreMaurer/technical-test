import { Injectable } from '@nestjs/common';
import { GetAddressDto } from './dto/get-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async getAddresses(getAddressDto: GetAddressDto) {
    const { q } = getAddressDto;
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          'https://api-adresse.data.gouv.fr/search/?q=' + q,
        );
        if (!response.ok) {
          throw new Error(
            "Erreur serveur : impossible de contacter l'API externe.",
          );
        }
        return await response.json();
      } catch (errors) {
        console.error(errors);
      }
    };
    const fetchedAdress: any = await fetchAddresses();
    const payload = {
      label: fetchedAdress.features[0].properties.label,
      housenumber: fetchedAdress.features[0].properties.housenumber,
      street: fetchedAdress.features[0].properties.street,
      postcode: fetchedAdress.features[0].properties.postcode,
      citycode: fetchedAdress.features[0].properties.citycode,
      latitude: fetchedAdress.features[0].properties.x,
      longitude: fetchedAdress.features[0].properties.y,
    };

    return await this.addressRepository.save(payload);
  }
}
