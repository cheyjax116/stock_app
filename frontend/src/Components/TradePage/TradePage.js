import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../Dashboard/Dashboard.css";
import "../Dashboard/Dashboard";
import BuyModal from "../Modals/BuyModal";
import SellModal from "../Modals/SellModal";
import DashboardNavBar from "../Dashboard/DashboardNavbar";
import "../TradePage/TradePage.css";
import StockCard from "../StockCard/StockCard";
import axios from "axios";
import Chart from "../Charts";
import { DateTime } from "luxon";
import Fade from "react-reveal/Fade";

const TradePage = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const handleShowBuy = () => setShowBuyModal(true);
  const handleShowSell = () => setShowSellModal(true);
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockDetails, setStockDetails] = useState([]);
  const [stockLogo, setStockLogo] = useState([]);
  const [lastweekClosingPrices, setLastWeekClosingPrices] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [isData, setIsData] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  async function getStockDetails() {
    await axios.get("api/details/" + stockSymbol).then((res) => {
      if (res.data === "Something Went Wrong") {
        setIsData(false);
        console.log("Stock Details Has No Data...");
      } else {
        setStockDetails(res.data);
        setIsData(true);
      }
    });
  }

  console.log(stockDetails);

  async function getStockLogo() {
    await axios.get("api/logo/" + stockLogo).then((res) => {
      if (res.data === "Something Went Wrong") {
        setIsData(false);
      } else {
        setStockLogo(res.data);
        setIsData(true);
      }
      // console.log(res.data);
    });
  }

  async function getLastWeekClosingPrices() {
    await axios.get("api/lastweek/" + stockSymbol).then((res) => {
      if (res.data === "Something Went Wrong") {
        setIsData(false);
      } else {
        setLastWeekClosingPrices(res.data);
        setIsData(true);
      }
      // console.log(res.data);
    });
  }

  async function getAllStocks() {
    await axios.get("api/allstocks").then((res) => {
      if (res.data === "Something Went Wrong") {
        // setIsData(false);
        console.log("All Stocks Has No Data...");
      } else {
        setAllStocks(res.data);
        setIsData(true);
        console.log("All Stocks Has Data!");
      }
      // console.log(res.data);
    });
  }

  // useEffect(() => {
  //   getAllStocks();
  //   // console.log(data)
  // }, [searchValue]);
  useEffect(() => {
    getAllStocks();
    // console.log(data)
  }, []);
  // }, [console.log(isData), renderedData]);

  const data = stockDetails?.map((stock) => {
    const finalClosePrices = lastweekClosingPrices.map((closings) => {
      return closings;
    });
    return {
      ...stock,
      companyName: stock?.companyName,
      latestPrice: stock?.latestPrice,
      priceChange: stock?.priceChange,
      symbol: stock?.symbol,
      logo: stockLogo?.url,
      lastWeekClosingPrices: finalClosePrices,
    };
  });

  const convertDate = (date) => {
    const day = DateTime.fromISO(date).toFormat("d");
    const month = DateTime.fromISO(date).toFormat("MMM");

    return `${month} ${day}`;
  };

  let stock_data = [["Date", "Closing Price"]];

  const onSearch = (searchTerm) => {
    console.log(searchTerm);
    setSearchValue(searchTerm);
    setStockSymbol(searchTerm);
    setStockLogo(searchTerm);
  };

  // const confirmSearch = () => {
  //     getStockDetails();
  //     getStockLogo();
  //     getLastWeekClosingPrices();
  //   setSearchValue("")
  // }

  // console.log(data)

  const focusInput = () => {
    const selectInput = document.getElementById("input");
    selectInput.focus();
  };

  const renderedData = data.map((stock) => {
    console.log(stock);

    stock.lastWeekClosingPrices.map((price) => {
      stock_data.push([convertDate(price.date), price.closePrice]);
    });

    return (
      <div>
        <img src={stock.logo}></img>
        <p>${stock.priceChange}</p>
      </div>
    );
  });

  return (
    <div className="body-font">
      <DashboardNavBar />
  
      <div id="stock-input" className="mb-3">
        <input
          id="input"
          type="text"
          value={searchValue}
          placeholder="Search Stocks"
          onChange={(e) => {
            setSearchValue(e.target.value);
            setStockSymbol(e.target.value);
            setStockLogo(e.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key == "Enter") {
              getStockDetails();
              getStockLogo();
              getLastWeekClosingPrices();
              onSearch(searchValue);
            }
          }}
          autoFocus="True"
        ></input>

        <Button
          className="search-button"
          onClick={() => {
            getStockDetails();
            getStockLogo();
            getLastWeekClosingPrices();
            onSearch(searchValue);
          }}
        >
          Search
        </Button>
      </div>
      <div className="dropdown mx-auto">
        {allStocks
          ?.filter((stock) => {
            const searchTerm = searchValue.toLowerCase();

            const fullCompanyName = stock.companyName.toLowerCase();

            const fullSymbol = stock.symbol.toLowerCase();

            const fullDetails = stock.fullDetails.toLowerCase();

            return (
              searchTerm &&
              /* fullDetails.includes("(" + searchTerm + ")") && */
              /* fullDetails.includes(searchTerm) && */
              /* fullSymbol.startsWith("(" + searchTerm + ")") &&  */
              fullSymbol.startsWith(searchTerm) &&
              searchTerm !== fullSymbol
            );
            {
              /* ||
                fullCompanyName.startsWith(searchTerm) ||
                fullSymbol.startsWith(searchTerm)) 
                && fullDetails !== searchTerm 
                  ||
                  fullSymbol !== searchTerm ||
                  fullCompanyName !== searchTerm */
            }
          })
          .slice(0, 10)
          .map((stock) => (
            <div
              className="dropdown-row"
              onClick={() => {
                onSearch(stock.symbol);
                focusInput();
              }}
              key={stock.symbol}
            >
              {stock.fullDetails}
              {/* {console.log(stock)} */}
            </div>
          ))}
      </div>
      <p></p>
      {isData ? (
        ''/* <div>
          <img src={stockLogo.url}></img>
        </div> */
      ) : (
        <p>Company Not Found. Please try searching for another.</p>
      )}
      {stockDetails.length === 0 ? (
        ""
      ) : (
       <div className="mb-2">
          <Fade top duration={1000} delay={100} distance="30px">
            <div className="stock-details-box mb-3">
              <div>Share Numbers</div>
    
                <div className="mb-3">
                  <Chart
                    stock_data={stock_data}
                    companyName={data[0]?.companyName}
                    priceChange={data[0]?.priceChange}
                  />
                  <div className="d-flex justify-content-center my-3">
                    <div className="stock-button-spacing">
                      <Button className="button-colors" onClick={handleShowBuy}>
                        Buy Shares
                      </Button>

                      <BuyModal
                        show={showBuyModal}
                        onHide={() => setShowBuyModal(false)}
                      />
                    </div>

                    <div>
                      <Button
                        className="button-colors"
                        onClick={handleShowSell}
                      >
                        Sell Shares
                      </Button>
                      <SellModal
                        show={showSellModal}
                        onHide={() => setShowSellModal(false)}
                      />
                    </div>
                  </div>
                </div>
              
            </div>
          </Fade>
        </div>
      )}
      <div>
        <StockCard />
      </div>
    </div>
  );
};

export default TradePage;
