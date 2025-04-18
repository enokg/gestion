var AppsScriptLink = "AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A";
window.addEventListener("load", getDataTab, true);

var Data;
let tab='';
var url = "https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec"

const url1 = url+'?page=getData'

function getDataTab() {
  fetch(url1)
    .then(response =>{      
      return response.json()        
    })
    .then(data => {
      Data = data.data
      getElmts(Data)
      console.log(data.data);
      
    })
    .catch(error => {
      console.error("Error in fetch:", error.message);
      
    });
}
function getElmts(){
  if(Data && Data !== undefined && Data.length != 0)
    {
      

      Data.forEach(r => {
        tab += `<tr>
        <td><input type="hidden" value="${r['id']}">${r['Date'].replace("00:00:00", "")}</td>
        <td>${r['Client']}</td>
        <td>${r['Telephone']}</td>
        <td>${r['Ville']}</td>
        </tr>`   
      })
    
      document.getElementById('tbody').innerHTML = tab;
      $('example').DataTable({
    
        "data": Data,
        "columns": [
          { "data": 'Date' },
          { "data": 'Client' },
          { "data": 'Telephone' },
          { "data": 'Ville' },
        ]
    
    
      })
      console.log(Data);
    


    }
}

