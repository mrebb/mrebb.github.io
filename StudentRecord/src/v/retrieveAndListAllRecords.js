/**
 Retrieve all the student records
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
      row.insertCell(-1).textContent = Record.instances[key].studentName;      
      row.insertCell(-1).textContent = Record.instances[key].grade;  
      row.insertCell(-1).textContent = Record.instances[key].age;
      row.insertCell(-1).textContent = Record.instances[key].time;
    }
  }
};