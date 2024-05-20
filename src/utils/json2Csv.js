
import { json2csv } from 'json-2-csv';
import fs from 'fs' ;



const myCars = [
  {
    "carModel": "Audi",
    "price": 0,
    "colors": ["blue","green","yellow"]
  }, {
    "carModel": "BMW",
    "price": 15000,
    "colors": ["red","blue"]
  }, {
    "carModel": "Mercedes",
    "price": 20000,
    "colors": "yellow"
  }, {
    "carModel": "Porsche",
    "price": 30000,
    "colors": ["green","teal","aqua"]
  }
];

const json2Csv = (data) => {
    // const fields = ['emails', 'url'];
    // const transforms = [unwind({ paths: ['emails'] })];

    const csv = json2csv(data, {
        parseValue:true,
        prependHeader:true,
        sortHeader:false,
        trimFieldValues:false,
        trimHeaderFields:false,
        unwindArrays:true
    })
    
    // const json2csvParser = new Parser({ fields, transforms });
    // const csv = json2csvParser.parse(data);

    try {
        fs.writeFileSync('./public/temp/new.csv', csv);
        console.log("file written successfully")
      } catch (err) {
        console.error(err);
      }
   
}

export default json2Csv ;



