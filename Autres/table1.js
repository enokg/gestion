window.addEventListener("load", getDataAll, true);

function reinitialise(){
    getAllData()
}

var gData;
var url = "https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec?page=getData"
//https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec
function getDataAll() 
{  
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


function getAllData() {
	//$('#spinnerModal').modal('show');
	//document.getElementById('dataTable').innerHTML = "";
	//google.script.run.withSuccessHandler(createTable).getAllData();
    //google.script.run.withSuccessHandler.getAllData();
    console.log(gData)

}


function createTable(dataArray) {
	//$('#spinnerModal').modal('hide');
	if (dataArray) 
  {
		var result = "<div>" +
			"<table class='w3-table-all' style='font-size:1em'>" +
			"<thead class='couleur' style='white-space: nowrap'>" + //style='white-space: nowrap'
			"<tr>" +
			//Change table headings to match witht he Google Sheet                            
			"<th scope='col'>ID</th>" +
			"<th scope='col'>Nom & Prénom (s)</th>" +
			"<th scope='col'>Adresse email</th>" +
			"<th scope='col'>Téléphone</th>" +
			"<th scope='col'>Genre</th>" +
			"<th scope='col'>Date de naissance</th>" +
			"<th scope='col'>Pays</th>" +
			"<th scope='col'>Dernière modification</th>" +
			"<th scope='col'></th>" +
			"<th scope='col'></th>" +
			"</tr>" +
			"</thead>";
      result +="<tbody class='corp'>"

          for (var i = 0; i < dataArray.length; i++) 
          {
            
          
            result += "<tr>";

            for (var j = 0; j < dataArray[i].length; j++) {
              result += "<td>" + dataArray[i][j] + "</td>";
            }
            result += "<td><i class='fa fa-duotone fa-pen-to-square modif' data-bs-toggle='modal' data-bs-target='#myModal' onclick='editData(this);'></td>";
            result += "<td><i class='fa fa-sharp fa-solid fa-trash sup' onclick='deleteData(this);'></td>";
            result += "</tr>";           
          }
        result +="</tbody>";
   
		result += "</table></div>";

		var div = document.getElementById('dataTable');
        
		div.innerHTML = result;
		$(document).ready(function() 
        {
			$('#dataTable').DataTable({
				destroy: true,
				responsive: true,
				select: true,
				stateSave: true,
				ordering:true,
				order: [[0, 'desc' ]],
				pageLength: 10,
				lengthMenu: 
				[
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
						"render": function(data, type, row, meta) {
							if (type === 'display' && data.length > 5) {
								data = '<a href="https://wa.me/62' + data + '?text=' + row[3] + '" target="_blank">' + '<i class="fa-brands fa-whatsapp" style="font-size:20px;color:green"></i>' + '</a>';
							}
							return data;
						}
					},
				]
			});
		});
	}
}


