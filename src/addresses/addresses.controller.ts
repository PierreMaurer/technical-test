import { Controller, Post, Body, Get, Param, HttpCode } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { GetAddressDto } from './dto/get-address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Récupérer les adresses' })
  @ApiBody({ type: GetAddressDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Adresse trouvée',
    schema: {
      example: {
        label: "35 Rue de Koestlach 68480 Vieux-Ferrette",
        housenumber: "35",
        street: "Rue de Koestlach",
        postcode: 68480,
        citycode: 68347,
        latitude: "47.503982",
        longitude: "7.295802",
        id: 5
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Requête invalide - Paramètres manquants ou incorrects' })
  @ApiResponse({ status: 404, description: 'Adresse non trouvée - Aucune adresse ne correspond à la recherche' })
  @ApiResponse({ status: 500, description: 'Erreur serveur - Problème lors de la recherche d\'adresses' })
  getAddresses(@Body() getAddressDto: GetAddressDto) {
    return this.addressesService.getAddresses(getAddressDto);
  }

  @Get(':id/risks')
  @HttpCode(200)
  @ApiOperation({ summary: 'Récupérer les risques pour une adresse' })
  @ApiResponse({ 
    status: 200, 
    description: 'Risques trouvés pour l\'adresse',
    schema: {
      example: {
        adresse: {
          libelle: "35 Rue de Koestlach 68480 Vieux-Ferrette",
          longitude: 7.295802,
          latitude: 47.503983
        },
        commune: {
          libelle: "Vieux-Ferrette",
          codePostal: "68480",
          codeInsee: "68347"
        },
        url: "https://georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport2?typeForm=adresse&city=Vieux-Ferrette&codeInsee=68347&lon=7.295802&lat=47.503982&adresse=35+Rue+de+Koestlach+68480+Vieux-Ferrette",
        risquesNaturels: {
          inondation: {
            present: true,
            libelle: "Inondation"
          },
          risqueCotier: {
            present: false,
            libelle: "Risques côtiers (submersion marine, tsunami)"
          },
          seisme: {
            present: true,
            libelle: "Séisme"
          },
          mouvementTerrain: {
            present: true,
            libelle: "Mouvements de terrain"
          },
          reculTraitCote: {
            present: false,
            libelle: "Recul du trait de côte"
          },
          retraitGonflementArgile: {
            present: true,
            libelle: "Retrait gonflement des argiles"
          },
          avalanche: {
            present: false,
            libelle: "Avalanche"
          },
          feuForet: {
            present: false,
            libelle: "Feu de forêt"
          },
          eruptionVolcanique: {
            present: false,
            libelle: "Volcan"
          },
          cyclone: {
            present: false,
            libelle: "Vent violent"
          },
          radon: {
            present: true,
            libelle: "Radon"
          }
        },
        risquesTechnologiques: {
          icpe: {
            present: false,
            libelle: "Installations industrielles classées (ICPE)"
          },
          nucleaire: {
            present: false,
            libelle: "Nucléaire"
          },
          canalisationsMatieresDangereuses: {
            present: true,
            libelle: "Canalisations de transport de matières dangereuses"
          },
          pollutionSols: {
            present: false,
            libelle: "Pollution des sols"
          },
          ruptureBarrage: {
            present: false,
            libelle: "Rupture de barrage"
          },
          risqueMinier: {
            present: false,
            libelle: "Risques miniers"
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Adresse non trouvée - L\'ID spécifié n\'existe pas' })
  @ApiResponse({ status: 500, description: 'Erreur serveur - Problème lors de la récupération des risques' })
  findOne(@Param('id') id: number) {
    return this.addressesService.getRisks(id);
  }
}
