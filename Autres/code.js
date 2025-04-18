


let MySheets  = SpreadsheetApp.getActiveSpreadsheet();  //01
let InvSheet  = MySheets.getSheetByName("Inv");                   
let ItemSheet = MySheets.getSheetByName("Item");

function doPost(e)          //02 
{
  let Inv = e.parameters; 
  let Qtys = Inv.qty;     
  let IsNew = Inv.IsNew;

  if (IsNew == 'Y') {
    InvSheet.appendRow([Inv.inv_no[0], Inv.inv_dt[0], Inv.cust_nm[0], Inv.addr[0], Inv.city[0]]);    //06

    let i = 0;
    Qtys.forEach(function (value, index)                       //07
    {
      if (i > 0) {
        InvSheet.appendRow(["", "", "", "", "", Inv.item_nm[index], value, Inv.rate[index], Inv.amt[index]]);  //08
      }
      i++;


    });
  }
  else {

    InvSheet.getRange(Inv.StartRow, 1, 1, 5).setValues([[Inv.inv_no[0], Inv.inv_dt[0], Inv.cust_nm[0], Inv.addr[0], Inv.city[0]]]);

    let NextRow = Inv.StartRow;
    let DeleteRow = +Inv.StartRow + 1;
    InvSheet.deleteRows(DeleteRow, Inv.RowCount);

    let i = 0;
    Qtys.forEach(function (value, index)                       //07
    {
      if (i > 0) {
        NextRow++;
        InvSheet.insertRows(NextRow, 1);
        InvSheet.getRange(NextRow, 1, 1, 9).setValues([["", "", "", "", "", Inv.item_nm[index], value, Inv.rate[index], Inv.amt[index]]]);

      }
      i++;
    });
  }
  return ContentService.createTextOutput("Data Submitted"); //09
}

function doGet(e) {  //03

  let page = e.parameter.page;

  if (page == null || page == undefined) {
    page = "index";
    return HtmlService.createTemplateFromFile(page).evaluate();
  }
  else if (page == 'dropdown') {
    let table = ItemSheet.getRange("A:A").getValues().filter(r => r.every(Boolean));
    let str = JSON.stringify(table);
    return ContentService.createTextOutput(str);
  }
  else if (page == 'max') {
    let table = InvSheet.getRange("A:A").getValues().filter(Number);
    let myMax = Math.max(...table) + 1;
    return ContentService.createTextOutput(myMax);
  }
  else if (page == 'search') {
    let no = e.parameter.no;
    let ReturnData = InvSheet.getRange("A:A").createTextFinder(no).matchEntireCell(true).findAll();

    let StartRow = 0;
    let EndRow = 0;

    ReturnData.forEach(function (range) {
      StartRow = range.getRow();
    });

    if (StartRow > 0) {

      for (var i = StartRow + 1; i <= StartRow + 10; i = i + 1) {

        let val = InvSheet.getRange(i, 6).getValue();

        if (val == "") {
          EndRow = i - 1;
          break;
        }

      }

      let table = InvSheet.getRange("A" + StartRow + ":I" + EndRow).getValues();

      //let str = JSON.stringify(table);
      let cnt = EndRow - StartRow;
      let str = JSON.stringify({ record: table, SR: StartRow, CNT: cnt });

      return ContentService.createTextOutput(str);
    }
    else {
      let str = JSON.stringify("NOT FOUND");
      return ContentService.createTextOutput(str);
    }
  }

  else if (page == 'all') {
       let table = InvSheet.getRange("A:E").getValues().filter(r=>r.every(Boolean));
       let str = JSON.stringify(table);
       return ContentService.createTextOutput(str); 
  }

}
