let Dte=document.getElementById("date");
const dt= new Date();
console.log("ak")

Dte.innerText=`${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;