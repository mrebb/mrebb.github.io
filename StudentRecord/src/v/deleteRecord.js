/***********************************************
***  Methods for the use case "delete student record"  ***
************************************************/
pl.v.deleteRecord = {
  setupUserInterface: function () {
    var deleteButton = document.forms['Record'].commit;
    var selectEl = document.forms['Record'].selectRecord;
    var key="", keys=[], record=null, optionEl=null, i=0;
    // load all student record objects
    Record.retrieveAll();
    keys = Object.keys( Record.instances);
    // populate the selection list with student records
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      record = Record.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = record.studentName;
      optionEl.value = record.studentName;
      selectEl.add( optionEl, null);
    }
    // Set an event handler for the submit/delete button
    deleteButton.addEventListener("click",
        pl.v.deleteRecord.handleDeleteButtonClickEvent);
    // Set a handler for the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Record.saveAll);
  },
  // Event handler for deleting a student record
  handleDeleteButtonClickEvent: function () {
    var selectEl = document.forms['Record'].selectRecord;
    var studentName = selectEl.value;
    if (studentName) {
      Record.destroy( studentName);
      // remove deleted student record from select options
      selectEl.remove( selectEl.selectedIndex);
    }
  }
};