/**
 * @fileOverview  The model class Record with attribute definitions and storage management methods
/**
 * Constructor function for the class Record 
 * @constructor
 * @param {{studentName: string, grade: string, age: number}} slots - Object creation slots.
 */
function Record( slots) {
  this.studentName = slots.studentName;
  this.grade = slots.grade;
  this.age = slots.age;
};
/***********************************************
 ***  Class-level ("static") properties  *******
 ***********************************************/
Record.instances = {};  // initially an empty collection (a map)

/*********************************************************
 ***  Class-level ("static") storage management methods **
 *********************************************************/
// Convert row to object
Record.convertRow2Obj = function (recordRow) {
  var record = new Record( recordRow);
  return record;
};
// Load the student record table from Local Storage
Record.retrieveAll = function () {
  var key="", keys=[], recordsString="", records={}, i=0;  
  try {
    if (localStorage.getItem("records")) {
      recordsString = localStorage.getItem("records");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (recordsString) {
    records = JSON.parse( recordsString);
    keys = Object.keys( records);
    console.log( keys.length +" records loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Record.instances[key] = Record.convertRow2Obj( records[key]);
    }
  }
};
//  Save all student record objects to Local Storage
Record.saveAll = function () {
  var recordsString="", error=false,
      nmrOfRecords = Object.keys( Record.instances).length;  
  try {
    recordsString = JSON.stringify( Record.instances);
    localStorage.setItem("records", recordsString);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfRecords + " records saved.");
};
//  Create a new student record row
Record.add = function (slots) {
  var record = new Record( slots);
  // add record to the Record.instances collection
  Record.instances[slots.studentName] = record;
  alert("Record created successfully");
  console.log("Record " + slots.studentName + " created!");
};
//  Update an existing student record row
Record.update = function (slots) {
  var record = Record.instances[slots.studentName];
  var age = parseInt( slots.age);
  if (record.grade !== slots.grade) record.grade = slots.grade;
  if (record.age !== age) record.age = age;
  console.log("Record " + slots.studentName + " modified!");
};
//  Delete a student record row from persistent storage
Record.destroy = function (studentName) {
  if (Record.instances[studentName]) {
    console.log("Record " + studentName + " deleted");
    delete Record.instances[studentName];
  } else {
    console.log("There is no record with student name " + studentName + " in the database!");
  }
};
//  Clear data
Record.clearData = function () {
  if (confirm("Do you really want to delete all student record data?")) {
    Record.instances = {};
    localStorage.setItem("records", "{}");
  }
};
