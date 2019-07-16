  // Connect Firebase watcher and initial loader 
  database.ref().on("child_added", function (childSnapshot) {
    //inputs childSnapshot in new variable
    var newName = childSnapshot.val().trainName;
    var newDestination = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFrequency = childSnapshot.val().frequency;

    //new variables with moment js and time conversions
    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    var remainder = diffTime % newFreq;
    var minutesTillTrain = newFrequency - remainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

      $("#box1").append("<div class='row'><div class='col-sm-2'> " +
      childSnapshot.val().name +
      " </div><div class='col-sm'> " + childSnapshot.val().newName +
      " </div><div class='col-sm'> " + childSnapshot.val().newdestination +
      " </div><div class='col-sm'> " + childSnapshot.val().newfrequency +
      " </div><div class='col-sm'> " + childSnapshot.val().catchTrain+
      " </div><div class='col-sm'> " + childSnapshot.val().minutesTillTrain +
      " </div></div>");

    // Clear current user input fields in second for new inputs
    $("#nameInput, #destinationInput, #timeInput, #frequencyInput").val("");
    return false;
  },