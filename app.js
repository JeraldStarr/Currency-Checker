const request = require("request");
const fs = require("fs");
const validCodes = ["usd", "gbp", "eur", "chf"];
const code = process.argv[2];
const isValid = validCodes.find(currency => currency === code) ? true : false;
const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;

request(url, {
  json: true
}, (err, res, body) => {
  setCorrectGrammar(body);
  console.log(`Kurs ${body.currency} w dniu ${body.rates[0].effectiveDate} wynosi ${body.rates[0].mid}`);
});

const setCorrectGrammar = body => {
  switch (process.argv[2]) {
    case "usd" || "USD":
      body.currency = "dolara amerykańskiego";
      break;
    case "gbp" || "GBP":
      body.currency = "funta szterlinga";
      break;
    case "chf" || "CHF":
      body.currency = "franka szwajcarskiego";
      break;
  };
};