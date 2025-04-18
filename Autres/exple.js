
var gData;
var url = "https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=all"

function getDataAPI() 
{
    $('#d_table').html('<div class="col">Please Wait.....</div>')
    const url1 = url + '?action=getData'

    fetch(url1)
        .then(response => {
            return response.json()
        })
        .then(data => {
            gData = data.data
            showSendPatientTable(gData)
            console.log(data.data);
            console.log(gData);
        })
        .catch(error => {
            console.error("Error in fetch:", error.message);

        });
}


function showSendPatientTable() {
    if (gData && gData !== undefined && gData.length != 0) {

        let row_number = 0
        let table_result = `<h5>Edit Table</h5><table class="table table-responsive table-bordered" id="mainTable" style="text-align:center;">
        <thead>
          <tr>
            <th scope='col' class="dt-center">Name</th> 
            <th scope='col' class="dt-center">Amount</th>                             
            <th scope='col' class="dt-center">Category</th>           
            <th scope='col' class="dt-center">Action</th> 
                                
          </tr>
        </thead>        
        `
        gData.forEach(r => {
            table_result += `<tr id="ROWNUMBER:${row_number}">                     
            <td><input type="hidden" id="idM${row_number}" value="${r['id']}">${r['name']}</td>   
            <td>${r['amount']}</td>  
            <td>${r['category']}</td>    
            <td>
              <p style="color:blue;" type="button" onclick="editData(${row_number})"><i class="fa-solid fa-pen-to-square"></i></p>
              <p style="color:red;" type="button" onclick="delData(${row_number})"><i class="fa-solid fa-trash-can"></i></p>
            </td>  
                              
           </tr>`

            row_number++
        })
        table_result += "</table>"
        $('#d_table').html(table_result)


        $('#mainTable').DataTable({

            lengthMenu: [[20, 50, 100], [20, 50, 100]],
            order: [[0, 'asc']],

        });


    } else {
        alert('data not found!')

    }
}