export interface Adresse {
  libelle: string;
  longitude: number;
  latitude: number;
}

export interface Commune {
  libelle: string;
  codePostal: string;
  codeInsee: string;
}

export interface RisqueNaturel {
  present: boolean;
  libelle: string;
}

export interface RisquesNaturels {
  inondation: RisqueNaturel;
  risqueCotier: RisqueNaturel;
  seisme: RisqueNaturel;
  mouvementTerrain: RisqueNaturel;
  reculTraitCote: RisqueNaturel;
  retraitGonflementArgile: RisqueNaturel;
  avalanche: RisqueNaturel;
  feuForet: RisqueNaturel;
  eruptionVolcanique: RisqueNaturel;
  cyclone: RisqueNaturel;
  radon: RisqueNaturel;
}

export interface RisquesTechnologiques {
  icpe: RisqueNaturel;
  nucleaire: RisqueNaturel;
  canalisationsMatieresDangereuses: RisqueNaturel;
  pollutionSols: RisqueNaturel;
  ruptureBarrage: RisqueNaturel;
  risqueMinier: RisqueNaturel;
}

export interface RiskInterface {
  adresse: Adresse;
  commune: Commune;
  url: string;
  risquesNaturels: RisquesNaturels;
  risquesTechnologiques: RisquesTechnologiques;
}

