//
window.addEventListener("load", getDataAPI, true);
var gData;
var url = "https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec?page=getData"
//https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec
function getDataAPI() {
    $('#d_table').html('<div class="col">Please Wait.....</div>')


    fetch(url)
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
            <th scope='col' class="dt-center">Date</th> 
            {/* <th scope='col' class="dt-center">Client</th> 
            <th scope='col' class="dt-center">Téléphone</th>           
            <th scope='col' class="dt-center"></th> 
            <th scope='col' class="dt-center"></th> 
                                
          </tr>
        </thead>        
        `
        //Facture  N°	Date Facture	Client	Telephone	Ville	Désignation	Quantité	Prix unitaire	Montant
        gData.forEach(r => {
            table_result += `<tr id="ROWNUMBER:${row_number}">                     
            <td><input type="hidden" id="idM${row_number}" value="${r['Facture_N°']}">${r['Date'].replace("00:00:00", "")}</td>   
            <td>${r['Client']}</td>  
            <td>${r['Telephone']}</td> 
            <td><i class='fa fa-duotone fa-pen-to-square modif' data-bs-toggle='modal' data-bs-target='#myModal' onclick='editData(this);'></td>
            <td><i class='fa fa-sharp fa-solid fa-trash sup' onclick='deleteData(this);'></td>
                              
           </tr>`

            row_number++
        })
        table_result += "</table>"

        $('#d_table').html(table_result)

        $('#mainTable').DataTable({

            destroy: true,
            responsive: true,
            select: true,
            stateSave: true,
            ordering: true,
            order: [[0, 'desc']],
            pageLength: 10,
            lengthMenu: [
                [10, 25, 50, 100, -1],
                ['10', '25', '50', '100', 'All']
            ],
            columnDefs:
                [{
                    targets: [1, 8, 9],
                    className: 'all',
                },
                {
                    targets: [0],
                    visible: false, //hide kolom pertama/0
                    searchable: true,
                },
                {
                    targets: [3],
                    className: 'dt-body-center',
                    "render": function (data, type, row, meta) {
                        if (type === 'display' && data.length > 5) {
                            data = '<a href="https://wa.me/62' + data + '?text=' + row[3] + '" target="_blank">' + '<i class="fa-brands fa-whatsapp" style="font-size:20px;color:green"></i>' + '</a>';
                        }
                        return data;
                    }
                },
                ]

        });


    } else {
        // alert('data not found!')

    }
}


