var AppsScriptLink = "AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A";
window.addEventListener("load", init, true);
var no;
var dialog;
var buttons;
var dateconvert;
var Data;
var table;
let tab = '';
var url = "https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec"
const url1 = url + '?page=getData'
/////////////////////
function GetPrint() {
  /*For Print*/
  window.print();
}

function BtnAdd() {
  /*Add Button*/
  var v = $("#TRow").clone().appendTo("#TBody");
  $(v).find("input").val('');
  $(v).removeClass("d-none");
  $(v).find("th").first().html($('tr').length - 3);
}



function BtnDel(v) {
  /*Delete Button*/
  $(v).parent().parent().remove();
  GetTotal();
  ReGenSrNo();
}

function ReGenSrNo() {
  $("#TBody").find("tr").each(
    function (index) {
      $(this).find("th").first().html(index);
    }
  );
}

function Calc(v) {
  /*Detail Calculation Each Row*/
  var index = $(v).parent().parent().index();

  var qty = document.getElementsByName("qty")[index].value;
  var rate = document.getElementsByName("rate")[index].value;

  var amt = qty * rate;
  document.getElementsByName("amt")[index].value = amt;

  GetTotal();
}

function GetTotal() {
  /*Footer Calculation*/

  var sum = 0;
  var amts = document.getElementsByName("amt");

  for (let index = 0; index < amts.length; index++) {
    var amt = amts[index].value;
    sum = +(sum) + +(amt);
  }

  document.getElementById("FTotal").value = sum;

  var gst = document.getElementById("FGST").value;
  var net = +(sum) + +(gst);
  document.getElementById("FNet").value = net;


}


///////////////////////////
function init() {
  getDataTab();
  FormValidation();
  SetCurrentDate();
  BtnAdd();
  DataList();
  List();
  MaxInv();

};
///////////
function DataList() {
  $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=dropdown",
    function (data) {
      var Options = "";
      $.each(data, function (key, value) {
        Options = Options + '<option>' + value + '</option>';
      });
      $("#mylist").append(Options);
      
    });
}

function List()
{
  //[["Computer"],["Laptop "],["Mousse"],["Keyboard"],["Printer"],["Speaker"],["LED"],["Cabinet"],["Scanner"],["Pen Drive"]]
  $.getJSON("https://script.google.com/macros/s/AKfycbzHcwoR0XvZvEEnsHvusBOOVQYVhUcGcGRwJ32u7u47opwK0aVjDy7sw9LSiNvZ89a-GQ/exec?ID=11YUvXtxYdZ2BblnB79DM5jQvnLFuddtCt-IlmWwaHrI&SH=database&FN=readSheet", function(data){
      var datag ="";
      $.each(data, function(key, value) 
    {
      datag = datag + value;
      console.log(datag)
    })

    }
  )
}

function MaxInv() {
  $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=max",
    function (data) {

      $("input[name='inv_no']").val(data);

    });
}


function SetCurrentDate() {
  const date = new Date();
  console.log(date);

  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();

  if (d < 10) d = '0' + d;
  if (m < 10) m = '0' + m;

  let CurrDate = y + '-' + m + '-' + d;

  $('input[name="inv_dt"]').val(CurrDate);

}


function FormValidation() {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
          Raff()
        }, false)
      })
  })()
}


