const apiKey = 'AIzaSyDD9JUeWWqnQ85KPtEtzSCxQ_0rl4DRNqQ'; // Replace with your actual API key
const spreadsheetId = '1d2wVZD2P1W1s2xP8dddxDd-777f9WF7JwNDN3_1wVxc'; // Replace with your actual spreadsheet ID
const range = 'techSupport!A1:I'; // Specify the range of cells you want to fetch, adjust H as per your sheet's columns

// Variable to set how many rows to display
const rowsToDisplay = 10; // Change this value to display a different number of rows

// Function to fetch data from Google Sheets API
async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data for debugging
        processData(data.values);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, show error message, etc.
    }
}

// Function to process and display the data
function processData(values) {
    if (!values || values.length === 0) {
        console.error('No data found in Google Sheets.');
        return;
    }

    const headers = values[0]; // First row contains headers
    console.log('Headers:', headers); // Log headers for debugging

    // Find the table headers in HTML
    const tableHeaders = document.querySelectorAll('#pending thead th');
    console.log('Table Headers:', tableHeaders); // Log table headers for debugging

    // Clear any existing data in the table body
    const tableBody = document.getElementById('tickets');
    tableBody.innerHTML = '';

    // Find index positions of headers from Google Sheet in HTML table headers
    const headerIndexes = [];
    headers.forEach((header, index) => {
        const foundHeader = Array.from(tableHeaders).find(th => th.textContent.trim() === header.trim());
        if (foundHeader) {
            headerIndexes.push(index);
        }
    });

    // Select the last 'rowsToDisplay' rows, if there are less than 'rowsToDisplay' rows, select all excluding the header
    const dataRows = values.length > rowsToDisplay + 1 ? values.slice(-rowsToDisplay) : values.slice(1);

    // Reverse the data rows to display last row first
    const reversedDataRows = dataRows.reverse();

    // Populate data rows in the table body
    reversedDataRows.forEach(row => {
        const tr = document.createElement('tr');
        headerIndexes.forEach(index => {
            const td = document.createElement('td');
            td.textContent = row[index] || ''; // Use empty string if cell is empty
            tr.appendChild(td);
        });

        // Create Resolve Action button in the last column (index 7, 8th column)
        const actionTd = document.createElement('td');
        const resolveButton = document.createElement('button');
        resolveButton.textContent = 'Resolved ?';
        resolveButton.addEventListener('click', () => {
            document.querySelector("#resolvedForm").style.display ="Block";
            document.querySelector("#resolvedId").setAttribute("value", `${row[0]}`); ;
            console.log("Button Clicked")
        });
        actionTd.appendChild(resolveButton);
        tr.appendChild(actionTd);

        tableBody.appendChild(tr);
    });
}

// Call fetchData function when the page loads
window.onload = function() {
    console.log('Fetching data from Google Sheets API...');
    fetchData();
};



// Resolve Action 
// Cencel Button
document.querySelector("#cencelBtn").addEventListener("click", function(){
    document.querySelector("#resolvedForm").style.display ="none";
})
document.getElementById('resolutionTime').value=(function(){const now=new Date(),year=now.getFullYear(),month=String(now.getMonth()+1).padStart(2,'0'),day=String(now.getDate()).padStart(2,'0'),hours=String(now.getHours()).padStart(2,'0'),minutes=String(now.getMinutes()).padStart(2,'0'),seconds=String(now.getSeconds()).padStart(2,'0');return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`})();
