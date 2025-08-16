// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth, GoogleAuthProvider, signInWithPopup,
    onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7dGPe1GUCOhneo8vDIGxfsRK7T58BFU0",
    authDomain: "projectairsarbat.firebaseapp.com",
    databaseURL: "https://projectairsarbat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectairsarbat",
    storageBucket: "projectairsarbat.firebasestorage.app",
    messagingSenderId: "443325785352",
    appId: "1:443325785352:web:ce52a972274448879ef8bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;
const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
    const loginprofile = document.getElementById("loginprofile");
    const infoprofile = document.getElementById("infoprofile");

    if (user) {
        // user login
        infoprofile.innerHTML = `
            <p class="name">Profile</p>
            <img id="imgprofile" src="images/profile.png" style="width: 120px; height: 120px; border-radius: 60px;">
            <p id="nameprofile" class="name">Nama</p>
            <p id="emailprofile" style="font-size: 16px;" class="name">Email</p>
            <a id="logout" class="btn">Logout</a>
        `;

        UpdateUserProfile(user);
        loginprofile.innerHTML = "";

        // attach event logout selepas button wujud
        AccountUserLogout();
        toggleOrdersCartListener(false)

    } else {
        // user belum login
        loginprofile.innerHTML = `
            <p class="name">please login first!</p>
            <div id="googleloginBtn"
                style="cursor:pointer; display:flex; margin-top: 8px; align-items:center; gap:10px; border:1px solid #ccc; padding:10px; border-radius:8px; width:200px; justify-content:center;">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" width="20" height="20">
                <span>Login with Google</span>
            </div>
        `;

        infoprofile.innerHTML = "";

        // attach event login selepas button wujud
        AccountUserLogin();
        toggleOrdersCartListener(true);
    }
});


function UpdateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    document.getElementById("nameprofile").textContent = userName;
    document.getElementById("emailprofile").textContent = userEmail;
    document.getElementById("imgprofile").src = userProfilePicture;

}

function AccountUserLogin() {
    const googleloginBtn = document.getElementById("googleloginBtn");
    if (!googleloginBtn) return; // elak error
    googleloginBtn.addEventListener('click', function () {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                console.error(error);
            });
    });
}

function AccountUserLogout() {
    const logout = document.getElementById("logout");
    if (!logout) return; // elak error
    logout.addEventListener('click', function () {
        signOut(auth).then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error(error);
        });
    });
}


// FunctionUntis Button;
const ordersBtn = document.getElementById("ordersBtn");
const cartBtn = document.getElementById("cartBtn");

function orderscartBtnAlert() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonText: "Okay",
        text: "Login First or Register!",
    });
}

function toggleOrdersCartListener(mode) {
    const buttons = [cartBtn, ordersBtn];

    buttons.forEach(btn => {
        if (!btn) return; // kalau button tak wujud, skip
        if (mode === true) {
            
            btn.addEventListener("click", orderscartBtnAlert);
        } else if (mode === false) {
            btn.removeEventListener("click", orderscartBtnAlert);
        }
    });
}

// const loginbtn = document.getElementById("loginbtn");
// loginbtn.addEventListener('click', function () {
//     Swal.fire({
//         title: 'Login',
//         html: `
//       <input type="text" id="username" class="swal2-input" placeholder="Username">
//       <input type="password" id="password" class="swal2-input" placeholder="Password">
//     `,
//         confirmButtonText: 'Login',
//         focusConfirm: false,
//         preConfirm: () => {
//             const username = Swal.getPopup().querySelector('#username').value
//             const password = Swal.getPopup().querySelector('#password').value
//             if (!username || !password) {
//                 Swal.showValidationMessage(`Sila isi username dan password`)
//             }
//             return { username: username, password: password }
//         }
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // ambil data login
//             console.log("Username:", result.value.username)
//             console.log("Password:", result.value.password)

//             // contoh check simple
//             if (result.value.username === "admin" && result.value.password === "1234") {
//                 Swal.fire("Berjaya!", "Login successful!", "success")

//             } else {
//                 Swal.fire("Gagal!", "Username / password salah!", "error")
//             }
//         }
//     })
// });

// const registerbtn = document.getElementById("registerbtn");
// registerbtn.addEventListener('click', function () {
//     Swal.fire({
//         title: 'Register',
//         html: `
//       <input type="text" id="username" class="swal2-input" placeholder="Username">
//       <input type="password" id="password" class="swal2-input" placeholder="Password">
//       <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password">
//     `,
//         confirmButtonText: 'Register',
//         focusConfirm: false,
//         preConfirm: () => {
//             const username = Swal.getPopup().querySelector('#username').value
//             const password = Swal.getPopup().querySelector('#password').value
//             const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value

//             if (!username || !password || !confirmPassword) {
//                 Swal.showValidationMessage(`Sila isi semua ruangan`)
//             }

//             // Check confirm password
//             if (password !== confirmPassword) {
//                 Swal.showValidationMessage(`Password tidak sama!`)
//             }

//             return { username, password }
//         }
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire("Berjaya!", "Akaun didaftarkan!", "success")
//             console.log("Data Register:", result.value)
//         }
//     })
// });

