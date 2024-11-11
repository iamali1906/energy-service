import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { API_OPERATIONS } from "../../common/constants/api-operation-details";
import { CreateEnergyDto } from "./dto/create-energy.dto";
import { EnergyService } from "./energy.service";
import { Energy } from "./entities/energy.entity";

@Controller("energy")
@ApiTags("energy")
export class EnergyController {
  constructor(private readonly energyService: EnergyService) { }

  @Put()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation(API_OPERATIONS.DEFAULT.UPSERT)
  async create(@Body() createEnergyDto: CreateEnergyDto): Promise<Energy> {
    return this.energyService.upsert(createEnergyDto);
  }
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation(API_OPERATIONS.DEFAULT.FIND_ONE)
  findOne(@Param("id") id: string): Promise<Energy> {
    return this.energyService.findOne({ where: { id } });
  }
}
