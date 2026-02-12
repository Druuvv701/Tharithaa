let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

/* =========================
   SLIDE NAVIGATION
========================= */

document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", function () {

    const current = slides[currentSlide];

    const input = current.querySelector("input");
    if (input) {
      if (input.value.trim() === "") {
        alert("Answer compulsoryy! 💩");
        input.focus();
        return;
      }
    }

    moveNext();
  });
});

function moveNext() {
  slides[currentSlide].classList.remove("active");
  currentSlide++;
  if (currentSlide < slides.length) {
    slides[currentSlide].classList.add("active");
  }
}


/* =========================
   STORE OPTION ANSWERS
========================= */

document.querySelectorAll(".option-btn:not(.dodge)").forEach(btn => {
  btn.addEventListener("click", function () {

    const text = this.innerText;

    if (currentSlide === 3) {
      document.getElementById("favAnswer").value = text;
    }

    if (currentSlide === 5) {
      document.getElementById("giftAnswer").value = text;
    }

    if (currentSlide === 6 || currentSlide === 7) {
      document.getElementById("finalAnswer").value = text;
    }

  });
});


/* =========================
   SMOOTH DODGE
========================= */

document.querySelectorAll(".dodge").forEach(btn => {

  btn.addEventListener("mousemove", () => dodge(btn));
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodge(btn);
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    dodge(btn);
  });

});

function dodge(btn) {
  const container = document.querySelector(".container");
  const rect = container.getBoundingClientRect();

  const maxX = rect.width - btn.offsetWidth - 20;
  const maxY = rect.height - btn.offsetHeight - 20;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  btn.style.position = "absolute";
  btn.style.transition = "transform 0.25s ease";
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}


/* =========================
   SECRET BUTTON
========================= */

document.querySelector(".highlight").addEventListener("click", () => {
  document.querySelector(".secret").style.display = "inline-block";
});


/* =========================
   FORM SUBMIT (NO REDIRECT)
========================= */

const form = document.getElementById("giftForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.innerText = "Sending... 💛";
  submitBtn.disabled = true;

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      showSuccess();
    } else {
      alert("Something went wrong 😭 Try again.");
      submitBtn.innerText = "Send Answers 💛";
      submitBtn.disabled = false;
    }
  })
  .catch(() => {
    alert("Network error 😭");
    submitBtn.innerText = "Send Answers 💛";
    submitBtn.disabled = false;
  });
});


function showSuccess() {
  document.querySelector(".container").innerHTML = `
    <div style="text-align:center;">
      <h2>Answers Sent Successfully 💛💩</h2>
      <p>Now I know everything hehehe 😌</p>
    </div>
  `;
}
