const axios = require("axios");
const XLSX = require("xlsx");
require("dotenv").config();

// Replace with your API key
const apiKey = process.env.CMC_API_TOKEN;
const filePath = process.env.PORTFOLIO_PATH;
const baseUrl = process.env.API_BASE_URL;

class Asset {
  constructor(assetName, assetId, data) {
    this.assetName = assetName;
    this.assetId = assetId;
    this.data = data;
    this.assetPrice = data[assetId].quote.USD.price;
  }
}

async function getDataObject() {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        id: "11841,3794,5805,1697,1,28324,13855,1027,3773,7080,29241,6719,5665,7226,24686,1975,3890,6535,3911,11840,12220,5026,9481,1974,15188,15060,5690,29974,5604,5426,8085,22691,6758,25147,22861,3408,29470,2396,328", // All IDs od cryptos to update price on
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });
    if (response) {
      // success
      apiData = response.data.data;
      price = apiData["1"].quote.USD.price;

      // Create Asset object for all cryptocurrencies
      const ARB = new Asset("ARB", "11841", apiData);
      const ATOM = new Asset("ATOM", "3794", apiData);
      const AVAX = new Asset("AVAX", "5805", apiData);
      const BAT = new Asset("BAT", "1697", apiData);
      const BTC = new Asset("BTC", "1", apiData);
      const DYDX = new Asset("DYDX", "28324", apiData);
      const ENS = new Asset("ENS", "13855", apiData);
      const ETH = new Asset("ETH", "1027", apiData);
      const FET = new Asset("FET", "3773", apiData);
      const GALA = new Asset("GALA", "7080", apiData);
      const GME = new Asset("GME", "29241", apiData);
      const GRT = new Asset("GRT", "6719", apiData);
      const HNT = new Asset("HNT", "5665", apiData);
      const INJ = new Asset("INJ", "7226", apiData);
      const IOT = new Asset("IOT", "24686", apiData);
      const LINK = new Asset("LINK", "1975", apiData);
      const MATIC = new Asset("MATIC", "3890", apiData);
      const NEAR = new Asset("NEAR", "6535", apiData);
      const OCEAN = new Asset("OCEAN", "3911", apiData);
      const OP = new Asset("OP", "11840", apiData);
      const OSMO = new Asset("OSMO", "12220", apiData);
      const OXT = new Asset("OXT", "5026", apiData);
      const PENDLE = new Asset("PENDLE", "9481", apiData);
      const PRO = new Asset("PRO", "1974", apiData);
      const RADAR = new Asset("RADAR", "15188", apiData);
      const rETH = new Asset("rETH", "15060", apiData);
      const RNDR = new Asset("RNDR", "5690", apiData);
      const rswETH = new Asset("rswETH", "29974", apiData);
      const SCRT = new Asset("SCRT", "5604", apiData);
      const SOL = new Asset("SOL", "5426", apiData);
      const stETH = new Asset("stETH", "8085", apiData);
      const STRK = new Asset("STRK", "22691", apiData);
      const SUSHI = new Asset("SUSHI", "6758", apiData);
      const swETH = new Asset("swETH", "25147", apiData);
      const TIA = new Asset("TIA", "22861", apiData);
      const USDC = new Asset("USDC", "3408", apiData);
      const USDE = new Asset("USDE", "29470", apiData);
      const wETH = new Asset("wETH", "2396", apiData);
      const XMR = new Asset("XMR", "328", apiData);

      // Create a list of assets
      const Assets = [
        ARB,
        ATOM,
        AVAX,
        BAT,
        BTC,
        DYDX,
        ENS,
        ETH,
        FET,
        GALA,
        GME,
        GRT,
        HNT,
        INJ,
        IOT,
        LINK,
        MATIC,
        NEAR,
        OCEAN,
        OP,
        OSMO,
        OXT,
        PENDLE,
        PRO,
        RADAR,
        rETH,
        RNDR,
        rswETH,
        SCRT,
        SOL,
        stETH,
        STRK,
        SUSHI,
        swETH,
        TIA,
        USDC,
        USDE,
        wETH,
        XMR,
      ];

      // Write to Excel
      // Read the existing spreadsheet data
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Check if sheet exists
      if (!sheetName) {
        console.error("Sheet not found in workbook!");
        return;
      }
      const worksheet = workbook.Sheets[sheetName];

      // Loop through each asset in the array
      Assets.forEach((asset) => {
        const matchValue = asset.assetName.trim().toLowerCase(); // Trim whitespaces and lowercase
        const updateValue = asset.assetPrice;

        // Find the row with the matching value in A
        const foundRow = Object.keys(worksheet).find((row) => {
          if (worksheet[row] && row[0] === "A") {
            // Check if row starts with "A"
            const cellValue = String(worksheet[row].v || ""); // Convert to string and handle undefined
            return cellValue.trim().toLowerCase() === matchValue; // Case-insensitive comparison
          } else {
            return false;
          }
        });

        if (foundRow) {
          const columnIndexB = "B" + foundRow.slice(1); // Change column from A to B
          worksheet[columnIndexB] = { v: updateValue }; // Update colmne B with assetId
        } else {
          console.warn("No match found for asset:", matchValue);
        }
      });

      // Write the modified data back to the file
      XLSX.writeFile(workbook, filePath);

      console.log("Dynamic values updated in column", "B"); // Update message reflects B

      return price;
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
    return null; // Or throw an error if preferred
  }
}

getDataObject() // get data, must be used within the getDataObject or returned using the .then statement
  .then((results) => {
    console.log("Data from the API:", results);
  })
  .catch((error) => console.error("Error:", error));
