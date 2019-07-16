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

    //variables
    var name= "";
    var destination= "";
    var startTime= "";
    var frequency= 0;
  
    //set current time to update train schedule
    function currentTime(){
    var current= moment ().format ('LT');
    $("#currentTime").html ("Current Time"+ current);
        setTimeout(curentTime, 1000);
    };    

    $("#add-input").on("click", function () {
        name = $("#formq1").val();
        destination = $("#formq2").val();
         = $("#formq3").val();
        frequency = $("#formq4").val();
        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            monthlyRate: monthlyRate,
        })
        var dateStarted = startDate;
        console.log("THIS IS THE DATE " + dateStarted)
        // console.log how many months since start date
        console.log(moment().diff(dateStarted, "months"))
    });


    database.ref().on("child_added", function (childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().role);
        console.log(childSnapshot.val().startDate);
        console.log(childSnapshot.val().monthsWorked);
        console.log(childSnapshot.val().monthlyRate);
        console.log(childSnapshot.val().totalBilled);


        $("#currentEmployees").append("<div class='row'><div class='col-sm-2'> " +
            childSnapshot.val().name +
            " </div><div class='col-sm'> " + childSnapshot.val().role +
            " </div><div class='col-sm'> " + childSnapshot.val().startDate +
            " </div><div class='col-sm'> " + childSnapshot.val().monthsWorked +
            " </div><div class='col-sm'> " + childSnapshot.val().monthlyRate +
            " </div><div class='col-sm'> " + childSnapshot.val().totalBilled +
            " </div></div>");
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
})