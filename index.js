const cheerio = require("cheerio");
const axios = require("axios");
const jsonFile = require("jsonfile");

const url = "https://www.tpsgc-pwgsc.gc.ca/recgen/dd/etranger-abroad-eng.html";

async function getData() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data, {
      decodeEntities: true,
    });

    const data = $("tr");
    const scrapedData = [];

    data.each(function () {
      countryName = $(this).find("td:nth-child(1)").text().trim();
      bankingInfo = {
        [$(this)
          .find("li:nth-child(1)")
          .text()
          .trim()
          .split(":")[0]
          .toLowerCase()]: $(this)
          .find("li:nth-child(1)")
          .text()
          .trim()
          .split(":")[1],
        [$(this)
          .find("li:nth-child(2)")
          .text()
          .trim()
          .split(":")[0]
          .toLowerCase()]: $(this)
          .find("li:nth-child(2)")
          .text()
          .trim()
          .split(":")[1],
        [$(this)
          .find("li:nth-child(3)")
          .text()
          .trim()
          .split(":")[0]
          .toLowerCase()]: $(this)
          .find("li:nth-child(3)")
          .text()
          .trim()
          .split(":")[1],
        [$(this)
          .find("li:nth-child(4)")
          .text()
          .trim()
          .split(":")[0]
          .toLowerCase()]: $(this)
          .find("li:nth-child(4)")
          .text()
          .trim()
          .split(":")[1],
        [$(this)
          .find("li:nth-child(5)")
          .text()
          .trim()
          .split(":")[0]
          .toLowerCase()]: $(this)
          .find("li:nth-child(5)")
          .text()
          .trim()
          .split(":")[1],
        [$(this)
          .find("li:nth-child(6)")
          .text()
          .trim()
          .split(":")[0]
          .toLowerCase()]: $(this)
          .find("li:nth-child(6)")
          .text()
          .trim()
          .split(":")[1],
      };

      scrapedData.push({ countryName, bankingInfo });

      console.log(JSON.stringify(scrapedData));
    });
  } catch (error) {}
}

getData();
