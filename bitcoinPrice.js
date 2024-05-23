const axios = require("axios");
require("dotenv").config();

// Replace with your API key
const apiKey = process.env.CMC_API_TOKEN;

const baseUrl =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

async function getBitcoinPrice() {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        limit: 1, // Only fetch data for 1 cryptocurrency (Bitcoin)
        convert: "USD", // Convert price to USD
      },
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });

    const data = response.data.data[0]; // Access data for the first cryptocurrency (Bitcoin)
    const price = data.quote.USD.price;

    return price;
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    return null; // Or throw an error if preferred
  }
}

getBitcoinPrice()
  .then((price) => console.log("Current Bitcoin price:", price))
  .catch((error) => console.error("Error:", error));
