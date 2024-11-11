import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { baseEntity } from "../../../utils/baseEntity";

@Entity()
export class Energy extends baseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "int", default: 0 })
  megaPackXl: number;

  @Column({ type: "int", default: 0 })
  megaPack2: number;

  @Column({ type: "int", default: 0 })
  megaPack: number;

  @Column({ type: "int", default: 0 })
  powerPack: number;
}
