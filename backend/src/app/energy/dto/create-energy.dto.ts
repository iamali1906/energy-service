import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const EnergySchema = z.object({
  id: z
    .string()
    .uuid()
    .describe("Unique identifier (id) for the energy record"),
  megaPackXl: z.number().describe("Amount of energy in the Mega Pack XL"),
  megaPack2: z.number().describe("Amount of energy in the Mega Pack 2"),
  megaPack: z.number().describe("Amount of energy in the Mega Pack"),
  powerPack: z.number().describe("Amount of energy in the Power Pack"),
});

const EnergyIdSchema = z.string().uuid();


export type EnergyType = z.infer<typeof EnergySchema>;

export class CreateEnergyDto extends createZodDto(EnergySchema) {}

