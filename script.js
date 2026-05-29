// ===============================
// COUNTDOWN
// ===============================
const weddingDate = new Date("Jun 09, 2026 09:30:00").getTime();

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;

  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;

  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;

  document.getElementById("seconds").innerHTML =
    seconds < 10 ? "0" + seconds : seconds;

  if (distance < 0) {
    clearInterval(countdownFunction);

    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      document.getElementById(id).innerHTML = "00";
    });
  }
}, 1000);

// ===============================
// ALBUM
// ===============================
const albumImages = [
  "images/album1.jpg",
  "images/album2.jpg",
  "images/album3.jpg",
  "images/album4.jpg",
];

let currentAlbumIndex = 0;
let autoSlideInterval;

function updateAlbumUi() {
  const mainPreview = document.getElementById("mainAlbumPreview");

  if (mainPreview) {
    mainPreview.style.opacity = 0;

    setTimeout(() => {
      mainPreview.src = albumImages[currentAlbumIndex];

      mainPreview.style.opacity = 1;
    }, 200);
  }

  const thumbnails = document.querySelectorAll(".thumb-img");

  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active-thumb", index === currentAlbumIndex);
  });
}

function currentSlide(index) {
  currentAlbumIndex = index;
  updateAlbumUi();
  resetAutoSlide();
}

function changeSlide(direction) {
  currentAlbumIndex += direction;

  if (currentAlbumIndex >= albumImages.length) currentAlbumIndex = 0;

  if (currentAlbumIndex < 0) currentAlbumIndex = albumImages.length - 1;

  updateAlbumUi();
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentAlbumIndex++;

    if (currentAlbumIndex >= albumImages.length) currentAlbumIndex = 0;

    updateAlbumUi();
  }, 3500);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// ===============================
// COPY STK
// ===============================
function copySTK() {
  const stk = document.getElementById("stkNum").innerText;

  navigator.clipboard.writeText(stk);

  alert("Đã sao chép số tài khoản!");
}

// ===============================
// MUSIC
// ===============================
function initMusic() {
  const audio = document.getElementById("weddingMusic");

  const musicToggle = document.getElementById("musicToggle");

  if (!audio) return;

  audio.volume = 0.6;

  musicToggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
    } else {
      audio.pause();
      musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
  });

  document.getElementById("openInviteBtn").addEventListener("click", () => {
    audio.muted = false;
    audio.play();

    document.getElementById("introLoader").classList.add("hide");
  });
}

// ===============================
// PRELOAD IMAGES
// ===============================
function preloadImages() {
  albumImages.forEach((img) => {
    const image = new Image();
    image.src = img;
  });
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
  startAutoSlide();
  initMusic();
});
