import axios from "axios";

export default async function handler(req, res) {
  //VALIDATIONS
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  //checks if the two currency codes are valid
  let { currencyCodeOne, CurrencyCodeTwo } = req.body;
  if (!currencyCodeOne || !CurrencyCodeTwo) {
    res.status(400).json({
      error:
        "Missing currencyCodeOne or CurrencyCodeTwo, you need to provide both codes",
    });
  }

  //same codes validation
  if (currencyCodeOne === CurrencyCodeTwo) {
    res.status(400).json({
      error: "Currency codes need to be different",
    });
  }

  //Call API to get conversion rate
  let url = `https://free.currconv.com/api/v7/convert?q=${currencyCodeOne}_${CurrencyCodeTwo}&compact=ultra&apiKey=${process.env.CURRENCY_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    const conversionRate = data[`${currencyCodeOne}_${CurrencyCodeTwo}`];
    console.log("conversionRate", conversionRate);
    res.status(200).json({
      conversionRate,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something failed, getting the conversion rate from API",
    });
  }
}
