
// Fetch District From Zip Code
document.getElementById('zip').addEventListener('input', fetchDistrict);
async function fetchDistrict() {
    const pinCode = document.getElementById('zip').value;
    const districtSelect = document.getElementById('district');
    if (pinCode.length === 6 && /^\d{6}$/.test(pinCode)) {
        const url = `https://api.postalpincode.in/pincode/${pinCode}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data[0].Status === 'Success') {
                const districts = data[0].PostOffice.map(postOffice => postOffice.District);
                const uniqueDistricts = [...new Set(districts)];
                districtSelect.innerHTML = '';
                uniqueDistricts.forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else {
                districtSelect.innerHTML = '<option value="">Invalid zip code</option>';
            }
        } catch (error) {
            districtSelect.innerHTML = '<option value="">Error fetching data</option>';
            console.error('Error:', error);
        }
    } else {
        districtSelect.innerHTML = '<option value="">Invalid zip code</option>';
    }
}





// Enquiry Source
const showroomDropdown = document.getElementById('showroomDropdown');
    const fieldDropdown = document.getElementById('fieldDropdown');
    const digitalPromotionDropdown = document.getElementById('digitalPromotionDropdown');
    document.querySelectorAll('input[name="enquirySource"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            if (event.target.id === 'Showroom') {
                fetchOptions();
                showroomDropdown.style.display = 'block';
                fieldDropdown.style.display = 'none';
                digitalPromotionDropdown.style.display = 'none';
                // Fetch Showroom Option 
                async function fetchOptions() {
                    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';
                    try {
                        const response = await fetch(url);
                        const data = await response.text();
                        // Split the CSV data into rows
                        const rows = data.split('\n');
                        const options = [];
                        // Iterate over the rows starting from index 1 (D2 in Google Sheets)
                        for (let i = 1; i < rows.length; i++) {
                            // Split the row into cells
                            const cells = rows[i].split(',');
                            // Check if the cell is not empty and add it to the options array
                            if (cells[3] && cells[3].trim() !== '') {
                                options.push(cells[3].trim());
                            }
                        }
                        // Populate the select dropdown with the fetched options
                        const select = document.getElementById('showroomDropdown');
                        options.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.value = option;
                            optionElement.textContent = option;
                            select.appendChild(optionElement);
                        });
                    } catch (error) {
                        console.error('Error fetching options:', error);
                    }
                }
            } else if (event.target.id === 'Field') {
                showroomDropdown.style.display = 'none';
                fieldDropdown.style.display = 'block';
                digitalPromotionDropdown.style.display = 'none';
            } else if (event.target.id === 'DigitalPromotion') {
                showroomDropdown.style.display = 'none';
                fieldDropdown.style.display = 'none';
                digitalPromotionDropdown.style.display = 'block';
            }
        });
    });



    