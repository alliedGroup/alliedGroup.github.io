// Tech Support ID
function updateTimestamp(){const e=new Date,t=("0"+e.getDate()).slice(-2)+"/"+("0"+(e.getMonth()+1)).slice(-2)+"/"+e.getFullYear()+" "+("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)+":"+("0"+e.getSeconds()).slice(-2);document.getElementById("timestamp").value=t}setInterval(updateTimestamp,1e3),document.getElementById("techSupport").addEventListener("submit",function(e){e.preventDefault(),updateTimestamp()});function generateUniqueId(){const e=new Date,t=e.toLocaleDateString("en-IN",{day:"2-digit",month:"2-digit",year:"2-digit"}).replace(/\//g,""),n=("0"+e.getHours()).slice(-2)+("0"+e.getMinutes()).slice(-2)+("0"+e.getSeconds()).slice(-2);document.getElementById("techSupportId").value="TH"+t+"-"+n}generateUniqueId();


