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
    try {
      this.assetPrice = this.data; //.data[this.assetId]; //.quote.USD.price;
    } catch (error) {
      console.error("Could not pull asset id", this.assetId, error);
    }
  }
  price() {
    return this.assetPrice;
  }
}

async function getDataObject() {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        id: "11841,3794,5805,1697,1,28324,13855,1027,3773,7080,29241,6719,5665,7226,24686,1975,3890,6535,3911,11840,12220,5026,9481,1974,15188,15060,5690,29974,5604,5426,8085,22691,6758,25147,22861,3408,29470,2396,328", // All IDs od cryptos to update price on
      },
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });
    if (response) {
      // success
      const json = response.data.data;
      return json;
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
    return null; // Or throw an error if preferred
  }
}

function updatePricesInExcel(Assets, filePath) {
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
    const updateValue = asset.assetPrice();

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
}

// Create the data object
const data = getDataObject();

// console.log(data);

// Create Asset object for all cryptocurrencies
// const ARB = new Asset("ARB", "11841", data);
// const ATOM = new Asset("ATOM", "3794", data);
// const AVAX = new Asset("AVAX", "5805", data);
// const BAT = new Asset("BAT", "1697", data);
const BTC = new Asset("BTC", "1", data);
// const DYDX = new Asset("DYDX", "28324", data);
// const ENS = new Asset("ENS", "13855", data);
// const ETH = new Asset("ETH", "1027", data);
// const FET = new Asset("FET", "3773", data);
// const GALA = new Asset("GALA", "7080", data);
// const GME = new Asset("GME", "29241", data);
// const GRT = new Asset("GRT", "6719", data);
// const HNT = new Asset("HNT", "5665", data);
// const INJ = new Asset("INJ", "7226", data);
// const IOT = new Asset("IOT", "24686", data);
// const LINK = new Asset("LINK", "1975", data);
// const MATIC = new Asset("MATIC", "3890", data);
// const NEAR = new Asset("NEAR", "6535", data);
// const OCEAN = new Asset("OCEAN", "3911", data);
// const OP = new Asset("OP", "11840", data);
// const OSMO = new Asset("OSMO", "12220", data);
// const OXT = new Asset("OXT", "5026", data);
// const PENDLE = new Asset("PENDLE", "9481", data);
// const PRO = new Asset("PRO", "1974", data);
// const RADAR = new Asset("RADAR", "15188", data);
// const rETH = new Asset("rETH", "15060", data);
// const RNDR = new Asset("RNDR", "5690", data);
// const rswETH = new Asset("rswETH", "29974", data);
// const SCRT = new Asset("SCRT", "5604", data);
// const SOL = new Asset("SOL", "5426", data);
// const stETH = new Asset("stETH", "8085", data);
// const STRK = new Asset("STRK", "22691", data);
// const SUSHI = new Asset("SUSHI", "6758", data);
// const swETH = new Asset("swETH", "25147", data);
// const TIA = new Asset("TIA", "22861", data);
// const USDC = new Asset("USDC", "3408", data);
// const USDE = new Asset("USDE", "29470", data);
// const wETH = new Asset("wETH", "2396", data);
// const XMR = new Asset("XMR", "328", data);

console.log(BTC.data);

// Create a list of assets
// const Assets = [
//   ARB,
//   ATOM,
//   AVAX,
//   BAT,
//   BTC,
//   DYDX,
//   ENS,
//   ETH,
//   FET,
//   GALA,
//   GME,
//   GRT,
//   HNT,
//   INJ,
//   IOT,
//   LINK,
//   MATIC,
//   NEAR,
//   OCEAN,
//   OP,
//   OSMO,
//   OXT,
//   PENDLE,
//   PRO,
//   RADAR,
//   rETH,
//   RNDR,
//   rswETH,
//   SCRT,
//   SOL,
//   stETH,
//   STRK,
//   SUSHI,
//   swETH,
//   TIA,
//   USDC,
//   USDE,
//   wETH,
//   XMR,
// ];

// Update prices in Excel for each item
// updatePricesInExcel(Assets, filePath);
