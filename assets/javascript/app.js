
console.log ("hello");
// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCsDI86E6k6FW2Q1H88wHCDGUkhWoD5J0I",
    authDomain: "trainschedule-b9242.firebaseapp.com",
    databaseURL: "https://trainschedule-b9242.firebaseio.com",
    projectId: "trainschedule-b9242",
    storageBucket: "",
    messagingSenderId: "110890079109",
    appId: "1:110890079109:web:83f58ce0fcd46ee6"
    };

    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
  
  // 2. Button for adding trains
  $("#addInputs").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName= $("#nameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainStart = moment($("#timeInput").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequencyInput").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    console.log("trains added successfully!");
  });
//     // Clears all of the text-boxes
//     $("#employee-name-input").val("");
//     $("#role-input").val("");
//     $("#start-input").val("");
//     $("#rate-input").val("");
//   });
  
//   // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
//   database.ref().on("child_added", function(childSnapshot) {
//     console.log(childSnapshot.val());
  
//     // Store everything into a variable.
//     var empName = childSnapshot.val().name;
//     var empRole = childSnapshot.val().role;
//     var empStart = childSnapshot.val().start;
//     var empRate = childSnapshot.val().rate;
  
//     // Employee Info
//     console.log(empName);
//     console.log(empRole);
//     console.log(empStart);
//     console.log(empRate);
  
//     // Prettify the employee start
//     var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
//     // Calculate the months worked using hardcore math
//     // To calculate the months worked
//     var empMonths = moment().diff(moment(empStart, "X"), "months");
//     console.log(empMonths);
  
//     // Calculate the total billed rate
//     var empBilled = empMonths * empRate;
//     console.log(empBilled);
  
//     // Create the new row
//     var newRow = $("<tr>").append(
//       $("<td>").text(empName),
//       $("<td>").text(empRole),
//       $("<td>").text(empStartPretty),
//       $("<td>").text(empMonths),
//       $("<td>").text(empRate),
//       $("<td>").text(empBilled)
//     );
  
//     // Append the new row to the table
//     $("#employee-table > tbody").append(newRow);
//   });
  
//   // Example Time Math
//   // -----------------------------------------------------------------------------
//   // Assume Employee start date of January 1, 2015
//   // Assume current date is March 1, 2016
  
//   // We know that this is 15 months.
//   // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  