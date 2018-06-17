//test and get firebaseup and running plz
$(document).ready(function () {
  console.log("document ready!")

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDQzwqpPer0mE-YF5ySgW3M2zWK2cLCr7s",
    authDomain: "trainapp-ebbfc.firebaseapp.com",
    databaseURL: "https://trainapp-ebbfc.firebaseio.com",
    projectId: "trainapp-ebbfc",
    storageBucket: "trainapp-ebbfc.appspot.com",
    messagingSenderId: "1071721238026"
  };
  firebase.initializeApp(config);

  var database = firebase.database();




  $("#addTrain").on("click", function (event) {
    event.preventDefault();

    var name = $("#tName").val().trim();
    var city = $("#city").val().trim();
    var tTime = $("#tTime").val().trim();
    var freq = $("#freq").val().trim();


    database.ref().push({
      trainName: name,
      city: city,
      TrainTime: tTime,
      Frequency: freq

    });


    console.log(name);
    console.log(city);
    console.log(tTime);
    console.log(freq);
    // it all works so far my dude
    // var row = $("<tr>");
    // var dataName = $("<td>").text(name); //new <td> for every entry(4)
    // var dataCity = $("<td>").text(city);
    // var datatTime = $("<td>").text(tTime); ///BIG OOPS THIS GOES ON CHILD LISTENER >>BLAME DAN
    // var dataFreq = $("<td>").text(freq);

    // row.append(dataName, dataCity,dataFreq, datatTime);
    // $("#trainTable").append(row);








  });


  database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    
    
    console.log(dataName);
    //math for minutes left
    
    //here goes that math 
    var freqInt = parseInt(snapshot.val().Frequency);
    
    
    
    var arrivalTime = moment(snapshot.val().TrainTime, "HH:mm").subtract(1, "years");
    console.log("arrival"+arrivalTime); //APPARENTLY THIS IS JSON, S.O.B.
    
    var diffTime = moment().diff(moment(arrivalTime), "minutes");
    console.log("diff"+diffTime);
    
    var tRemainder = diffTime % freqInt; //DAT MODULUS WHICH IS REMAINDER >> BLAME DAN
    console.log(tRemainder);
    var tMinutesTillTrain = freqInt - tRemainder; //DAT MINUTES
    console.log(tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes"); //OH YEAH? 
    
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    var row = $("<tr>");
    var dataName = $("<td>").text(snapshot.val().trainName);
    var dataCity = $("<td>").text(snapshot.val().city);
    var dataFreq = $("<td>").text(snapshot.val().Frequency);
    var nextTD = $("<td>").text(moment(nextTrain).format("hh:mm"));
    var untilTD = $("<td>").text(tMinutesTillTrain)
    row.append(dataName, dataCity, dataFreq, nextTD, untilTD);
    $("#trainTable").append(row);
    

  });











});

