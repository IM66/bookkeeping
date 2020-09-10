const csv = require('csvtojson')
const csvFilePath = 'data.csv'

function readCsv(filePath, params) {
  const opts = {
    noheader: true,
    ignoreEmpty: true,
    ...params
  }

  csv({
    noheader: opts.noheader,
    ignoreEmpty: opts.ignoreEmpty,
    headers: opts.headers,
    ignoreColumns: opts.ignoreColumns,
  })
  .fromFile(filePath)
  .preFileLine((fileLineString, lineIndex) => {
    if (params.headerLine && lineIndex < params.headerLine) {
      return ''
    }
    return fileLineString
  })
  .subscribe((jsonObj) => {
    opts.subscribe(jsonObj)
  })
  .then((jsonObj) => {
    console.log(jsonObj)
  })
}

readCsv(csvFilePath, {
  headerLine: 17,
  headers: ['createTime', 'tradeType', 'shopName', 'info', 'type', 'price', 'payType', 'payStatus', 'id', 'shopId', 'remark'],
  ignoreColumns: /(tradeType|payType|shopId|remark)/,
  subscribe: (jsonObj) => {
    jsonObj.price = jsonObj.price.replace(/¥/, '')
  }
})
