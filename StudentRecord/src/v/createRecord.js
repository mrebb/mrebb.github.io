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
    var dateEl = (new Date()).toUTCString();
    //var dateEl = today.toLocaleDateString();
    var slots = { studentName: formEl.studentName.value, 
        grade: formEl.grade.value, 
        age: formEl.age.value,
        time: dateEl};
// This function will validate mandatory fields.
    var uName = formEl.studentName.value;
    var uGrade = formEl.grade.value;
    var uAge = formEl.age.value;
    var uNameLen = uName.length;
    var uGradeLen = uGrade.length;
    var uAgeLen = uAge.length;
    if (uNameLen == 0 || uGradeLen == 0 || uAgeLen == 0){
      alert("No field should be left empty");
    }
    
    if(uNameLen > 0 && uGradeLen > 0 && uAgeLen > 0){
      Record.add( slots);
      formEl.reset();
    }
   
  }
};