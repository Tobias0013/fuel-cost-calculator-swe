import React, { useEffect, useState, useRef } from "react";

import "./main.css";

export default function CarTaxComparison() {
  const [miles, setMiles] = useState(0);
  const [years, setYears] = useState(0);
  const [parkingFee, setParkingFee] = useState(7000);
  const [fuelPriceE, setFuelPriceE] = useState(2);
  const [fuelPriceG, setFuelPriceG] = useState(8);

  const [resultTextE, setResultTextE] = useState<string | null>(null);
  const [resultTextG, setResultTextG] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    if (miles <= 0 || years <= 0 || fuelPriceE <= 0 || fuelPriceG <= 0) {
      setResultText("Please enter valid values for all fields.");
      return;
    }
    console.log(
      `Calculating for electric car: ${miles} miles/year, ${years} years, $${fuelPriceE} fuel cost/year`
    );
    console.log(
      `Calculating for gas car: ${miles} miles/year, ${years} years, $${fuelPriceG} fuel cost/year`
    );

    // calculate the reduction in tax for electric and gas cars
    const electricReduction = parseFloat(
      ((miles * 25 - 11000 + parkingFee) * 0.33 * years).toFixed(2)
    );
    const gasReduction = parseFloat(
      ((miles * 25 - 11000 + parkingFee) * 0.33 * years).toFixed(2)
    );

    // calculate the total cost for electric and gas cars
    const electricCost = miles * fuelPriceE * years;
    const gasCost = miles * fuelPriceG * years;

    // calculate the total cost after reduction
    const totalCostE = electricCost - electricReduction;
    const totalCostG = gasCost - gasReduction;

    // calculate the difference in cost
    setResultText(
      `
      The best option is: ${totalCostE < totalCostG ? "Electric" : "Gas"} car
      Difference: ${parseFloat(
        Math.abs(totalCostE - totalCostG).toFixed(2)
      ).toLocaleString()} kr
      `
    );
    setResultTextE(
      `
      Total cost electric: ${electricCost.toLocaleString()} kr
      Electric reduction: ${electricReduction.toLocaleString()} kr
      Electric cost - reduction: ${totalCostE.toLocaleString()} kr
      `
    );
    setResultTextG(
      `
      Total cost gas: ${gasCost.toLocaleString()} kr
      Gas reduction: ${gasReduction.toLocaleString()} kr
      Gas cost - reduction: ${totalCostG.toLocaleString()} kr
      `
    );
  };

  useEffect(() => {
    if (resultText && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [resultText]);

  return (
    <div className="container">
      <h1>Car tax reduction comparison (electric vs gas) (swe)</h1>
      <div className="comparison-sections">
        <div className="section">
          <h2>Gas</h2>
          <label>
            Fuel price (kr):
            <input
              type="number"
              value={fuelPriceG}
              onChange={(e) => setFuelPriceG(+e.target.value)}
            />
          </label>
        </div>
        <div className="section">
          <h2>Electric</h2>
          <label>
            Fuel price (kr):
            <input
              type="number"
              value={fuelPriceE}
              onChange={(e) => setFuelPriceE(+e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="section">
        <h2>Shared input</h2>
        <label>
          Miles per year (metric):
          <input type="number" onChange={(e) => setMiles(+e.target.value)} />
        </label>
        <label>
          Years driven:
          <input type="number" onChange={(e) => setYears(+e.target.value)} />
        </label>
        <label>
          Parking fee (kr):
          <input
            type="number"
            value={parkingFee}
            onChange={(e) => setParkingFee(+e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      {resultText && (
        <div className="section" ref={resultRef}>
          <h2>Results</h2>
          {resultText.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
      <div className="comparison-sections">
        {resultTextG && (
          <div className="section">
            <h2>Gas Car Results</h2>
            {resultTextG.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
        {resultTextE && (
          <div className="section">
            <h2>Electric Car Results</h2>
            {resultTextE.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
