import getTime from "../../newIndex.js";
import websiteModel from "../model/websiteModel.js";
import readCsv from "../utils/readCsv.js";
import dataAfterScrapingWebs from "../utils/scrapWebsite.js";
import processStrings from "../utils/validUrl.js";


const extractEmailFromUrl = async (req, res) => {
    getTime();
    try {
        if (!req.file?.path) {
            return res.status(400).send("No file uploaded.");
        }

        const csvFile = req.file.path;
        console.log(req.file, "extractEmailFromUrl");

        // Read the CSV file
        const data = await readCsv(csvFile);
        console.log(data, "extractEmailFromUrl");

        // Process strings to add https
        const httpsAddedUrls = await processStrings(data.onlyCompany, 1000);

        // Scrape all URLs
        dataAfterScrapingWebs(httpsAddedUrls, (err, results) => {
            console.log("entered into data");
            if (err) {
                console.log(err.message);
                return res.status(500).send("An error occurred while scraping the websites.");
            } else {
                console.log(results, "from data scraping all the urls");
                return res.send("hello world");
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `It is from :: extractEmailUrl ${error.message}`
        });
    }
};
export default extractEmailFromUrl;