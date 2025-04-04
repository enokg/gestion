var AppsScriptLink = "AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A";
window.addEventListener("load", init, true);
function GetPrint() {
  /*For Print*/
  window.print();
}

function BtnAdd() {
  /*Add Button*/
  var v = $("#TRow").clone().appendTo("#TBody");
  $(v).find("input").val('');
  $(v).removeClass("d-none");
  $(v).find("th").first().html($('tr').length - 2);
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
  var net = +(sum) - +(gst);
  document.getElementById("FNet").value = net;


}

function init () {
  FormValidation();
  SetCurrentDate();
  BtnAdd();
  FillDataList();
  MaxInv();
  
};


function FillDataList() {
  $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=dropdown",

    function (data) {

      var Options = "";

      $.each(data, function (key, value) {
        Options = Options + '<option>' + value + '</option>';
      });

      $("#mylist").append(Options);

    });
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
        }, false)
      })
  })()
}

function Search(pNo = "") {
  var no = $('#inv_no').val();

  if (pNo != "") no = pNo;

  $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=search&no=" + no,
    function (data) {


      //alert(data);
      // console.log(data);
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

function ShowAllData() {
  $(document).ready(function () {

    $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=all",
      function (data) {

        var Table = "", Rows = "", Columns = "";

        $.each(data, function (key, value) {
          var InvNo = "";
          Columns = "";
          i = 0;
          $.each(value, function (key1, value1) {
            i++;
            if (i == 2) {
              value1 = "" + value1;
              value1 = value1.substring(0, 10);
            }
            Columns = Columns + '<td>' + value1 + '</td>';
            if (InvNo == "") InvNo = value1;


          });
          Rows = Rows + '<tr onclick="Search(' + InvNo + ')">' + Columns + '</tr>';
        });

        $("#MyTBody").html(Rows);
        $('#exampleModal').modal('show');
      });
  });

}

function LoadAllData() {
  var result;
  $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=all",
    function (data) {
      // var result = "";
      $.each(data, function (key, value) {
        // result = result + '<span>' + value + '<span>
        result = result + value;
      })
      
      console.log(result);

      if (result && result !== undefined && result.length != 0) {

        let taille;
        taille = result.length;
        console.log(taille);
            
      }
    
    });
}



function Read() {
  fetch("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=all", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: 'value'
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

}

//console.log(gData)