import axios from "axios";
import * as cheerio from 'cheerio';
import async from 'async';




async function scrapWebsite(url,callback) {

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const bodyText = $('body').text();
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const emails = new Set(); // Using a set to avoid duplicates;


        let match;
        while (match = emailRegex.exec(bodyText)) {
            emails.add(match[0]);
        }

        console.log(Array.from(emails), url);
        console.log(`Data scraped successfully from ${url}`);
        callback([ Array.from(emails) , url ])
        
    } catch (error) {

        if (error.response) {

            console.error(`Error fetching data from ${url}. Status code: ${error.response.status}`);
        } else if (error.request) {

            console.error(`Error fetching data from ${url}. No response received.`);
        } else {

            console.error(`Error fetching data from ${url}:`, error.message);
        }
    }
}


// const dataAfterScrapingWebs = async(urls, callback) => {
//     async.parallel(urls => {
//         urls.map(url => {
//             return async(cb)=>{
//                await scrapWebsite(url,cb)
//             }
//         }),
//         (err, results) => {
//             if(err){
//                 console.error("Error scraping this website", err.message)
//                 return callback(err);
//             }
//             callback(null, results)
//         }
//     })
// }


const dataAfterScrapingWebs = (urls, callback) => {

    const allUrl = urls.map((url, i) => {
        console.log(i)
        return async (cb) => {
            try {
                const result = await scrapWebsite(url);
                cb(null, result);
            } catch (error) {
                console.error("Error scraping this website", error.message);
                cb(error);
            }
        };
    })

    console.log(allUrl);
    
    async.parallel(
        allUrl,
        (err, results) => {
            if (err) {
                console.error("Error scraping websites", err.message);
                return callback(err);
            }
            callback(null, results);
        }
    );
};




export default dataAfterScrapingWebs ;
