/* =========================================
   HAPPY BIRTHDAY HONNEY
   PINK + BROWN CINEMATIC EDITION
========================================= */

const scenes =
  document.querySelectorAll(".scene");

const transition =
  document.getElementById("transition");

const music =
  document.getElementById("backgroundMusic");

const video =
  document.getElementById("birthdayVideo");

let currentScene = "intro";

let audioContext = null;

let musicStarted = false;


/* =========================================
   AUDIO ENGINE
========================================= */

function initAudio() {

  if (!audioContext) {

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

  }

  if (
    audioContext.state === "suspended"
  ) {

    audioContext.resume();

  }

}


function tone(
  frequency,
  duration = .1,
  type = "sine",
  volume = .04
) {

  initAudio();

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.type = type;

  oscillator.frequency.value =
    frequency;

  gain.gain.setValueAtTime(
    volume,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    .001,
    audioContext.currentTime +
    duration
  );

  oscillator.connect(gain);

  gain.connect(
    audioContext.destination
  );

  oscillator.start();

  oscillator.stop(
    audioContext.currentTime +
    duration
  );

}


function clickSound() {

  tone(
    500,
    .06,
    "sine",
    .035
  );

  setTimeout(() => {

    tone(
      700,
      .07,
      "sine",
      .025
    );

  }, 50);

}


function successSound() {

  tone(
    523,
    .1,
    "sine",
    .04
  );

  setTimeout(() => {

    tone(
      659,
      .1,
      "sine",
      .04
    );

  }, 100);

  setTimeout(() => {

    tone(
      784,
      .2,
      "sine",
      .045
    );

  }, 200);

}


function errorSound() {

  tone(
    180,
    .15,
    "sawtooth",
    .025
  );

  setTimeout(() => {

    tone(
      130,
      .2,
      "sawtooth",
      .02
    );

  }, 130);

}


function countdownSound() {

  tone(
    330,
    .12,
    "sine",
    .045
  );

}


/* =========================================
   MUSIC
   LOW VOLUME = 25%
========================================= */

function startMusic() {

  if (musicStarted) return;

  music.volume = 0.25;

  music.play()
    .then(() => {

      musicStarted = true;

    })
    .catch(() => {

      console.log(
        "Waiting for user interaction."
      );

    });

}


/* =========================================
   MUSIC FADE
========================================= */

function fadeMusic(
  target,
  duration = 2000
) {

  const start =
    music.volume;

  const difference =
    target - start;

  const steps = 40;

  let step = 0;

  const timer =
    setInterval(() => {

      step++;

      music.volume =
        start +
        difference *
        (step / steps);

      if (step >= steps) {

        clearInterval(timer);

        music.volume =
          target;

      }

    }, duration / steps);

}


/* =========================================
   SCENE CHANGE
========================================= */

function showScene(
  id,
  callback = null
) {

  if (
    id === currentScene
  ) return;

  transition.classList.add(
    "show"
  );

  setTimeout(() => {

    scenes.forEach(scene => {

      scene.classList.remove(
        "active"
      );

    });

    const target =
      document.getElementById(id);

    if (target) {

      target.classList.add(
        "active"
      );

    }

    currentScene = id;

    window.scrollTo(
      0,
      0
    );

    setTimeout(() => {

      transition.classList.remove(
        "show"
      );

      if (callback) {

        callback();

      }

    }, 120);

  }, 450);

}


/* =========================================
   INTRO
========================================= */

document
  .getElementById("startBtn")
  .addEventListener(
    "click",
    () => {

      initAudio();

      clickSound();

      startMusic();

      setTimeout(() => {

        successSound();

      }, 250);

      showScene(
        "birthday"
      );

    }
  );


/* =========================================
   NEXT BUTTONS
========================================= */

document
  .querySelectorAll(".next")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        clickSound();

        showScene(
          button.dataset.next
        );

      }
    );

  });


/* =========================================
   FUNNY LOADING
========================================= */

let funnyStarted = false;

const observer =
  new MutationObserver(() => {

    const funny =
      document.getElementById(
        "funny"
      );

    if (
      funny.classList.contains(
        "active"
      )
    ) {

      startFunny();

    }

  });


observer.observe(
  document.body,
  {
    attributes: true,
    subtree: true,
    attributeFilter: [
      "class"
    ]
  }
);


