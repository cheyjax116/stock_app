import React from "react";
import { Chart } from "react-google-charts";


const Charts = ({ stock_data, companyName, priceChange }) => {

  let trendingUp = ''
  let trend = ''

  if (Math.sign(priceChange) === -1) {
    
    trendingUp = false;


  } else {
    trendingUp = true;
    
  }

  
  
  const options = {
    annotations: {},
    title: `Closing Prices for ${companyName} in the past 5 days.`,
    // titleTextStyle: {color: trendingUp ? "green" : "red"},
    curveType: "function",
    legend: { position: "right", title: "Closing Prices" },
    colors: trendingUp ? ["green"] : ["red"],
    hAxis: { title: "Date" },
    vAxis: { title: "Price in USD" },
    pointSize: 10,
    areaOpacity: 0.2
  };


  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={stock_data}
      options={options}
    />
  );
};

export default Charts;
