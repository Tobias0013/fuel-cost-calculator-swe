import React, { useState } from "react";

import "./main.css";

export default function CarTaxComparison() {
  const [milesE, setMilesE] = useState(0);
  const [yearsE, setYearsE] = useState(0);
  const [fuelCostE, setFuelCostE] = useState(0);
  const [milesG, setMilesG] = useState(0);
  const [yearsG, setYearsG] = useState(0);
  const [fuelCostG, setFuelCostG] = useState(0);
  const [resultText, setResultText] = useState<string | null>(null);

  const handleCalculate = () => {
    if (
      milesE <= 0 ||
      yearsE <= 0 ||
      fuelCostE <= 0 ||
      milesG <= 0 ||
      yearsG <= 0 ||
      fuelCostG <= 0
    ) {
      setResultText("Please enter valid values for all fields.");
      return;
    }
    console.log(
      `Calculating for electric car: ${milesE} miles/year, ${yearsE} years, $${fuelCostE} fuel cost/year`
    );
    console.log(
      `Calculating for gas car: ${milesG} miles/year, ${yearsG} years, $${fuelCostG} fuel cost/year`
    );

    // calculate the reduction in tax for electric and gas cars
    const electricReduction = parseFloat(
      ((milesE * 9.5 - 11000) * 0.33).toFixed(2)
    );
    const gasReduction = parseFloat(((milesG * 25 - 11000) * 0.33).toFixed(2));

    // calculate the total cost for electric and gas cars
    const electricCost = milesE * fuelCostE * yearsE;
    const gasCost = milesG * fuelCostG * yearsG;

    // calculate the total cost after reduction
    const totalCostE = electricCost - electricReduction;
    const totalCostG = gasCost - gasReduction;

    // calculate the difference in cost

    setResultText(
      `
      Total cost electric: ${totalCostE} kr
      Electric reduction: ${electricReduction} kr
      Electric cost - reduction: ${electricCost} kr

      Total cost gas: ${totalCostG} kr
      Gas reduction: ${gasReduction} kr
      Gas cost - reduction: ${gasCost} kr
      
      The best option is: ${totalCostE < totalCostG ? "Electric" : "Gas"} car
      Difference: ${Math.abs(totalCostE - totalCostG)} kr
      `
    );
  };

  return (
    <div className="container">
      <h1>Car tax reduction comparison (electric vs gas) (swe)</h1>
      <div className="comparison-sections">
        <div className="section">
          <h2>Gas</h2>
          <label>
            Miles per year (metric):
            <input type="number" onChange={(e) => setMilesG(+e.target.value)} />
          </label>
          <label>
            Years driven:
            <input type="number" onChange={(e) => setYearsG(+e.target.value)} />
          </label>
          <label>
            Fuel price per year (kr):
            <input
              type="number"
              onChange={(e) => setFuelCostG(+e.target.value)}
            />
          </label>
        </div>
        <div className="section">
          <h2>Electric</h2>
          <label>
            Miles per year (metric):
            <input type="number" onChange={(e) => setMilesE(+e.target.value)} />
          </label>
          <label>
            Years driven:
            <input type="number" onChange={(e) => setYearsE(+e.target.value)} />
          </label>
          <label>
            Fuel price per year (kr):
            <input
              type="number"
              onChange={(e) => setFuelCostE(+e.target.value)}
            />
          </label>
        </div>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {resultText && (
        <div className="result">
          {resultText.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}
