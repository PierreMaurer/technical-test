import { PartialType } from '@nestjs/mapped-types';
import { GetAddressDto } from './get-address.dto';

export class UpdateAddressDto extends PartialType(GetAddressDto) {}
