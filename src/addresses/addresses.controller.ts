import { Controller, Post, Body } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { GetAddressDto } from './dto/get-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  getAddresses(@Body() getAddressDto: GetAddressDto) {
    return this.addressesService.getAddresses(getAddressDto);
  }
}
