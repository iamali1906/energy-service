import { useState } from "react";
import BatteryInputForm from "../components/BatteryInputForm";
import SiteLayout from "../components/SiteLayout";
import Summary from "../components/Summary";
import { SiteLayoutResult } from "../types/type";

import "../styles/homepage.css";
import Labels from "../components/Labels";

const HomePage: React.FC = () => {
  const [result, setResult] = useState<SiteLayoutResult | null>(null);

  const handleUpdate = (data: SiteLayoutResult) => {
    setResult(data);
  };

  return (
    <div className="container">
      <Labels />
      <div>
        <BatteryInputForm onUpdate={handleUpdate} />
        {result && (
          <>
            <Summary
              budget={result.budget}
              landSize={result.landSize}
              energy={result.energy}
            />
          </>
        )}
      </div>
      {result && <SiteLayout layout={result.layout} />}
    </div>
  );
};

export default HomePage;
