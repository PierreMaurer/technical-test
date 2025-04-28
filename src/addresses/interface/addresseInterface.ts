interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  banId: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  type: string;
  importance: number;
  street: string;
  _type: string;
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}
export interface AddresseInterface {
  type: string;
  features: Feature[];
}

