const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGT5WKe9uPALCKnQ5prdzp-VqDV1cXsPxJQF5VVEXJV14y2Cni_tztGKADE7hvdc2wbLqHE0-69yT_/pub?output=csv';
const pendingTableBody = document.getElementById('pending-body');
const resolvedTableBody = document.getElementById('resolved-body');

fetch(SHEET_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(csvText => {
        const rows = csvText.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const tableHeaders = ['TH ID', 'Department', 'Designation', 'Name', 'WhatsApp Number', 'Issue', 'Status', 'Resolution Time'];

        rows.slice(1).forEach(row => {
            if (row.length === headers.length) {
                const tr = document.createElement('tr');
                tableHeaders.forEach((header, index) => {
                    const td = document.createElement('td');
                    td.textContent = row[index];
                    tr.appendChild(td);
                });

                // Add button to mark as resolved
                const actionTd = document.createElement('td');
                const resolveButton = document.createElement('button');
                resolveButton.textContent = 'Resolved ?';
                resolveButton.addEventListener('click', () => {
                    // console.log(`Marking TH ID ${row[0]} as Resolved`);
                    document.querySelector("#resolvedForm").style.display ="Block";
                    document.querySelector("#resolvedId").setAttribute("value", `${row[0]}`); ;
                });
                actionTd.appendChild(resolveButton);
                tr.appendChild(actionTd);

                if (row[headers.indexOf('Status')].trim() === 'Pending') {
                    pendingTableBody.appendChild(tr); // Append to Pending table body
                } else if (row[headers.indexOf('Status')].trim() === 'Resolved') {
                    resolvedTableBody.appendChild(tr); // Append to Resolved table body
                }
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));



// Resolve Action 
// Cencel Button
document.querySelector("#cencelBtn").addEventListener("click", function(){
    document.querySelector("#resolvedForm").style.display ="none";
})
    
