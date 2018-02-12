/**
 * @fileOverview  Contains various view functions for the use case listRecords
 * @author Gerd Wagner
 */
 pl.v.retrieveAndListAllRecords = {
  setupUserInterface: function () {
    var tableBodyEl = document.querySelector("table#records>tbody");
    var keys=[], key="", row={}, i=0;
    // load all record objects
    Record.retrieveAll();
    keys = Object.keys( Record.instances);
    // for each record, create a table row with a cell for each attribute
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = Record.instances[key].isbn;      
      row.insertCell(-1).textContent = Record.instances[key].title;  
      row.insertCell(-1).textContent = Record.instances[key].year;
    }
  }
};