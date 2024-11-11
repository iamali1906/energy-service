export interface BatteryType {
  dimension: string;
  energy: number;
  cost: number;
}

export interface BatteryCounts {
  MegapackXL: number;
  Megapack2: number;
  Megapack: number;
  PowerPack: number;
}

export interface SiteLayoutResult {
  budget: number;
  landSize: number;
  energy: number;
  layout: Array<{ type: string; position: { x: number; y: number } }>;
}
