import { Controller, Post, Body, Get, Param, HttpCode } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { GetAddressDto } from './dto/get-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @HttpCode(200)
  getAddresses(@Body() getAddressDto: GetAddressDto) {
    return this.addressesService.getAddresses(getAddressDto);
  }
  @Get(':id/risks')
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.addressesService.getRisks(id);
  }
}
