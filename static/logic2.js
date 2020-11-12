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
  // Prevent the page from refreshing
  // d3.event.preventDefault();

  // Select the input value from the form
  var years = d3.select("#selYear").node().value;
  console.log(years);


  // clear the input value
  d3.select("#selYear").node().value = "";

  // Build the plot with the new stock
  buildPlot();
}

function buildPlot() {

  d3.json("static/file2.json").then(function(data) {
    console.log(data)
    // Grab values from the response json object to build the plots
    var name = data.Incident_Date;
    // var stock = data.dataset_code;
    // var startDate = data.start_date;
    // var endDate = data.end_date;
    // Print the names of the columns
    console.log(data);
    // Print the data for each day
    // console.log(data.dataset.data);

    //in class
    //use map to build an array with map
    var dates = data.map(row => row["Incident Date"]);
    console.log(dates);
    var categories = [];
    var values= [];
    data.forEach (row => {

      if(!categories.includes(row["Incident Category"])){

        
        categories.push(row["Incident Category"])
        
      }
      if (!values[categories.indexOf(row["Incident Category"])]){
        values[categories.indexOf(row["Incident Category"])] = 1;

       
      }else{
        values[categories.indexOf(row["Incident Category"])]++;

      }

      
      
      });

    console.log(categories);
console.log(values);
    
    //in class
    //use map to build an array with map for closing dates
    // var closingPrices = data.dataset.data.map(row => row[4]);
    // console.log(closingPrices);

    var maxDate= dates[dates.length-1];

    var minDate = dates[0];

    var trace1 = {
      type: "Bar",
      name: name,
      x: categories,
      y: values,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: "closing prices",
      xaxis: {
        range: [minDate, maxDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot(document.getElementById("graph"), data);

  });
}

// Add event listener for submit button
// d3.select("#submit").on("click", handleSubmit);

handleSubmit();