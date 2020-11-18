var apiKey = "pk.eyJ1IjoiZmF0aW1hMTU4MCIsImEiOiJja2dyYjY4MHQwMDdsMnRtNXNrMzMwYXd6In0.CgL5LKnOSUX07klUOtByJA";


/* global Plotly */
let allData = [];
var url = "http://127.0.0.1:5000/api/data";
d3.json(url).then(data => {
  allData = data;
  handleSubmit();
});
// fetch(url).then(data=> data.json()).then(jsondata => {
//   // console.log(jsondata);
//   d3.json(url).then(res => console.log(res));



//   d3.json(url,function(data){

//     // Grab values from the response json object to build the plots
//     var name = data.Incident_Date;

//     console.log(data);});
// })


/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

// Submit Button handler
function handleSubmit() {
  // d3.json(url, function (data) {

    // Grab values from the response json object to build the plots
    // var name = data.Incident_Date;

    // console.log(data);
  // });
  // Prevent the page from refreshing
  // d3.event.preventDefault();

  // Select the input value from the form
  var year = d3.select("#selYear").node().value;
  
  const filteredData = allData.filter(item => item['Incident Date'].includes(year));


  // clear the input value
  // d3.select("#selYear").node().value = "";

  // Build the plot with the new stock
  buildPlot(filteredData);
}

// function unpack(rows, index) {
//   return rows.map(function (row) {
//     return row[index];
//   });
// }

function draw(dates, categories, values, dateValues){
  var maxDate = dates[dates.length - 1];

  var minDate = dates[0];

  var trace1 = {
    type: "bar",
    name: name,
    x: categories,
    y: values,
    line: {
      color: "#17BECF"
    }
  };
  var trace2 = {
    type: "bar",
    x: dates,
    y: dateValues
  }

  var data = [trace1];

  var layout = {
    title: "By Category",
    // xaxis: {
    //   title: 'Crime category'

    //},
    yaxis: {
      title: 'Incidents'
    }
  };
  console.log(dates);
  //console.log(layout);
  Plotly.newPlot("Bar", data, layout);
  Plotly.newPlot("Bar2", [trace2]);
}

function buildPlot(filteredData) {
  var dates = []; // filteredData.map(row => row["Incident Date"].replace('/', '-'));
  var categories = [];
  var values = [];
  var totalValue = [];
  
  filteredData.forEach(row => {
    
    // let monthInt = row["Incident Date"].match(/^\d+/)[0]; // 1/2/2016 => 1
    let date = new Date(row["Incident Date"]);
    
    let month = date.toString().substr(4,3) // Thur Mar 13 2020 ...

    if (!dates.includes(month)) {
      dates.push(month)
      totalValue[dates.indexOf(month)] = 0;
    }
    totalValue[dates.indexOf(month)]++;
    if (!categories.includes(row["Incident Category"])) {
      categories.push(row["Incident Category"])

    }
    if (!values[categories.indexOf(row["Incident Category"])]) {
      values[categories.indexOf(row["Incident Category"])] = 1;

    } else {
      values[categories.indexOf(row["Incident Category"])]++;
    }
  })
  // draw
  draw(dates, categories, values, totalValue);
  

//   // d3.json(url).then(function(data) {
//   d3.json(url).then(function (data) {

//     // Grab values from the response json object to build the plots
//     // var name = data.Incident_Date;

//     // console.log(data);

//     // // Print the data for each day

//     // //use map to build an array with map
//     // //the stuff in the graph

//     // var dates = data.map(row => row["Incident Date"]);
//     // console.log(dates);
//     // var categories = [];
//     // var values = [];
//     // data.forEach(row => {

//     //   if (!categories.includes(row["Incident Category"])) {


//     //     categories.push(row["Incident Category"])

//     //   }
//     //   if (!values[categories.indexOf(row["Incident Category"])]) {
//     //     values[categories.indexOf(row["Incident Category"])] = 1;


//     //   } else {
//     //     values[categories.indexOf(row["Incident Category"])]++;

//     //   }



//     // });

//     // console.log(categories);
//     // console.log(values);

//     //init for dropdown? do filter

//     //in class
//     //use map to build an array with map for closing dates
//     // var closingPrices = data.dataset.data.map(row => row[4]);
//     //do dates
//     var maxDate = dates[dates.length - 1];

//     var minDate = dates[0];






//   // Initialize an empty array for the country's data
//   // var data = [];

//     //do filter for dropdown
//     // var filterdata = [];
//     // data.forEach(row => {
//     //   if (row["Incident Date"].includes("2018")) {
//     //     filterdata.push(row);

//     //   }
//     //   else if (row["Incident Date"].includes("2019")) {
//     //     filterdata.push(row);
//     //   }
//     //   else if (row["Incident Date"].includes("2020")) {
//     //     filterdata.push(row);
//     //   }

//     // })
  
    
// console.log(filterdata);


//     var trace1 = {
//       type: "Bar",
//       name: name,
//       x: categories,
//       y: values,
//       line: {
//         color: "#17BECF"
//       }
//     };

//     var data = [trace1];

//     var layout = {
//       title: "date",
//       xaxis: {
//         range: [minDate, maxDate],
//         type: "date"

//       },
//       yaxis: {
//         autorange: true,
//         type: "linear"
//       }
//     };

//     // Plotly.newPlot(document.getElementById("graph"), data);
//     Plotly.newPlot("Bar", data, layout);


//   }
//   );

};

// Add event listener for submit button
// d3.select("#submit").on("click", handleSubmit);
d3.select("#selYear").on("change", handleSubmit);
// handleSubmit();
// buildPlot();