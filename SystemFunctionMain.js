const firebaseConfig = {
  apiKey: "AIzaSyD9VD22UhztG39NGd_BAVk1m5w_OI1Ny9M",
  authDomain: "projek-pbl-perniagaan.firebaseapp.com",
  databaseURL: "https://projek-pbl-perniagaan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projek-pbl-perniagaan",
  storageBucket: "projek-pbl-perniagaan.appspot.com",
  messagingSenderId: "811498637569",
  appId: "1:811498637569:web:0c394743c8746e9bbf7300"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var database = firebase.database()
var auth = firebase.auth()


//renders()
function getdata(){

}













function checkEmail(email) {
  check = /^[^@]+@\w+(\.\w+)+\w$/;
  if (check.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function checkPassword(field, name) {
  if (field == null && name == null) {
    return false;
  }

  if (field.length <= 6 && name.length <= 6) {
    console.log("hai")
    return false;
  } else {
    return true;
  }
}

function logout() {
  firebase.auth().signOut().then(function () {
    swal("LogOut", "", "success")
  }, function (error) {
    swal(error)
  });
}

function checkUserLoginC(url) {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("hai")
      window.location = url

    } else {
      swal("Please Login First!", "", "error")
    }
  });
}

function checkUserLogin() {

  let flex = document.querySelector('.header .flex .profile .flex');
  let login = document.querySelector('.header .flex .profile .userl');
  let name = document.querySelector('.header .flex .profile .name');

  firebase.auth().onAuthStateChanged(function (user) {
    
    if (user) {
      // User is signed in.
      database.ref('users/' + user.uid).on('value', (snapshot) => {
        const data = snapshot.val();
        name.innerHTML = data["Nama"]
      });
      flex.style.display = "block"
      login.style.display = "none"

    } else {
      // No user is signed in.
      flex.style.display = "none"
      login.style.display = "block"
      name.innerHTML = "Please Login First!"

    }
  });
}


function login() {
  var email = document.getElementById("email").value
  var pass = document.getElementById("pass").value

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      swal("Welcome Back!", "Success Login", "success").then((value) => {
        window.location = "home.html"
      });

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal("Error!", errorMessage, "error")
    });
}


var num = 0
var wait = true
function register() {

  console.log(num)
  if (num >= 1) {

    return
  }

  var name = document.getElementById("name").value
  var emailUser = document.getElementById("email").value
  var kelas = document.getElementById("kelas").value
  var password = document.getElementById("password").value
  var password2 = document.getElementById("cpass").value

  if (checkEmail(emailUser) == false || checkPassword(password, name) == false) {
    swal("Error!", "Please Enter Your Fields And Password Must Be At Least 8 Characters", "error");
    return
  }

  if (password != password2) {
    swal("Error!", "Password Not Same", "error");
    return
  }

  num = + 1

  auth.createUserWithEmailAndPassword(emailUser, password).then(function (system) {
    var user = system.user;


    var data = {
      Email: emailUser,
      Nama: name,
      Kelas: kelas,
      Cart: null
    }

    database.ref().child('users/' + user.uid).set(data)

    swal("Welcome!", "Success Register", "success").then((value) => {
      window.location = "home.html"
    });
  }).catch(function (error) {
    var errorM = error.message
    alert(errorM)
  })

}
