import converter from 'json-2-csv';
import fs from 'fs';

const convertJsonToCSV = async(jsonData) => {
    try{
        const csv = await converter.json2csv(jsonData);
        fs.writeFileSync("todos.csv",csv);
    }
    catch(err){
        console.log(err);
    }
} 

convertJsonToCSV([{"name": "subhransu", "age": 28, "earning": "50L"},{"name": "subhransu1", "age": 18, "earning": "50T"} ])