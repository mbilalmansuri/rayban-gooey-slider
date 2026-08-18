(() => {
  const loader = document.querySelector(".loader");
  let loaderHidden = false;

  const tl = gsap.timeline({ paused: true });

  tl.from("nav img, nav a", {
    y: -100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    onComplete: function () {
      this._targets.forEach(function (target, index) {
        index > 0 && target.classList.add("transition-all", "duration-200");
      });
    },
  });

  if (window.innerWidth >= 640) {
    tl.from(
      ".banner-heading span:nth-child(1), #banner-left button",
      {
        yPercent: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        onComplete: function () {
          this._targets[3].classList.add("transition-all", "duration-200");
        },
      },
      "contentAnim",
    );

    tl.from(
      "#banner-right *",
      {
        xPercent: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
      },
      "contentAnim",
    );
  } else {
    tl.from(".banner-heading span:nth-child(1), #banner-left button", {
      yPercent: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      onComplete: function () {
        this._targets[3].classList.add("transition-all", "duration-200");
      },
    });

    tl.from("#banner-right *", {
      yPercent: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
  }

  const hideLoader = () => {
    if (loaderHidden) return;
    loaderHidden = true;
    if (loader) {
      loader.classList.add("-z-50", "pointer-events-none", "opacity-0");
      loader.setAttribute("aria-hidden", "true");
      loader.addEventListener(
        "transitionend",
        () => {
          loader.remove();
        },
        { once: true },
      );
    }
    tl.play();
  };

  if (window.THREE && THREE.DefaultLoadingManager) {
    THREE.DefaultLoadingManager.onLoad = () => {
      requestAnimationFrame(hideLoader);
    };
  }

  setTimeout(hideLoader, 1000); // fallback in case the loading manager doesn't trigger

  Shery.imageEffect("#banner-back", {
    style: 1,
    config: {
      a: { value: 1, range: [0, 30] },
      b: { value: 0.99, range: [-1, 1] },
      zindex: { value: 0, range: [-9999999, 9999999] },
      aspect: { value: 2 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: false },
      onMouse: { value: 1 },
      noise_speed: { value: 1.5, range: [0, 10] },
      metaball: { value: 0.15, range: [0, 2], _gsap: { id: 3 } },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 50, range: [0, 100] },
    },
    gooey: true,
  });

  const banner = document.querySelector("#banner");
  const bannerHeadings = document.querySelectorAll(".banner-heading");
  let animating = false;

  banner.addEventListener("click", (e) => {
    if (
      animating ||
      e.target.tagName === "A" ||
      e.target.tagName === "BUTTON"
    ) {
      return;
    }

    animating = true;
    let completed = 0;

    bannerHeadings.forEach((elem) => {
      const spans = elem.querySelectorAll("span");
      const current = parseInt(elem.dataset.index || "0", 10);
      const next = current === spans.length - 1 ? 0 : current + 1;

      gsap.to(spans[current], {
        top: "-=100%",
        opacity: 0,
        ease: "Expo.easeInOut",
        duration: 1,
        onComplete: function () {
          gsap.set(this._targets[0], { top: "100%" });
          completed++;
          if (completed === bannerHeadings.length) {
            animating = false;
          }
        },
      });

      gsap.to(spans[next], {
        top: "-=100%",
        opacity: 1,
        ease: "Expo.easeInOut",
        duration: 1,
      });

      elem.dataset.index = next;
    });
  });
})();
