var AppsScriptLink = "AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A";

window.addEventListener("load", getDataAPI, true);

const desc = document.getElementById("desc")
var gData;
var no;
var url = "https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec"
  function getDataAPI() {  
    $('#d_table').html() 
    const url1 = url+'?page=getData'   
   
    fetch(url1)
    .then(response =>{      
      return response.json()        
    })
    .then(data => {
      gData = data.data
      getElm(gData)
      console.log(data.data);
      
    })
    .catch(error => {
      console.error("Error in fetch:", error.message);
      
    });
  }


function getElm()
{

desc.innerText ="Bonjour"
console.log(desc);
if(gData && gData !== undefined && gData.length != 0)
    {

        gData.forEach(r =>{
            desc.innerText = `${r['Client']}`
        })
    }

}


