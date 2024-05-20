const downloadCsv = (req, res) => {
    res.download("./public/temp/new.csv")
}

export default downloadCsv ;