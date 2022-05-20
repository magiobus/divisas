import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [conversionRate, setConversionRate] = useState(0);
  const [amountOne, setAmountOne] = useState("");
  const [amountTwo, setAmountTwo] = useState("");

  //getting currencies list for select
  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const { data } = await axios.get("/api/getCurrencies");
        setCurrencies(data.currencies);
      } catch (error) {
        console.log(error);
        setCurrencies([]);
      }
    };

    getCurrencies();
  }, []);

  //handles the change of the currency and the conversion rate
  const handleCurrencyChange = async (value) => {
    if (!value) return;
    const currencyObject = currencies.find(
      (currency) => currency.value === value
    );
    setSelectedCurrency(currencyObject); //setting the selected currency
    //getting the conversion rate
    try {
      const { data } = await axios.post(`/api/conversionRate`, {
        currencyCodeOne: currencyObject.codeOne,
        CurrencyCodeTwo: currencyObject.codeTwo,
      });
      setConversionRate(data.conversionRate);
      setAmountOne(""); //clean fields
      setAmountTwo("");
      console.log(data.conversionRate);
    } catch (error) {
      console.log("error getting conversion from api ");
    }
  };

  //handle amounts changes
  const handleAmountChange = (field, value) => {
    if (field === "amountOne") {
      setAmountOne(value);
      setAmountTwo(value * conversionRate);
    }

    if (field === "amountTwo") {
      setAmountTwo(value);
      setAmountOne(value / conversionRate);
    }
  };

  return (
    <div className="layout">
      <Head>
        <title>Calculador de Divisas</title>
        <meta name="description" content="Calculador de divisas de magiobus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="layout flex flex-col justify-between items-center w-full">
        <div className="headercontainer text-xl my-12 font-normal text-center px-4">
          <h1 className="font-bold">
            Calculador de divisas de{" "}
            <a
              className="underline text-blue-400"
              href="https://twitter.com/magiobus"
              target={`_blank`}
            >
              @magiobus
            </a>
          </h1>

          <div className="description text-base mt-8">
            <p className="">Este proyecto te ayuda a convertir divisas.</p>
            <p>
              Usa{" "}
              <a
                href="https://www.currencyconverterapi.com/"
                target={`_blank`}
                className="text-blue-400 underline"
              >
                currencyconverterapi.com
              </a>{" "}
              para hacer las conversiones.
            </p>
          </div>
        </div>
        <div className="divisascontainer  px-4 mt-6 max-w-4xl w-full">
          <div className="topsection">
            <div className="fieldcontainer flex flex-col justify-start item-start ">
              {conversionRate ? (
                <p>
                  Conversion Rate : 1 {selectedCurrency.codeOne} es{" "}
                  {conversionRate} {selectedCurrency.codeTwo}
                </p>
              ) : (
                <p className="">Selecciona tu divisa preferida</p>
              )}
              <select
                className="border  py-1 border-black rounded-md w-full"
                onChange={(e) => handleCurrencyChange(e.target.value)}
              >
                <option value="">Elige una divisa</option>
                {currencies &&
                  currencies.map((currency, index) => {
                    return (
                      <option key={index} value={currency.value}>
                        {currency.value}
                      </option>
                    );
                  })}
              </select>

              {selectedCurrency && (
                <>
                  <div className="valuescontainer my-8">
                    <p className="font-bold">Converte el Valor Deseado</p>
                  </div>
                  <div className="fieldcontainer flex justify-between item-center ">
                    <input
                      className="border py-1 border-black rounded-md w-full mx-4"
                      type="number"
                      placeholder={`${selectedCurrency.codeOne || ""}`}
                      value={amountOne}
                      onChange={(e) =>
                        handleAmountChange("amountOne", e.target.value)
                      }
                    />
                    {`<==>`}
                    <input
                      className="border  py-1 border-black rounded-md w-full mx-4"
                      type="number"
                      placeholder={`${selectedCurrency.codeTwo || ""}`}
                      value={amountTwo}
                      onChange={(e) =>
                        handleAmountChange("amountTwo", e.target.value)
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
