import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  label: string;
  @Column()
  housenumber: string;
  @Column()
  street: string;
  @Column()
  postcode: number;
  @Column()
  citycode: number;
  @Column()
  latitude: string;
  @Column()
  longitude: string;
}
