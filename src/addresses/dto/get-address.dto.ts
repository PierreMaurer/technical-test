import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAddressDto {
  @ApiProperty({
    description:
      'Terme de recherche pour trouver une adresse (format URL-encoded)',
    example: '35+rue+de+koestlach&limit=1',
    required: true,
  })
  @IsString()
  @IsNotEmpty({
    message: "Le champ 'q' est requis et doit être une chaîne non vide.",
  })
  q: string;
}
