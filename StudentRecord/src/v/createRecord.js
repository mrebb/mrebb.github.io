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
 /* //create time object
  assignDate: function() {
  var dateEl = document.getElementById("time");
  var today = new Date();
  dateEl.textContent = today.toLocaleDateString();
  dateEl.setAttribute("datetime", today.toISOString());
},*/
  // save user input data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Record'];
    var today = new Date();
    var dateEl = today.toLocaleDateString();
    var slots = { studentName: formEl.studentName.value, 
        grade: formEl.grade.value, 
        age: formEl.age.value,
        time:dateEl};
    Record.add( slots);
    formEl.reset();
  }
};