var fs = require('fs')

fs.readFile('data.csv', function(err, data) {
  // var table = new Array()
  if (err) {
    console.log(err.stack)
    return
  }
  ConvertToTable(data, function (table) {
    // console.log(table);
  })
})

function ConvertToTable(data, callBack) {
  data = data.toString();
  var table = new Array();
  var rows = new Array();
  rows = data.split("\r\n");
  console.log(rows)
  for (var i = 0; i < rows.length; i++) {
      table.push(rows[i].split(","));
  }
  callBack(table);
}