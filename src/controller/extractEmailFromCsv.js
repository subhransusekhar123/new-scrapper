import getTime from "../../newIndex.js";
import websiteModel from "../model/websiteModel.js";
import readCsv from "../utils/readCsv.js";
import dataAfterScrapingWebs from "../utils/scrapWebsite.js";
import processStrings from "../utils/validUrl.js";


const extractEmailFromUrl = async (req, res) => {
    //data came 
    //push it to read data in csv

    //after that send it to mongodb
    //fetch that and run it to scrap website
    getTime()
    try {

        let data;
        let saveData;

        console.log(req.file, "extractEmailFromUrl")
        const csvFile = req.file.path;
        if (req.file?.path) {
            data = await readCsv(csvFile)
            console.log(data, "extractEmailFromUrl");

            processStrings(data.onlyCompany, 1000)
                .then(async (data) => {
                    console.log(data, "dataString")
                    // const allwebsitesName = new websiteModel({
                    //     websiteNamesArray: data,
                    //     name: req.file.originalname
                    // })

                    // saveData = await allwebsitesName.save();
                    // console.log(saveData)



                    dataAfterScrapingWebs(data, (err, results) => {
                        if (err) {
                            console.error("Error scraping websites:", err);
                        } else {
                            console.log("Scraping results:", results);
                        }
                    });
                    // for (let i = 0; i < data.length; i++) {
                    //     await dataAfterScrapingWebs(data[i])
                    //         .then((data) => console.log(data))
                    //         .catch((err) => console.log(err))
                    // }

                 getTime()

                }) //this is just to add https to all the data

                res.send("hello world ")

        }

       
    } catch (error) {
        console.log(error)
    }


    // if(data){
    //     dataAfterScrapingWebs(data)
    // }

}

export default extractEmailFromUrl;