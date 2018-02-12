/***********************************************
***  Methods for the use case updateStudentRecord  ******
************************************************/
pl.v.updateRecord = {
  setupUserInterface: function () {
    var formEl = document.forms['Record'],
        saveButton = formEl.commit,
        selectRecordEl = formEl.selectRecord;
    var key="", keys=[], record=null, optionEl=null, i=0;
    // load all student record objects
    Record.retrieveAll();
    // populate the selection list with student records
    keys = Object.keys( Record.instances);
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      record = Record.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = record.studentName;
      optionEl.value = record.studentName;
      selectRecordEl.add( optionEl, null);
    }
    // when a Record is selected, fill the form with its data
    selectRecordEl.addEventListener("change", 
	    pl.v.updateRecord.handleRecordSelectionEvent);
    // set an event handler for the submit/save button
    saveButton.addEventListener("click",
        pl.v.updateRecord.handleSaveButtonClickEvent);
    // handle the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Record.saveAll);
  },
  handleRecordSelectionEvent: function () {
    var formEl = document.forms['Record'];
    var selectRecordEl = formEl.selectRecord,
        record=null, key = selectRecordEl.value;
    if (key) {
      record = Record.instances[key];
      formEl.studentName.value = record.studentName;
      formEl.grade.value = record.grade;
      formEl.age.value = record.age;
    } else {
      formEl.reset();
    }
  },
  // save data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Record'],
        selectRecordEl = formEl.selectRecord;
    var slots = { studentName: formEl.studentName.value, 
          grade: formEl.grade.value, 
          age: formEl.age.value
        };
    Record.update( slots);
    // update the selection list option
    selectRecordEl.options[selectRecordEl.selectedIndex].text = slots.studentName;
    formEl.reset();
  }
};