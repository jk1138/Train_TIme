$(document).ready(function () {

// Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCsDI86E6k6FW2Q1H88wHCDGUkhWoD5J0I",
  authDomain: "trainschedule-b9242.firebaseapp.com",
  databaseURL: "https://trainschedule-b9242.firebaseio.com",
  projectId: "trainschedule-b9242",
  storageBucket: "",
  messagingSenderId: "110890079109",
  appId: "1:110890079109:web:83f58ce0fcd46ee6"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

    // Global Variables
    var trainName = "";
    var trainDestination = "";
    var trainTime = "";
    var trainFrequency = "";
    var nextArrival = "";
    var minutesAway = "";


    // FUNCTIONS  
// Capture Button Click
$("#addTrain").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#interval").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: freq
    });
  });


  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % newFreq;

    // Minute(s) Until Train
    var tMinutesTillTrain = newFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    // Display On Page
    $("#all-display").append(
      ' <tr><td>' + newTrain +
      ' </td><td>' + newLocation +
      ' </td><td>' + newFreq +
      ' </td><td>' + catchTrain +
      ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

    // Clear input fields
    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;
  },
    //Handle the errors
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});