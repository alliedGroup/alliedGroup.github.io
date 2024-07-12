const apiKey = 'AIzaSyDD9JUeWWqnQ85KPtEtzSCxQ_0rl4DRNqQ'; // Replace with your actual API key
const spreadsheetId = '1d2wVZD2P1W1s2xP8dddxDd-777f9WF7JwNDN3_1wVxc'; // Replace with your actual spreadsheet ID
const range = 'techSupport!A1:H'; // Specify the range of cells you want to fetch

const pendingTable = document.getElementById('pending-table');
const pendingHeadersRow = document.getElementById('pending-headers');
const pendingTableBody = document.getElementById('pending-body');

const resolvedTable = document.getElementById('resolved-table');
const resolvedHeadersRow = document.getElementById('resolved-headers');
const resolvedTableBody = document.getElementById('resolved-body');

// Function to fetch data from Google Sheets
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
        // Display or log specific error message for debugging
    }
}

// Function to process and display the data
function processData(values) {
    if (!values || values.length === 0) {
        console.error('No data found in Google Sheets.');
        return;
    }

    const headers = values[0];
    console.log('Headers:', headers); // Log headers for debugging

    // Clear any existing headers and data in tables
    clearTable(pendingHeadersRow);
    clearTable(resolvedHeadersRow);
    clearTable(pendingTableBody);
    clearTable(resolvedTableBody);

    // Populate headers in the tables
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        pendingHeadersRow.appendChild(th.cloneNode(true));
        resolvedHeadersRow.appendChild(th.cloneNode(true));
    });

    // Populate data rows in the tables
    values.slice(1).forEach(row => {
        if (row.length === headers.length) {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });

            // Add row to pending or resolved table based on status
            if (row[headers.indexOf('Status')] && row[headers.indexOf('Status')].trim() === 'Pending') {
                pendingTableBody.appendChild(tr);
            } else if (row[headers.indexOf('Status')] && row[headers.indexOf('Status')].trim() === 'Resolved') {
                resolvedTableBody.appendChild(tr);
            }
        } else {
            console.warn('Row length does not match headers length:', row);
            console.log('Row details:', row); // Log specific row causing the issue
        }
    });
}

// Function to clear table rows
function clearTable(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

// Call the fetchData function when the page loads
window.onload = function() {
    console.log('Fetching data from Google Sheets API...');
    fetchData();
};
