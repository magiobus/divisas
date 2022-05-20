const currencies = [
  {
    value: "USD/MXN",
    codeOne: "USD",
    codeTwo: "MXN",
  },
  {
    value: "MXN/USD",
    codeOne: "MXN",
    codeTwo: "USD",
  },
  {
    value: "USD/EUR",
    codeOne: "USD",
    codeTwo: "EUR",
  },
  {
    value: "EUR/USD",
    codeOne: "EUR",
    codeTwo: "USD",
  },
  {
    value: "USD/GBP",
    codeOne: "USD",
    codeTwo: "GBP",
  },
  {
    value: "GBP/USD",
    codeOne: "GBP",
    codeTwo: "USD",
  },
  {
    value: "USD/CAD",
    codeOne: "USD",
    codeTwo: "CAD",
  },
  {
    value: "CAD/USD",
    codeOne: "CAD",
    codeTwo: "USD",
  },
  {
    value: "USD/JPY",
    codeOne: "USD",
    codeTwo: "JPY",
  },
  {
    value: "JPY/USD",
    codeOne: "JPY",
    codeTwo: "USD",
  },
];

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  return res.status(200).json({
    currencies,
  });
}
