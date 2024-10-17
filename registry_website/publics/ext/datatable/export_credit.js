// Function to convert a DataTable to CSV
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    // Loop through each row of the table
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        // Loop through each cell (td or th) of the row
        for (var j = 0; j < cols.length; j++) {
            // Add the cell's text content, and escape any quotes
            row.push('"' + cols[j].innerText.replace(/"/g, '""') + '"');
        }

        // Join the row with commas and push to the CSV array
        csv.push(row.join(","));
    }

    // Create a CSV string from the CSV array
    var csvString = csv.join("\n");

    // Trigger the download
    var downloadLink = document.createElement("a");
    var blob = new Blob([csvString], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;

    // Set the file name for the download
    downloadLink.download = filename;

    // Append the link to the document and trigger a click
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up by removing the link after the download
    document.body.removeChild(downloadLink);
}

// Example usage
document.querySelector("#exportButton").addEventListener("click", function() {
    exportTableToCSV('data.csv');
});