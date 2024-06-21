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
    document.querySelectorAll('input[name="Enquiry Source"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            if (event.target.id === 'Showroom') {
                fetchOptions();
                document.querySelector("#fieldLocation").style.display ='none';
                showroomDropdown.style.display = 'block';
                fieldDropdown.style.display = 'none';
                digitalPromotionDropdown.style.display = 'none';
                fieldDropdown.setAttribute("name", "");
                digitalPromotionDropdown.setAttribute("name", "");
                showroomDropdown.setAttribute("name", "Enquiry Type");
                async function fetchOptions(){const e='https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';try{const t=await fetch(e),n=await t.text(),o=n.split('\n'),r=[];for(let e=1;e<o.length;e++){const t=o[e].split(',');t[3]&&t[3].trim()!==''&&r.push(t[3].trim())}const s=document.getElementById('showroomDropdown');r.forEach(e=>{const t=document.createElement('option');t.value=e,t.textContent=e,s.appendChild(t)})}catch(e){console.error('Error fetching options:',e)}};
            } else if (event.target.id === 'Field') {
                fetchOptions();
                showroomDropdown.style.display = 'none';
                fieldDropdown.style.display = 'block';
                document.querySelector("#fieldLocation").style.display ='block';
                digitalPromotionDropdown.style.display = 'none';
                async function fetchOptions(){const e='https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';try{const t=await fetch(e),n=await t.text(),o=n.split('\n'),r=[];for(let e=1;e<o.length;e++){const t=o[e].split(',');t[4]&&t[4].trim()!==''&&r.push(t[4].trim())}const s=document.getElementById('fieldDropdown');r.forEach(e=>{const t=document.createElement('option');t.value=e,t.textContent=e,s.appendChild(t)})}catch(e){console.error('Error fetching options:',e)}};
                showroomDropdown.setAttribute("name", "")
                digitalPromotionDropdown.setAttribute("name", "")
                fieldDropdown.setAttribute("name", "Enquiry Type");
            } else if (event.target.id === 'DigitalPromotion') {
                document.querySelector("#fieldLocation").style.display ='none';
                fetchOptions();
                showroomDropdown.style.display = 'none';
                fieldDropdown.style.display = 'none';
                digitalPromotionDropdown.style.display = 'block';
                async function fetchOptions(){const e='https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';try{const t=await fetch(e),n=await t.text(),o=n.split('\n'),r=[];for(let e=1;e<o.length;e++){const t=o[e].split(',');t[5]&&t[5].trim()!==''&&r.push(t[5].trim())}const s=document.getElementById('digitalPromotionDropdown');r.forEach(e=>{const t=document.createElement('option');t.value=e,t.textContent=e,s.appendChild(t)})}catch(e){console.error('Error fetching options:',e)}};
                showroomDropdown.setAttribute("name", "")
                fieldDropdown.setAttribute("name", "");
                digitalPromotionDropdown.setAttribute("name", "Enquiry Type");
            }
        });
    });

    
// Fetch options for Enquiry Capture By
async function fetchCaptureByOptions(){const url='https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';try{const response=await fetch(url);const data=await response.text();const rows=data.split('\n');const options=[];for(let i=1;i<rows.length;i++){const cells=rows[i].split(',');if(cells[6]&&cells[6].trim()!==''){options.push(cells[6].trim());}}const select=document.getElementById('captureByDropDown');options.forEach(option=>{const optionElement=document.createElement('option');optionElement.value=option;optionElement.textContent=option;select.appendChild(optionElement);});}catch(error){console.error('Error fetching options:',error);}}fetchCaptureByOptions();

//Fetch options for Enquiry Allocated To
async function fetchAllocatedOptions(){const url='https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';try{const response=await fetch(url);const data=await response.text();const rows=data.split('\n');const options=[];for(let i=1;i<rows.length;i++){const cells=rows[i].split(',');if(cells[6]&&cells[6].trim()!==''){options.push(cells[6].trim());}}const select=document.getElementById('allocatedToDropDown');options.forEach(option=>{const optionElement=document.createElement('option');optionElement.value=option;optionElement.textContent=option;select.appendChild(optionElement);});}catch(error){console.error('Error fetching options:',error);}}fetchAllocatedOptions();

// Timestamp and Enquiry ID
function updateTimestamp(){const e=new Date,t=("0"+e.getDate()).slice(-2)+"/"+("0"+(e.getMonth()+1)).slice(-2)+"/"+e.getFullYear()+" "+("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)+":"+("0"+e.getSeconds()).slice(-2);document.getElementById("timestamp").value=t}setInterval(updateTimestamp,1e3),document.getElementById("enquiryForm").addEventListener("submit",function(e){e.preventDefault(),updateTimestamp()});function generateUniqueId(){const e=new Date,t=e.toLocaleDateString("en-IN",{day:"2-digit",month:"2-digit",year:"2-digit"}).replace(/\//g,""),n=("0"+e.getHours()).slice(-2)+("0"+e.getMinutes()).slice(-2)+("0"+e.getSeconds()).slice(-2);document.getElementById("enquiryId").value="EQ"+t+"-"+n}generateUniqueId();

// Fetch Option For Enquiry Model
async function fetchModelOptions(){const url='https://docs.google.com/spreadsheets/d/e/2PACX-1vSS58IoBCM_4m7DohiC2UGYpPKjP1_YTpp0mIRWYfLQnZ-dWEvk-SfwMKABxElSbOUn3oq_3FYeuVBP/pub?gid=1246389069&single=true&output=csv';try{const response=await fetch(url);const data=await response.text();const rows=data.split('\n');const options=[];for(let i=1;i<rows.length;i++){const cells=rows[i].split(',');if(cells[1]&&cells[1].trim()!==''){options.push(cells[1].trim());}}const select=document.getElementById('modelName');options.forEach(option=>{const optionElement=document.createElement('option');optionElement.value=option;optionElement.textContent=option;select.appendChild(optionElement);});}catch(error){console.error('Error fetching options:',error);}}fetchModelOptions();
