const axios = require("axios");
require("dotenv").config();

// Replace with your API key
const apiKey = process.env.CMC_API_TOKEN;

const baseUrl =
  "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";

async function getBitcoinPrice() {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        id: "1,1027,11841,3794,5805,13855,3773,7080,5665,7226,1975,3890,6535,3911,11840,5026,16193,5690,5426,22691,6758,22861,3408,328,9481,29470,15188,24686",
      },
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });

    const data = response.data.data; // Raw data object received from the API

    const Bitcoin = new Asset("BTC", "1", data);
    const Ethereum = new Asset("ETH", "1027", data);

    bitcoinPrice = Bitcoin.price();
    ethereumPrice = Ethereum.price();

    return data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    return null; // Or throw an error if preferred
  }
}

class Asset {
  constructor(assetName, assetId, data) {
    this.assetName = assetName;
    this.assetId = assetId;
    this.data = data;
    this.assetPrice = this.data[this.assetId].quote.USD.price;
  }
  price() {
    return this.assetPrice;
  }
}

getBitcoinPrice()
  .then((data) =>
    console.log(
      "Current Bitcoin Price >> ",
      bitcoinPrice,
      "\nCurrent Ethereum Price >> ",
      ethereumPrice
    )
  )
  .catch((error) => console.error("Error:", error));
