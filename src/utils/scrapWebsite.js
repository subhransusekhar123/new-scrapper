import axios from "axios";
import * as cheerio from 'cheerio';
import async from 'async';



async function scrapWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // console.log($,"htmlofUrl");
    const extractedEmails = $('a[href^="mailto:"]').map((index, element) => $(element).attr('href').replace('mailto:', '')).toArray();
   

    console.log(extractedEmails,url, "hello world");
    console.log(`Data scraped successfully from ${url}`);
    if (extractedEmails.length > 0) {
      console.log({ emails:extractedEmails, url: url.replace("https://", "")  })
      return { emails:extractedEmails, url: url.replace("https://", "") };
      
    } else {
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error(
        `Error fetching data from ${url}. Status code: ${error.response.status}`,
      );
      return null;
    } else if (error.request) {
      console.error(`Error fetching data from ${url}. No response received.`);
      return null;
    } else {
      console.error(`Error fetching data from ${url}:`, error.message);
      return null;
    }
  }
}




const dataAfterScrapingWebs = (urls) => {

  return new Promise((res, rej) => {
    const allUrl = urls.map((url, i) => {
      return async () => {
        try {
          return await scrapWebsite(url)
        } catch (error) {
          console.error("Error scraping this website", error.message);
        }
      }


    })

    console.log(allUrl);

    async.parallel(
      allUrl,
      (err, results) => {
        if (err) {
          console.error("Error scraping websites", err.message);
          rej(err)
        }
        else {
          console.log(results, "results");
          res(results)
        }
        // console.log(err, results)
      }
    );

  })
  //     // let results = [] ;



  //     // console.log(results, "results from last scrap")
};




export default dataAfterScrapingWebs;
