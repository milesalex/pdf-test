const express = require("express");
const pdfFiller = require('pdffiller');
const fillPdf = require("fill-pdf");
const fs = require("fs");

const app = express();
app.use(express.static('files'))

var sourcePDF = "/files/test.pdf";
var destinationPDF =  "test_complete_alex.pdf";
var data = {
  "last_name" : "John",
  "first_name" : "Doe",
  "date" : "Jan 1, 2013",
  "football" : "Off",
  "baseball" : "Yes",
  "basketball" : "Off",
  "hockey" : "Yes",
  "nascar" : "Off"
};

app.get('/pdf', function(req, res) {
  var shouldFlatten = false;

  pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
    console.log('hi');
    if (err) throw err;
    console.log("In callback (we're done).");
  })
})


app.get('/pdf2', function(req, res) {
  fillPdf.generatePdf({}, sourcePDF, function(err, output) {
    if ( !err ) {
      res.type("application/pdf");
      res.send(output);
    }
  });
});


app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