///////////
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
        <td><input type="hidden"  id="idM${number}" value="${r['id']}"> ${r['Date']}</td>
        <td>${r['Client']}</td>
        <td>${r['Telephone']}</td>
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
            { "data": 'Telephone' },
            { "data": 'Ville' },
            { "data": 'id' },
            { "data": 'id' },

          ],
          // '<input type="text" placeholder="Search ' + title + '" />',

          // dom: '<lf<t>ip>',
          // dom: '<"top"i>rt<"bottom"flp><"clear">',
        // dom: '<Bf><"clear">lirtp',
        // filter: false,
        autowidth: true,
        destroy: true,
        responsive: true,
        select: true,
        stateSave: true,
        ordering: true,
        paging: true,
        lengthMenu: true,
        pageLength: true,
        language:
        {
          processing: "Traitement en cours...",
          search: "",
          pageLengt: "Afficher _MENU_ &eacute;l&eacute;ments",
          lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
          info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
          infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
          infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
          infoPostFix: "",
          loadingRecords: "Chargement en cours...",
          zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
          emptyTable: "Aucune donnée disponible dans le tableau",
          paginate:
          {
            first: "Premier",
            previous: '<i class="fa-solid fa-circle-chevron-left"></i>',
            next: '<i class="fa-solid fa-circle-chevron-right"></i>',
            last: 'Dernier',
          },
          aria:
          {
            sortAscending: ": activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
          },
          
        },


        //  pagingType: 'full',
        //

        //
        order: [[0, 'desc']],
        pageLength: 10,
        lengthMenu:
          [
            [10, 25, 50, 100, -1],           
            ['10', '25', '50', '100', 'All']
          ],
        columnDefs:
          [
            {
              targets: [1, 2],
              className: 'all',
            },
            {
              targets: [0],
              visible: true, //hide kolom pertama/0
              searchable: true,
            },
            {
              targets: [0],
              className: 'dt-body-center',
              "render": function (data, type, row, meta) {
                if (type === 'display') {
                  data = data.replace("00:00:00", "")

                }
                //'<div type="button" class="ico" onclick="foundId('+ data +')" no='+row[4]+'>' + '<i class="fa fa-duotone fa-pen-to-square modif"></i>' + '</div>'

                return data;
              }
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
              targets: [5],
              orderable: false,
              className: 'dt-body-center',
              "render": function (data, type, row, meta) {
                if (type === 'display') {
                  data = '<div type="button" class="ico" onclick="foundId(' + data + ')" no=' + row[4] + '>' + '<i class="fa fa-duotone fa-pen-to-square modif"></i>' + '</div>'

                }
                //'<div type="button" class="ico" onclick="foundId('+ data +')" no='+row[4]+'>' + '<i class="fa fa-duotone fa-pen-to-square modif"></i>' + '</div>'

                return data;
              }
            },

            {
              targets: [6],
              orderable: false,
              className: 'dt-body-center',
              "render": function (data, type, row, meta) {
                if (type === 'display') {
                  data = '<div type="button" class="ico" onclick="foundId(' + data + ')" no=' + row[5] + '>' + '<i class="fa fa-sharp fa-solid fa-trash"></i>' + '</div>';

                }
                return data;
              }
            },

          ],
         
        layout: {

        //   topEnd: {
        //     search: {
        //         text: '_MENU_'
        //     }
        // },
        //   topStart: 'pageLength',
        //   // topStart: null,
         
          topStart: {
            buttons: [
              {
                extend: 'pdf',
                text: 'PDF',
                className: 'pdf',
                init: function (api, node, config) {
                  $(node).hide();
                }
              },
              {
                extend: 'excel',
                text: 'EXCEL',
                className: 'excel',
                init: function (api, node, config) {
                  $(node).hide();
                }
              },
              {
                extend: 'csv',
                text: 'CSV',
                className: 'csv',
                init: function (api, node, config) {
                  $(node).hide();
                }
              },

              {
                extend: 'copy',
                text: 'COPIER',
                className: 'copie',
                init: function (api, node, config) {
                  $(node).hide();
                }
              },
              {
                extend: 'colvis',
                text: 'MASQUER',
                className: 'mask',
                init: function (api, node, config) {
                  $(node).hide();
                }
              },
              {
                extend: 'print',
                text: 'IMPRIMER',
                className: 'print',
                init: function (api, node, config) {
                  $(node).hide();
                }
              },
              {
                extend: 'pageLength',
                text: '10',
                className: 'pagelen',
                init: function (api, node, config) {
                  $(node).hide();
                }
              },
                          
            ]
          }
        },

      })
    //              
    $('#btnPdf').on('click', function () {
      table.button('.pdf').trigger();
    });

    $('#btnExcelt').on('click', function () {
      table.button('.excel').trigger();
    });

    $('#btnCsv').on('click', function () {
      table.button('.csv').trigger();
    });

    $('#btnCopie').on('click', function () {
      table.button('.copie').trigger();
    });

    $('#btnMasque').on('click', function () {
      table.button('.mask').trigger();
    });

    $('#btnPrint').on('click', function () {
      table.button('.print').trigger();
    });
    //
    //assign a new searchbox for out table
    $('#searchBox').on('keyup', function()
    {
      table.search(this.value).draw();
    });
    //lengthMenu
    $('#btnPageL').on('click', function()
    {
      table.button('.pagelen').trigger();
    });

  }
  // document
  //   .querySelector('div.dtsp-verticalPanes')
  //   .appendChild(table.searchPanes.container().get(0));

  // 'Display <select>' +
  //           '<option value="10">10</option>' +
  //           '<option value="20">20</option>' +
  //           '<option value="30">30</option>' +
  //           '<option value="40">40</option>' +
  //           '<option value="50">50</option>' +
  //           '<option value="-1">All</option>' +
  //           '</select> records'

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
            $('#dialog-form').dialog('open');

          }
          else {
            if (i > 1) BtnAdd();


            document.getElementsByName("item_nm")[i].value = value[5];
            document.getElementsByName("qty")[i].value = value[6];
            document.getElementsByName("rate")[i].value = value[7];
            document.getElementsByName("amt")[i].value = value[8];
            Raff();

          }

          i = i + 1;
        });

        GetTotal();
        ReGenSrNo();

      }
    });
  $('#exampleModal').modal('hide');

}
$(function () {

  dialog = $("#dialog-form").dialog
    ({

      autoOpen: false,
      modal: true,
      Height: 400,

      show: {
        effect: "slide",
        duration: 700
      },
      hide: {
        effect: "clip",
        duration: 500
      },
      buttons:

      {
        // text: "Ok",

        Fermer: function () {
          dialog.dialog("close");
        },
      },

      close: function () {
        //  form[ 0 ].reset();
        // allFields.removeClass( "ui-state-error" );
      }

    });

  $("#btnNew").button().on("click", function () {
    dialog.dialog("open");
  });
});

//RETRIVE DATA FROM GOOGLE SHEET FOR KOTA DROPDOWN
function createGenderDropdown() 
{
	//SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
	google.script.run.withSuccessHandler(genderDropDown).getDropdownListKota("Genre!A1:A");
}

//POPULATE gender DROPDOWNS
function genderDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
	var list = document.getElementById('gender');
	for (var i = 0; i < values.length; i++) {
		var option = document.createElement("option");
		option.value = values[i];
		option.text = values[i];
		list.appendChild(option);
	}
}

 function Raff(){
  window.Location.html="";
 }