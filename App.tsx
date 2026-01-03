function pushToHub() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const currentSheet = ss.getActiveSheet();
  const sheetName = currentSheet.getName().toLowerCase();
  const targetSheet = ss.getSheetByName("Ads");
  
  // 1. Validation: Ensure the user is on a client tab
  if (sheetName !== "tonysbar" && sheetName !== "tireshop") {
    SpreadsheetApp.getUi().alert("Please run this from the Tony's Bar or Tire Shop tab.");
    return;
  }

  // 2. Identify the Client name for the Ads Hub
  const clientLabel = (sheetName === "tonysbar") ? "Tony's Bar" : "Tire Shop";

  // 3. Clear old entries for THIS client only from the Ads tab
  const targetData = targetSheet.getDataRange().getValues();
  for (let i = targetData.length - 1; i >= 1; i--) {
    if (targetData[i][0] === clientLabel) {
      targetSheet.deleteRow(i + 1);
    }
  }

  // 4. Get data from the current active sheet
  const sourceData = currentSheet.getDataRange().getValues();
  const rowsToPush = [];

  // Start at row 2 to skip headers
  for (let i = 1; i < sourceData.length; i++) {
    const title = sourceData[i][0];
    const price = sourceData[i][1];
    const desc = sourceData[i][2];
    const category = sourceData[i][3];
    const status = sourceData[i][8]; // Column I

    if (status === "Active") {
      rowsToPush.push([clientLabel, title, price, desc, category]);
    }
  }

  // 5. Append new active items to the Ads tab
  if (rowsToPush.length > 0) {
    targetSheet.getRange(targetSheet.getLastRow() + 1, 1, rowsToPush.length, 5).setValues(rowsToPush);
    SpreadsheetApp.getUi().alert('Successfully pushed ' + rowsToPush.length + ' items for ' + clientLabel);
  } else {
    SpreadsheetApp.getUi().alert('No "Active" items found on this sheet.');
  }
}
