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
// SCROLL ANIMATIONS MANAGER
// ===============================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".scroll-animate");

  if ("IntersectionObserver" in window) {
    const animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.15,
      },
    );

    animatedElements.forEach((element) => animationObserver.observe(element));
  } else {
    animatedElements.forEach((element) => element.classList.add("animated"));
  }
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

// ==========================================
// HIỆU ỨNG MƯA TRÁI TIM RƠI CHẬM RÃI (Đã tối ưu vùng chứa lớp phủ)
// ==========================================
function createHeartShower() {
  const heartContainer = document.createElement("div");
  heartContainer.id = "wedding-heart-shower";

  Object.assign(heartContainer.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: "9999",
  });

  document.body.appendChild(heartContainer);

  const styleSheet = document.createElement("style");

  styleSheet.innerHTML = `
  
  @keyframes heartFall {
    0% {
      transform: translateY(-50px) rotate(0deg) scale(0.6);
      opacity: 0;
    }

    10% {
      opacity: 0.9;
    }

    100% {
      transform: translateY(110vh) rotate(360deg) scale(1);
      opacity: 0;
    }
  }

  @keyframes heartSway {
    0% {
      margin-left: 0px;
    }

    25% {
      margin-left: 12px;
    }

    50% {
      margin-left: -12px;
    }

    75% {
      margin-left: 8px;
    }

    100% {
      margin-left: 0px;
    }
  }

  .falling-heart{
      position:absolute;
      user-select:none;
      pointer-events:none;
      line-height:1;
      will-change:transform;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15));
  }

  `;

  document.head.appendChild(styleSheet);

  const heartIcons = ["❤️", "💖", "💕", "💗", "💘", "💞"];

  function spawnHeart() {
    if (document.hidden) return;

    const heart = document.createElement("div");

    heart.className = "falling-heart";

    heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];

    const size = Math.random() * 18 + 14;
    const left = Math.random() * 100;
    const duration = Math.random() * 5 + 7;

    heart.style.left = left + "%";
    heart.style.top = "-40px";
    heart.style.fontSize = size + "px";

    heart.style.animation = `
      heartFall ${duration}s linear forwards,
      heartSway ${Math.random() * 2 + 3}s ease-in-out infinite
    `;

    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  setInterval(() => {
    spawnHeart();
  }, 350);
}
// ===============================
// INIT ALL FUNCTIONS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
  startAutoSlide();
  initMusic();
  initScrollAnimations();
  createHeartShower(); // Kích hoạt mưa rơi an toàn trong cấu trúc khung
});