function startFunny() {

  if (funnyStarted) return;

  funnyStarted = true;

  const bar =
    document.getElementById(
      "progressBar"
    );

  const percent =
    document.getElementById(
      "percentage"
    );

  const loadingText =
    document.getElementById(
      "loadingText"
    );

  const error =
    document.getElementById(
      "errorMessage"
    );

  let value = 0;

  const timer =
    setInterval(() => {

      value +=
        Math.floor(
          Math.random() * 7
        ) + 3;

      if (value >= 100) {

        value = 100;

        clearInterval(timer);

        bar.style.width =
          "100%";

        percent.textContent =
          "100%";

        loadingText.textContent =
          "Checking final result...";

        setTimeout(() => {

          loadingText.classList.add(
            "hidden"
          );

          error.classList.remove(
            "hidden"
          );

          errorSound();

        }, 700);

        return;

      }

      bar.style.width =
        value + "%";

      percent.textContent =
        value + "%";

      if (
        value >= 69 &&
        value < 80
      ) {

        loadingText.textContent =
          "69%... suspicious. 😂";

      }

      else if (
        value >= 90
      ) {

        loadingText.textContent =
          "Almost there...";

      }

    }, 150);

}


/* =========================================
   FIX SYSTEM
========================================= */

document
  .getElementById("fixBtn")
  .addEventListener(
    "click",
    () => {

      clickSound();

      const screen =
        document.querySelector(
          ".computer-screen"
        );

      screen.innerHTML = `

        <div style="
          text-align:center;
          padding:25px 5px;
        ">

          <div style="
            font-size:65px;
          ">
            😂
          </div>

          <h3 style="
            color:#ffd6e2;
            margin:15px 0;
          ">
            SYSTEM FIXED.
          </h3>

          <p style="
            color:#b9a29a;
            line-height:1.8;
          ">
            Okay, okay...
            seryoso na gyud ko. 😭
          </p>

          <br>

          <button
            class="main-btn"
            id="memoryButton"
          >
            CONTINUE →
          </button>

        </div>

      `;

      successSound();

      document
        .getElementById(
          "memoryButton"
        )
        .addEventListener(
          "click",
          () => {

            clickSound();

            showScene(
              "dragon"
            );

          }
        );

    }
  );


/* =========================================
   VIDEO INTRO
========================================= */

let countdownStarted = false;

const videoObserver =
  new MutationObserver(() => {

    const intro =
      document.getElementById(
        "videoIntro"
      );

    if (
      intro.classList.contains(
        "active"
      )
    ) {

      startCountdown();

    }

  });


videoObserver.observe(
  document.body,
  {
    attributes: true,
    subtree: true,
    attributeFilter: [
      "class"
    ]
  }
);


function startCountdown() {

  if (countdownStarted) return;

  countdownStarted = true;

  const counter =
    document.getElementById(
      "countdown"
    );

  let number = 3;

  counter.textContent =
    number;

  countdownSound();

  const timer =
    setInterval(() => {

      number--;

      if (number > 0) {

        counter.textContent =
          number;

        countdownSound();

      }

      else {

        clearInterval(timer);

        counter.textContent =
          "GO!";

        successSound();

        setTimeout(() => {

          showScene(
            "videoScene",
            startVideo
          );

        }, 600);

      }

    }, 900);

}


/* =========================================
   VIDEO
========================================= */

function startVideo() {

  /*
    BACKGROUND MUSIC OFF
    BEFORE VIDEO STARTS
  */

  music.pause();

  video.currentTime = 0;

  video.play()
    .then(() => {

      document
        .getElementById(
          "videoStart"
        )
        .style.opacity = "0";

    })
    .catch(() => {

      document
        .getElementById(
          "videoStart"
        )
        .style.opacity = "1";

    });

}


/* =========================================
   MANUAL VIDEO START
========================================= */

document
  .querySelector(".video-box")
  .addEventListener(
    "click",
    () => {

      initAudio();

      /*
        Music stays OFF.
      */

      music.pause();

      video.play();

    }
  );


/* =========================================
   VIDEO END
========================================= */

video.addEventListener(
  "ended",
  () => {

    successSound();

    createConfetti(45);

    document
      .getElementById(
        "videoNext"
      )
      .classList.remove(
        "hidden"
      );

  }
);


document
  .getElementById("videoNext")
  .addEventListener(
    "click",
    () => {

      clickSound();

      /*
        IMPORTANT:
        Music will NOT return here.
      */

      showScene(
        "silence"
      );

    }
  );


/* =========================================
   SILENCE
========================================= */

document
  .getElementById("silenceNext")
  .addEventListener(
    "click",
    () => {

      clickSound();

      showScene(
        "serious"
      );

    }
  );


/* =========================================
   SERIOUS
========================================= */

document
  .getElementById("letterBtn")
  .addEventListener(
    "click",
    () => {

      clickSound();

      showScene(
        "letter",
        startLetter
      );

    }
  );


/* =========================================
   LETTER
========================================= */

