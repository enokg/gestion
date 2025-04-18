window.addEventListener("load", init, true);
//https://script.google.com/macros/s/AKfycbysu7f5CP4xtqVEypJa_tkOKnTFD7lBpIq-Soy10CZvEKftmxZE2JjxtRD9iAjVX-zlfg/exec
var gData;
let tab = '';
var url = 'https://script.google.com/a/~/macros/s/AKfycbysu7f5CP4xtqVEypJa_tkOKnTFD7lBpIq-Soy10CZvEKftmxZE2JjxtRD9iAjVX-zlfg/exec'
const url1 = url+'?action=getData'; 
///////////////////////////
function init() {
    getDataTab();
    SetCurrentDate();
    
  };
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
          <td><input type="hidden" id="idM${number}" value="${r['id']}">${r['produit']}</td>   
            <td>${r['superficie']}</td>  
            <td>${r['nature']}</td> 
            <td>${r['pu']}</td>   
            <td>${r['pt']}</td>   
            <td>${r['site']}</td>   
            <td>${r['section']}</td>   
            <td>${r['lot']}</td>   
            <td>${r['plle']}</td>   
            <td>${r['statut']}</td>   
            <td>${r['niveau']}</td>   
            <td>${r['date']}</td> 
          </tr>`
        number++
      })
  
      document.getElementById('tbody').innerHTML = tab;
      table = $('#example').DataTable(
        {
  
          "data": Data,
          "columns":
            [
              { "data": 'produit' },
              { "data": 'superficie' },
              { "data": 'nature' },
              { "data": 'pu' },
              { "data": 'pt' },
              { "data": 'site' },
              { "data": 'section' },
              { "data": 'lot' },
              { "data": 'plle' },
              { "data": 'statut' },
              { "data": 'niveau' },
              { "data": 'date' },
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
  
  
              //<i class='fa fa-sharp fa-solid fa-trash sup' onclick='deleteData(this);'>
  
              {
                targets: [12],
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
                targets: [13],
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
  
  }
  
  $(function () 
  {

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

//  

function SetCurrentDate() {
    const date = new Date();
    console.log(date);
  
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
  
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
  
    let CurrDate = y + '-' + m + '-' + d;
  
    $('input[name="date"]').val(CurrDate);
  
  } 

 
  function SetCurrentId() {
    const date = new Date();
    console.log(date);
    let IdDate = date.getTime().toString();
  
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
  
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
  
    let CurrDate = y + '-' + m + '-' + d;
  //1744909549506
    $("input[name='id']").val(IdDate);
  
  } 
// 
function addRecord(){
  SetCurrentId();
    document.getElementById("btn1").disabled = true
    const id = $('#id').val()
    const produit = $('#produit').val()
    const superficie = $('#superficie').val()
    const nature = $('#nature').val()
    const pu = $('#prixUnit').val()
    const pt = $('#prixT').val()
    const site = $('#site').val()
    const section = $('#section').val()
    const lot = $('#lot').val()
    const plle = $('#plle').val()
    const statut = $('#statut').val()
    const niveau = $('#niveau').val()
    const date = $('#date').val()
    const image = $('#image1').val()

  const obj =
  {
    id: id,
    produit: produit,
    superficie: superficie,
    nature: nature,
    pu: pu,
    pt: pt,
    site: site,
    section: section,
    lot: lot,
    plle: plle,
    statut: statut,
    niveau: niveau,
    date: date,
    image: image
  }
    const obj_json = JSON.stringify(obj)
    let formData = new FormData();
      formData.append('action', 'addData');
      formData.append('data',obj_json);        
      fetch(url, 
     {
        method: 'POST',
        body: formData,
        mode:'no-cors'
      })
      .then(response => {        
        return response.json()})
      .then(data => {
        console.log(data)        
        if(data.status == "success"){          
          // document.getElementById("name").value = "";
          // document.getElementById("amount").value = "";
          // document.getElementById("category").value = "";
          // document.getElementById("btn1").disabled = false
          getDataAPI()
        }
             
      })
      .catch(error => {
        console.error(error);
        document.getElementById("btn1").disabled = false
      });
    
  }
  document.getElementById('btn1').addEventListener("click",e=>{
    addRecord()
  })
