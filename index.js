const scaleFactor = 1 / 20;
let isEmailModalOpen = false;
let isSubModalOpen = false;

function toggleSubModal() {
  if (isSubModalOpen){
    isSubModalOpen = false;
    return document.body.classList.remove("sub-modal--open");
  }
  isSubModalOpen = true;
  document.body.classList += " sub-modal--open"
}

function toggleEmailModal() {
  if (isEmailModalOpen) {
    isEmailModalOpen = false;
    return document.body.classList.remove("email-modal--open");
  }
  isEmailModalOpen = true;
  document.body.classList += " email-modal--open";
  console.log("working")
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