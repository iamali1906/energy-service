import { useState, ChangeEvent, useEffect } from "react";
import { BatteryCounts, SiteLayoutResult } from "../types/type";
import "../styles/batteryinput.css";
import { getData, saveData } from "../services/api";
import { v4 as uuidv4 } from "uuid";

const batteryTypes = {
  MegapackXL: { dimension: { width: 40, height: 10 }, energy: 4, cost: 120000 },
  Megapack2: { dimension: { width: 30, height: 10 }, energy: 3, cost: 120000 },
  Megapack: { dimension: { width: 30, height: 10 }, energy: 2, cost: 80000 },
  PowerPack: { dimension: { width: 10, height: 10 }, energy: 1, cost: 50000 },
};

const transformer = {
  dimension: { width: 10, height: 10 },
  cost: 10000,
  energy: -0.5,
};

interface BatteryInputFormProps {
  onUpdate: (result: SiteLayoutResult) => void;
}

const BatteryInputForm: React.FC<BatteryInputFormProps> = ({ onUpdate }) => {
  const [counts, setCounts] = useState<BatteryCounts>({
    MegapackXL: 0,
    Megapack2: 0,
    Megapack: 0,
    PowerPack: 0,
  });

  useEffect(() => {
    async function getData_() {
      const id = localStorage.getItem("energy-service-id") || "";
      const data = await getData(id as string);
      const { megaPack, megaPack2, megaPackXl, powerPack } = data;
      const payload = {
        MegapackXL: megaPack,
        Megapack2: megaPack2,
        Megapack: megaPackXl,
        PowerPack: powerPack,
      };
      setCounts(payload);
      const result = calculateSiteLayout(payload);
      onUpdate(result);
    }

    getData_();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCounts((prevCounts) => ({
      ...prevCounts,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = async () => {
    const result = calculateSiteLayout(counts);
    const id = localStorage.getItem("energy-service-id") || uuidv4();
    const payload = {
      id,
      megaPack: counts.MegapackXL,
      megaPack2: counts.Megapack2,
      megaPackXl: counts.Megapack,
      powerPack: counts.PowerPack,
    };
    await saveData(payload);
    localStorage.setItem("energy-service-id", id);
    onUpdate(result);
  };

  const calculateSiteLayout = (counts: BatteryCounts): SiteLayoutResult => {
    let totalCost = 0;
    let totalenergy = 0;
    let totalWidth = 0;
    let totalHeight = 0;
    let layout: Array<{ type: string; position: { x: number; y: number } }> =
      [];

    // Get battery dimensions and costs
    const batteryEntries = Object.entries(counts);

    // Iterate over each battery type
    for (const [batteryType, count] of batteryEntries) {
      if (count > 0) {
        const { dimension, energy, cost } =
          batteryTypes[batteryType as keyof typeof batteryTypes];
        totalCost += count * cost;
        totalenergy += count * energy;

        for (let i = 0; i < count; i++) {
          // Place a battery
          layout.push({
            type: batteryType,
            position: {
              x: totalWidth,
              y: totalHeight,
            },
          });

          totalWidth += dimension.width;
          if (totalWidth >= 100) {
            totalWidth = 0;
            totalHeight += dimension.height;
          }

          // Add a transformer after every 2 batteries
          if ((i + 1) % 2 === 0) {
            const transformerWidth = transformer.dimension.width;
            const transformerHeight = transformer.dimension.height;

            layout.push({
              type: "Transformer",
              position: {
                x: totalWidth,
                y: totalHeight,
              },
            });

            totalWidth += transformerWidth;
            if (totalWidth >= 100) {
              totalWidth = 0;
              totalHeight += transformerHeight;
            }

            totalCost += transformer.cost;
            totalenergy += transformer.energy;
          }
        }
      }
    }

    // Calculate the number of transformers needed if there's any leftover
    const totalBatteries = Object.values(counts).reduce((a, b) => a + b, 0);
    const remainingTransformers =
      Math.ceil(totalBatteries / 2) - Math.floor(totalBatteries / 2);
    const transformerWidth = transformer.dimension.width;
    const transformerHeight = transformer.dimension.height;

    // Add remaining transformers if needed
    for (let i = 0; i < remainingTransformers; i++) {
      layout.push({
        type: "Transformer",
        position: {
          x: totalWidth,
          y: totalHeight,
        },
      });

      totalWidth += transformerWidth;
      if (totalWidth >= 100) {
        totalWidth = 0;
        totalHeight += transformerHeight;
      }

      totalCost += transformer.cost;
      totalenergy += transformer.energy;
    }

    // Return result
    return {
      budget: totalCost,
      landSize: (totalWidth + 10) * (totalHeight + 10), // Adding buffer for layout calculations
      energy: totalenergy,
      layout,
    };
  };

  return (
    <div className="battery-form">
      <h2>Configure Battery Layout</h2>
      {Object.keys(batteryTypes).map((type) => (
        <div key={type} className="form-group">
          <label>
            {type}
            <input
              type="number"
              name={type}
              value={counts[type as keyof BatteryCounts]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Generate Layout</button>
    </div>
  );
};

export default BatteryInputForm;
