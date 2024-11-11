import { Module } from "@nestjs/common";
import { EnergyService } from "./energy.service";
import { EnergyController } from "./energy.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Energy } from "./entities/energy.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Energy])],
  controllers: [EnergyController],
  providers: [EnergyService],
})
export class EnergyModule {}
