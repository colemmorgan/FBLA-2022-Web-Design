const scaleFactor = 1 / 20;
let isEmailModalOpen = false;
let isSubModalOpen = false;
let lightMode = false;
let isMenuOpen = false;
let wishlistLength = 0;
let car = null;
let isImgOpen = false;
let wishlistCar = null;
let carBtn=null;


function RemoveWlButton(carNumber){
  car=document.getElementById(carNumber)
  carBtn= car.getElementsByClassName('wishlist-add')
  carBtn[0].style.visibility= "hidden"
}

function showWlRemoveButton(carNumber){
  car=document.getElementById(carNumber)
  carBtn= car.getElementsByClassName('wishlist-remove')
  carBtn[0].style.visibility= "visible"
}

function showWlAddButton(carNumber){
  car=document.getElementById(carNumber)
  carBtn= car.getElementsByClassName('wishlist-add')
  carBtn[0].style.visibility= "visible"
}

function removeWlRemoveButton(carNumber){
  car=document.getElementById(carNumber)
  carBtn= car.getElementsByClassName('wishlist-remove')
  carBtn[0].style.visibility= "hidden"
}

function showSuccessState(carNumber) {
  car=document.getElementById(carNumber)
  carBtn= car.getElementsByClassName('success-state__wrapper')
  carBtn[0].style.transform= "translateY(0%)"
}

function removeSuccessState(carNumber) {
  car=document.getElementById(carNumber)
  carBtn= car.getElementsByClassName('success-state__wrapper')
  carBtn[0].style.transform= "translateY(100%)"
}


function addToWishlist(carNumber, carID) {
  wishlistLength++;
  if (wishlistLength === 1) {
    document.body.classList += " wl__occupied";
  }

  RemoveWlButton(carNumber)
  showWlRemoveButton(carNumber)


  document.body.classList += " image__after--hidden"

  const newNode = document.createElement("li");
  newNode.innerHTML = document.getElementById(carNumber).innerHTML;
  newNode.setAttribute("id", carID);
  let list = document.getElementById("unordered__wl");
  list.appendChild(newNode);
}

function removeFromWishlist(carNumber, carID) {
  removeWlRemoveButton(carNumber)
  showWlAddButton(carNumber)
  object = document.getElementById(carID);
  object.remove();
  wishlistLength--;
  object=null

  if (wishlistLength === 0) {
    document.body.classList.remove("wl__occupied");
  }

  car=document.getElementById(carNumber)
  carBtn= car.getElementsByClassName('success-state__wrapper')
  
  if(carBtn[0].style.transform= "translateY(0%)"){
    carBtn[0].style.transform = "translateY(100%)"
  }

  
}

function enlargePhoto(photoID) {
  if (isImgOpen) {
    isImgOpen = false;
    return document.body.classList.remove("img__enlarged");
  }
  img = document.getElementById(photoID).getAttribute("src");
  image = document.getElementById("modal__img");
  image.src = img;
  isImgOpen = true;
  document.body.classList += " img__enlarged";
}

function toggleMenu() {
  if (isMenuOpen) {
    isMenuOpen = false;
    return document.body.classList.remove("menu--open");
  }

  isMenuOpen = true;
  document.body.classList += " menu--open";
}

function toggleLightMode() {
  if (lightMode) {
    lightMode = false;
    return document.body.classList.remove("light__mode");
  }
  console.log("working");
  lightMode = true;
  document.body.classList += " light__mode";
}

function toggleSubModal() {
  if (isSubModalOpen) {
    isSubModalOpen = false;
    return document.body.classList.remove("sub-modal--open");
  }
  if (isEmailModalOpen) {
    document.body.classList.remove("email-modal--open");
    isEmailModalOpen = false;
  }
  isSubModalOpen = true;
  document.body.classList += " sub-modal--open";
}

function toggleEmailModal() {
  if (isEmailModalOpen) {
    isEmailModalOpen = false;
    return document.body.classList.remove("email-modal--open");
  }
  if (isSubModalOpen) {
    document.body.classList.remove("sub-modal--open");
    isSubModalOpen = false;
  }
  isEmailModalOpen = true;
  document.body.classList += " email-modal--open";
}

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape__animate");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_ix98yog",
      "template_c74u1eb",
      event.target,
      "8sMY7zpMTaFfSyV3g"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavalible. Please contact me directly on colemmorgann@gmail.com"
      );
    });
}
