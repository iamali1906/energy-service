import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericService } from "@utils/generic-service.utill";
import { Energy } from "./entities/energy.entity";

@Injectable()
export class EnergyService extends GenericService<Energy> {
  constructor(
    @InjectRepository(Energy)
    private readonly energyRepository: Repository<Energy>
  ) {
    super(energyRepository);
  }
}
