function pushToHub() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName("tonysbar"); // Matches your tab name
  const targetSheet = ss.getSheetByName("Ads"); // The main hub
  
  // 1. Get all data from TonysBar
  const sourceData = sourceSheet.getDataRange().getValues();
  const rowsToPush = [];

  // 2. Loop through rows (skip the header row 1)
  for (let i = 1; i < sourceData.length; i++) {
    const title = sourceData[i][0];
    const price = sourceData[i][1];
    const desc = sourceData[i][2];
    const category = sourceData[i][3];
    const status = sourceData[i][8]; // Column I

    // Only push if the status is set to "Active"
    if (status === "Active") {
      rowsToPush.push(["Tony's Bar", title, price, desc, category]);
    }
  }

  // 3. Clear old Tony's Bar rows from Ads tab so we don't have duplicates
  const targetData = targetSheet.getDataRange().getValues();
  for (let j = targetData.length - 1; j >= 1; j--) {
    if (targetData[j][0] === "Tony's Bar") {
      targetSheet.deleteRow(j + 1);
    }
  }

  // 4. Add the new items
  if (rowsToPush.length > 0) {
    targetSheet.getRange(targetSheet.getLastRow() + 1, 1, rowsToPush.length, 5).setValues(rowsToPush);
    SpreadsheetApp.getUi().alert('Success! ' + rowsToPush.length + ' items pushed to Hub.');
  } else {
    SpreadsheetApp.getUi().alert('Check Column I: No items are marked as "Active".');
  }
}
