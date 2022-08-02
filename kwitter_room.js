var firebaseConfig = {
  apiKey: "AIzaSyCevuHnEw-J7E1TB21q1QG5HUpWODQGQ4k",
  authDomain: "kwitter2-272ff.firebaseapp.com",
  databaseURL: "https://kwitter2-272ff-default-rtdb.firebaseio.com",
  projectId: "kwitter2-272ff",
  storageBucket: "kwitter2-272ff.appspot.com",
  messagingSenderId: "1037294211021",
  appId: "1:1037294211021:web:73f24114ff6cf7208c3e84"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//YOUR FIREBASE LINKS
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
console.log(room_name);
console.log("Hello");

function send()
{
  console.log("send function");
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
        name : user_name,
        message : msg,
        like : 0
  });

  document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4> " + name + "<name img class='user_trick' src='tick.png'</h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like +" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
  } });  }); }
getData();

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes
  });
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
   Room_names = childKey;
  //Start code
  console.log("Room Name - " + Room_names);
  row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names + "</div><hr>";
  document.getElementById("output").innerHTML += row;
  //End code
  });});}
getData();

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
  });

  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
}

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}


function addUser()
{
user_name = document.getElementById("user_name").value;

localStorage.setItem("user_name", user_name);

window.location = ("kwitter_room.html");
}