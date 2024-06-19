
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
