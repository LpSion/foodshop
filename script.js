let navbar = document.querySelector('.header .flex .navbar');
let profile = document.querySelector('.header .flex .profile');
let flex = document.querySelector('.header .flex .profile .flex');

function test(){
    swal({
        title: "Are you sure want to add to cart?",
        text: "",
        icon: "warning",
        buttons: ["No", "Yes"],
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Add To Cart!", "", {
            icon: "success",
          });
        } 
      });
}

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
   profile.classList.remove('active');
}

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   navbar.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   navbar.classList.remove('active');
}

function loader(){
   document.querySelector('.loader').style.display = 'none';
}

function fadeOut(){
   setInterval(loader, 2000);
}

window.onload = fadeOut;