const letterText = `Happy Birthday, Honney. 🎂💗

Karon imong special day, gusto lang ko nga mahibaw-an nimo nga I genuinely hope you have a beautiful and happy birthday.

I hope makatawa ka, maka-enjoy ka, ug ma-feel nimo nga special gyud ka karon.

Dili man ko perfect sa pagpangita og words, pero I want you to know nga I appreciate the little moments, the random conversations, the jokes, and even the simple memories.

Mao nang naghimo ko ani.

Naay jokes.
Naay gamayng ka-cinematic.
Naay dragon². 😂

Pero behind all those jokes, genuine gyud akong greeting para nimo.

I hope this new chapter of your life brings you more reasons to smile, more beautiful memories, and more moments worth keeping.

Please enjoy your day.

Smile.
Have fun.
And don't forget nga birthday nimo karon, so bawal mag-stress. 😂

Happy Birthday again, Honney. 💗

I hope this little surprise made you smile.

— From someone who wanted to make your birthday a little more special. 💗`;


let letterStarted = false;


function startLetter() {

  if (letterStarted) return;

  letterStarted = true;

  const target =
    document.getElementById(
      "typedLetter"
    );

  const button =
    document.getElementById(
      "giftBtn"
    );

  let index = 0;

  function type() {

    if (
      index <
      letterText.length
    ) {

      target.textContent +=
        letterText.charAt(index);

      index++;

      let delay = 22;

      if (
        letterText.charAt(
          index - 1
        ) === "\n"
      ) {

        delay = 180;

      }

      setTimeout(
        type,
        delay
      );

    }

    else {

      button.classList.remove(
        "hidden"
      );

      /*
        MUSIC RETURNS SLOWLY
        ONLY AFTER LETTER FINISHES.
      */

      music.currentTime =
        music.currentTime || 0;

      music.volume = 0;

      music.play()
        .then(() => {

          musicStarted = true;

          fadeMusic(
            0.25,
            4500
          );

        })
        .catch(() => {});

      successSound();

    }

  }

  type();

}


/* =========================================
   GIFT
========================================= */

document
  .getElementById("giftBtn")
  .addEventListener(
    "click",
    () => {

      clickSound();

      showScene(
        "final"
      );

    }
  );


document
  .getElementById("gift")
  .addEventListener(
    "click",
    () => {

      successSound();

      createConfetti(120);

      document
        .getElementById(
          "gift"
        )
        .classList.add(
          "hidden"
        );

      document
        .getElementById(
          "finalMessage"
        )
        .classList.remove(
          "hidden"
        );

    }
  );


/* =========================================
   CONFETTI
========================================= */

function createConfetti(
  amount = 50
) {

  const container =
    document.getElementById(
      "confetti"
    );

  const colors = [
    "#ffd6e2",
    "#e89ab5",
    "#b85c7c",
    "#fff1e8",
    "#9b6249"
  ];

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const piece =
      document.createElement(
        "div"
      );

    piece.className =
      "confetti";

    const size =
      5 +
      Math.random() * 8;

    piece.style.left =
      Math.random() *
      100 +
      "vw";

    piece.style.width =
      size +
      "px";

    piece.style.height =
      size * 1.6 +
      "px";

    piece.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    piece.style.animationDelay =
      Math.random() *
      .7 +
      "s";

    piece.style.animationDuration =
      2.5 +
      Math.random() *
      2 +
      "s";

    container.appendChild(
      piece
    );

    setTimeout(() => {

      piece.remove();

    }, 5500);

  }

}


/* =========================================
   FLOATING HEARTS
========================================= */

function floatingHeart() {

  const heart =
    document.createElement(
      "div"
    );

  heart.textContent =
    Math.random() > .5
      ? "💗"
      : "♡";

  heart.style.position =
    "fixed";

  heart.style.left =
    Math.random() *
    100 +
    "vw";

  heart.style.bottom =
    "-30px";

  heart.style.fontSize =
    12 +
    Math.random() *
    15 +
    "px";

  heart.style.opacity =
    ".35";

  heart.style.pointerEvents =
    "none";

  heart.style.zIndex =
    "1";

  document.body.appendChild(
    heart
  );

  const duration =
    5 +
    Math.random() *
    5;

  heart.animate(
    [
      {
        transform:
          "translateY(0) scale(.7)",
        opacity: 0
      },

      {
        transform:
          "translateY(-50vh) scale(1)",
        opacity: .4
      },

      {
        transform:
          "translateY(-110vh) scale(.5)",
        opacity: 0
      }
    ],
    {
      duration:
        duration * 1000,

      easing:
        "ease-out"
    }
  );

  setTimeout(() => {

    heart.remove();

  }, duration * 1000);

}


setInterval(
  floatingHeart,
  1800
);


/* =========================================
   PRELOAD PHOTO
========================================= */

const photo =
  new Image();

photo.src =
  "photo.jpg";


/* =========================================
   CONSOLE
========================================= */

console.log(
  "%c HAPPY BIRTHDAY HONNEY 💗 ",
  "font-size:22px;font-weight:bold;color:#e89ab5;"
);

console.log(
  "Pink + Brown Cinematic Birthday Edition loaded."
);
