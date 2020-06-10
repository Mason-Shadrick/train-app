$(document).ready(function(){

//firebase initialization
var config = {
        apiKey: "AIzaSyCDrsDtQKrjogKmpH9W_TKsccasqljTnHA",
        authDomain: "train-homework-8d5ab.firebaseapp.com",
        databaseURL: "https://train-homework-8d5ab.firebaseio.com",
        projectId: "train-homework-8d5ab",
        storageBucket: "train-homework-8d5ab.appspot.com",
        messagingSenderId: "464063118534",
        appId: "1:464063118534:web:dd3847e60239e41d01ebc7",
        measurementId: "G-BKL7ZMEW2M"
      };

firebase.initializeApp(config);
var database = firebase.database();


//train button
$("#submitBut").on("click", function(event){
    event.preventDefault();
    //storing user inputs into vars
    var trainName = $("#trainName").val().trim();
    var trainDest = $("#trainDestin").val().trim();
    var firstTrain = $("#trainDepart").val().trim();
    var trainFreq = $("#trainFreq").val().trim();
    //train object creation
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq
    };
    //pushing data to firebase
    database.ref().push(newTrain);

    //clearing text boxes
    $("#trainName").val("");
	$("#trainDestin").val("");
	$("#trainDepart").val("");
	$("#trainFreq").val("");
});

//snapshot of what was just added to firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    //consol logging what was added
    console.log(childSnapshot.val());

    //storing info to vars
    var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().start;
	var trainFreq = childSnapshot.val().frequency;

    //declaring var
    var trainFreq;
    //var for time to show up on table
    var firstTime = 0;

    //converting time into vars subtracting one year to make sure it comes before current time
    var firstTimeConvert = moment(firstTime, "HH:mm").subtract(1, "years");
    //checking with console
    console.log(firstTimeConvert)

    //current time
    var currentTime = moment();
    //checking
    console.log("current time: " + moment(currentTime).format("HH:mm"));
    
    //difference of times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //checking
    console.log("diff in time: " + diffTime);
    
    //time diff remainder
    var tRemainder = diffTime % trainFreq;
    //checking
    console.log("remainder: " + tRemainder);
    
    // mins until next train
    var tMinutesTillTrain = trainFreq - tRemainder;
    //checking
    console.log("mins til train: " + tMinutesTillTrain);

    // train arrival time
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //checking
    console.log("arrival time: " + moment(nextTrain).format("HH:mm"));

    //adding the train to the table
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
    "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
 });


})

