import "../styles/summary.css";

interface SummaryProps {
  budget: number;
  landSize: number;
  energy: number;
}

const Summary: React.FC<SummaryProps> = ({ budget, landSize, energy }) => (
  <div className="summary-container">
    <h2 className="summary-header">Summary</h2>
    <p className="summary-item">
      <span>Budget:</span> ${budget}
    </p>
    <p className="summary-item">
      <span>Land Size:</span> {landSize} sqft
    </p>
    <p className="summary-item">
      <span>energy:</span> {energy} MWh
    </p>
  </div>
);

export default Summary;
