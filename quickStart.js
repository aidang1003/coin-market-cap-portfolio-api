/* Example in Node.js */
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.CMC_API_TOKEN;

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      }
    );
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    resolve(json);
  }
});
