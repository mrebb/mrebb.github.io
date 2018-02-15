/***********************************************
***  Methods for the use case createStudentRecord  ******
************************************************/
pl.v.createRecord = {
  setupUserInterface: function () {
    var saveButton = document.forms['Record'].commit;
    // load all Record objects
    Record.retrieveAll();
    // set an event handler for the submit/save button
    saveButton.addEventListener("click", 
        pl.v.createRecord.handleSaveButtonClickEvent);
    // set a handler for the event when the browser window/tab is closed
    window.addEventListener("beforeunload", Record.saveAll);
  },
  // save user input data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Record'];
    var today = new Date();
    var dateEl = today.toLocaleDateString();
    var slots = { studentName: formEl.studentName.value, 
        grade: formEl.grade.value, 
        age: formEl.age.value,
        time: dateEl};
// This function will validate User name field.
    var uName = formEl.studentName.value;
    var uName_len = uName.length;
    if (uName_len == 0){
      alert("User name field should not be empty");
    }
    if(uName_len>0){
      Record.add( slots);
    }
    formEl.reset();
  }
};