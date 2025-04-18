var AppsScriptLink = "AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A";
window.addEventListener("load", getDataTab, true);
var no;
var Data;
var table;
let tab = '';
var url = "https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec"

const url1 = url + '?page=getData'

function getDataTab() {
  fetch(url1)
    .then(response => {
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
function getElmts() {
  if (Data && Data !== undefined && Data.length != 0) {
    let number = 0

    Data.forEach(r => {
      tab += `<tr id="ROWNUMBER:${number}">
        <td><input type="hidden"  id="idM${number}" value="${r['id']}">${r['Date'].replace("00:00:00", "")}</td>
        <td>${r['Client']}</td>
        <td>${r['Telephone']}</td>
        <td>${r['Ville']}</td>
                          
        </tr>`
      number++
    })

    document.getElementById('tbody').innerHTML = tab;


   table = $('#example').DataTable(
      {

        "data": Data,
        "columns":
          [
            { "data": 'Date' },
            { "data": 'Client' },
            { "data": 'Telephone' },
            { "data": 'Ville' },
            { "data": 'id' },
            { "data": 'id' },

          ],

        language: {
          emptyTable: "Aucune élément trouvé",
          info: "Afficher _PAGE_ sur _PAGES_",
          infoEmpty: "Aucune donnée disponible",
          loadingRecords: "Chargement...",
          processing: "En cours...",
          search: "Rechercher",
          zeroRecords: "L'élément recherché n'existe pas",
          decimal: ',',
          thousands: '.',
          lengthMenu: "Afficher _MENU_ entrées",
          infoFiltered: "(filtré sur _MAX_ entrées au total)",
          //url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/de-DE.json',
          //paginate_previous
          paginate:
          {
            first: "Premier",
            last: "Dernier",
            next: "Suivant",
            previous: "Précédent",
          }
        },
        layout:
        {
          topStart: 'buttons'
        },
        buttons: true,
        destroy: true,
        responsive: true,
        select: true,
        stateSave: true,
        ordering: true,
        paging: true,
        autoWidth: true,
        order: [[0, 'desc']],
        pageLength: 10,
        lengthMenu:
          [
            [10, 25, 50, 100, -1],
            ['10', '25', '50', '100', 'All']
          ],
        columnDefs:
          [{
            targets: [1, 2],
            className: 'all',
          },
          {
            targets: [0],
            visible: true, //hide kolom pertama/0
            searchable: true,
          },

          {
            targets: [2],
            className: 'dt-body-center centrer',
            "render": function (data, type, row, meta) {
              if (type === 'display') {
                data = '<a href="https://wa.me/62' + data + '?text=' + row[2] + '" target="_blank">' + '<i class="fa-brands fa-whatsapp" style="font-size:20px;color:green"></i>' + '</a>';
              }
              return data;
            }
          },

          //<i class='fa fa-sharp fa-solid fa-trash sup' onclick='deleteData(this);'>

          {
            targets: [4],
            className: 'dt-body-center',
            "render": function (data, type, row, meta) {
              if (type === 'display') {
                data = '<a href="../bootrsap.html" type="button" class="ico" onclick="foundId(' + data + ')" no=' + row[4] + '>' + '<i class="fa fa-duotone fa-pen-to-square modif"></i>' + '</a>';

              }
              //'<div type="button" class="ico" onclick="foundId('+ data +')" no='+row[4]+'>' + '<i class="fa fa-duotone fa-pen-to-square modif"></i>' + '</div>'

              return data;
            }
          },

          {
            targets: [5],
            className: 'dt-body-center',
            "render": function (data, type, row, meta) {
              if (type === 'display') {
                data = '<div type="button" class="ico" onclick="foundId(' + data + ')" no=' + row[5] + '>' + '<i class="fa fa-sharp fa-solid fa-trash"></i>' + '</div>';

              }

              return data;
            }
          },
          ],
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        buttons:
          [
            'colvis',
            'excelHtml5',
            'pdfHtml5',
            'print'
          ],
        buttons:
          [
            {
              extend: 'excel',
              class: 'buttons-excel',
              init: function (api, node, config) {
                $(node).hide();
              }
            },

            {
              extend: 'print',
              class: 'buttons-print',
              init: function (api, node, config) {
                $(node).hide();
              }
            },


          ],

        initComplete: function (settings, json) {
          $(".dt-buttons .btn-group").append(
            '<a id="cv" class="btn btn-primary" href="#">CARD VIEW</a>'
          );
          $("#cv").on("click", function () {
            if ($("#example").hasClass("card")) {
              $(".colHeader").remove();
            } else {
              var labels = [];
              $("#example thead th").each(function () {
                labels.push($(this).text());
              });
              $("#example tbody tr").each(function () {
                $(this)
                  .find("td")
                  .each(function (column) {
                    $("<span class='colHeader'>" + labels[column] + ":</span>").prependTo(
                      $(this)
                    );
                  });
              });
            }
            $("#example").toggleClass("card");
           });       

        },

      });

 //
 $('#btnExcel').on('click', function()
 {
   table.button('.buttons-excel').trigger();
});

$('#btnPrint').on('click', function(){
   table.button('.buttons-print').trigger();
});
//

  }
}

///
function foundId(id) {
  no = id;
  var mgs = "le numéro est : "
  var mge = "Pas de numéro"
  if (no !== "" && no !== undefined) {

    Search(no)

    $('#spinnerModal').modal('show');
    console.log(mgs + no)

  } else {
    console.log(mge)
  }


}
function Search(No) {
  //https://script.google.com/a/~/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec?page=search&no=11
  // if (pNo != "") no = pNo;
  $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=search&no=" + No,
    function (data) {
      //alert(data);
      console.log(data);
      if (data == "NOT FOUND") {
        alert('Invoice No. Not Found...');

      }
      else {
        //var record = data;
        var record = data.record;

        var StartRow = data.SR;
        var RowCount = data.CNT;

        $('#IsNew').val('N');
        $('#StartRow').val(StartRow);
        $('#RowCount').val(RowCount);

        var i = 0;
        $.each(record, function (key, value) {

          if (i == 0) {
            var dt = value[1].substring(0, 10);
            document.getElementsByName("inv_no")[0].value = value[0];
            document.getElementsByName("inv_dt")[0].value = dt;
            document.getElementsByName("cust_nm")[0].value = value[2];
            document.getElementsByName("addr")[0].value = value[3];
            document.getElementsByName("city")[0].value = value[4];

            $('#spinnerModal').modal('hide');
            // $('#exampleModal').modal('show');

          }
          else {
            if (i > 1) BtnAdd();


            document.getElementsByName("item_nm")[i].value = value[5];
            document.getElementsByName("qty")[i].value = value[6];
            document.getElementsByName("rate")[i].value = value[7];
            document.getElementsByName("amt")[i].value = value[8];

          }

          i = i + 1;
        });

        GetTotal();
        ReGenSrNo();

      }
    });
  $('#exampleModal').modal('hide');

}