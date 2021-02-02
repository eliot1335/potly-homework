/* 1. Use the D3 library to read in samples.json.
   2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in an individual.
   - Use samples_values as the values for the bar chart.
   - Use otu_ids as the labels for the bar chart.
   - Use otu_labels as the hovertext for the chart.
   3. Create a bubble chart that displays each samlpe.
   - Use otu_ids for the x values.
   - Use sample_values for the y values.
   - Use otu_ids for the marker colors.
   - Use otu_labels for the text values.
   4. Display the sample metadat, i.e., an individual's demographic information.
   5. Display each key-value pair from the metadata JSON object somewhere on the page.
   6. Update all of the plots any time that a new sample is selected.
  */
 
// d3.json("../samples.json").then(function(jsonData) {
//   console.log(jsonData);
// });
// Initializes the page
function init() {
  d3.json("../samples.json").then(function(jsonData) {

    // Populate dropdown
    var select = document.getElementById("selDataset");
    var options = jsonData["names"]
    for (var i = 0; i < options.length; i++) {
      var opt =options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    };

    var sampleId = jsonData.names[0];
    buildDisplays(sampleId);
  })
}


// Call optionChanged() when a change takes place to the DOM
function optionChanged(sampleId) {
  buildDisplays(sampleId);
}



function buildDisplays(sampleId) {
  // Read in json file
  d3.json("../samples.json").then(function(jsonData) {
    var sFilter = jsonData["samples"].filter(row => row["id"] == sampleId);
    var mFilter = jsonData["metadata"].filter(row => row["id"] == sampleId);

    // Set variables for bubble chart
    var xBubble = sFilter[0].otu_ids;
    var yBubble = sFilter[0].sample_values;
    var sizeBubble = sFilter[0].sample_values;
    var colorBubble = sFilter[0].otu_ids;
    var textBubble = sFilter[0].otu_labels;

    // Set bubble chart parameters
    var bubble = {
      x: xBubble,
      y: yBubble,
      text: textBubble,
      mode: "markers",
      marker: {
        size: sizeBubble,
        color: colorBubble,
        colorscale: "Earth"
      }
    };

    // var data1 = bubble;
    var layout1 = {
      title: "Belly Button Bacteria",
      xaxis: {title: "OTU ID"}
    };

    var dataBubble = [bubble];

    // Plot bubble Chart
    Plotly.newPlot("bubble", dataBubble, layout1);

    //==========================================
    // Set Variables for Bar Chart
    
    // top10Data = samplesFilter[0].sort(compareValues("sample_values", "desc")).slice(0, 10);
    // console.log(top10Data);



    var xBar = sFilter[0].sample_values.slice(0, 10).reverse();
    console.log(xBar);
    // var xBarTop10 = xBar.sort((firstNum, secondNum) => secondNum - firstNum).slice(0, 10);
    // console.log(xBar);
    var yBar = `${sFilter[0].otu_ids}`;
    var textBar = sFilter[0].otu_labels.slice(0, 10);

    // Set bubble chart parameters
    var bar = {
      x: xBar,
      y: yBar,
      text: textBar,
      type: 'bar',
      orientation: 'h'
    };

    var layout2 = {
      title: "Top 10 OTUs Found",
      xaxis: {title: "Values"},
      yaxis: {title: "OTU Labels"}
    };

    var dataBar = [bar];

    // Plot bubble Chart
    Plotly.newPlot("bar", dataBar, layout2);


    // ======================================
    // Display metaData
    var metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");
    Object.entries(mFilter[0]).forEach(([key, value]) => {
      metadataPanel.append("h6").text(`${key}: ${value}`);
    });
  });
}

init();



// dropdown menu create id filter
  // insert filtered id to grab the info we want
// metadata populate
// initialize page
  // first id
    //metadata
    //barchart
    //bubblechart
// option change
  // selected id
    //metadata
    //barchart
    //bubblechart



/* To-Do:
1. Bar Chart Layout
2. Bar Chart Top10 ***
3. Bubble Chart color
4. Combine 3 Charts function
*/