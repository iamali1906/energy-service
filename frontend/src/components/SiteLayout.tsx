import { SiteLayoutResult } from "../types/type";
import "../styles/sitelayout.css"; // Import the CSS file

interface SiteLayoutProps {
  layout: SiteLayoutResult["layout"];
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ layout }) => {
  return (
    <div className="site-layout-container">
      <h2 style={{ textAlign: "center" }}>Site Layout</h2>
      <div className="site-layout">
        {layout.map((item, index) => (
          <div
            key={index}
            className={`layout-item ${item.type.toLowerCase()}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SiteLayout;
