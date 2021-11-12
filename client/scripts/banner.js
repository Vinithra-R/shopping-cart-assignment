export default class Banner {
  constructor() {}
  render() {
    this.displayBanners();
    console.log("======================");
  }
  /**
   * Function is used to display the banners
   */
  async displayBanners() {
    let banners = await this.fetchBanners();
    console.log("==========+++++++++++++++++++++++============");

    console.log(banners.length);
    this.renderBanners(banners);
    this.renderBannerControls(banners.filter((banner) => banner.isActive));
    this.animateBanners();
    this.registerEvents();
  }

  /**
   * Function is used to fetch the banners from API request
   */
  fetchBanners() {
    return fetch("http://localhost:5000/banners").then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Something went wrong !");
      }
    });
  }

  /**
   * Function is used to display the banner item
   *
   * @param {Object} banners The banner list
   */
  renderBanners(banners) {
    console.log("======================" + banners.length);
    let fragment = document.createDocumentFragment(),
      parentElement = document.querySelector("#banner");

    // Based on the order sort the array list
    banners.sort((a, b) => a.order - b.order);

    for (const banner of banners) {
      if (banner.isActive) {
        const item = this.renderBanner(banner);
        fragment.appendChild(item);
      }
    }
    parentElement.appendChild(fragment);
  }

  renderBanner(banner) {
    const item = document.createElement("li"),
      template = `<img src="${banner.bannerImageUrl}" alt="${banner.bannerImageAlt}" />`;

    item.innerHTML = template;
    item.className = "fade";

    return item;
  }

  renderBannerControls(banners) {
    let fragment = document.createDocumentFragment(),
      parentDotElement = document.querySelector(".carousel");

    if (banners.length > 0) {
      let div = document.createElement("div");
      div.id = "banner-dots";
      parentDotElement.appendChild(div);

      for (let i = 0; i < banners.length; i++) {
        const item = document.createElement("span");

        item.setAttribute("data-slide", i);
        item.className = "dot";
        fragment.appendChild(item);
      }
      div.appendChild(fragment);
    }
    this.renderBannerButtonControls();
  }

  renderBannerButtonControls() {
    let fragment = document.createElement("template"),
      parentDotElement = document.querySelector(".carousel"),
      template = `<div id="banner-btn"><button class="prev-btn">PREV</button><button class="next-btn">NEXT</button>`;

    fragment.innerHTML = template;
    parentDotElement.appendChild(fragment.content);
  }

  animateBanners(slideIndex = 0, isControlClick) {
    var slides = document.querySelectorAll("#banner li"),
      dots = document.querySelectorAll("#banner-dots .dot"),
      btn = document.querySelectorAll("#banner-btn button");

    if (isControlClick) {
      clearTimeout(this.resetAnimateTimer);
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // hide all the slides
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active"); // remove active class
    }
    for (let i = 0; i < btn.length; i++) {
      btn[i].classList.remove("fade"); // remove active class
    }
    if (slideIndex > slides.length - 1) {
      slideIndex = 0;
    }
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");

    if (slideIndex == 0) {
      btn[0].classList.add("fade");
    } else if (slideIndex == slides.length - 1) {
      btn[1].classList.add("fade");
    }
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    this.resetAnimateTimer = setTimeout(() => {
      this.animateBanners(slideIndex);
    }, 2000); // Change image every 2 seconds
  }

  registerEvents() {
    let self = this,
      bannerElem = document.querySelector("#banner-dots"),
      bannerBtn = document.querySelector("#banner-btn");

    if (bannerElem) {
      bannerElem.addEventListener("click", function (e) {
        if (e.target.closest(".dot")) {
          if (e.target.getAttribute("data-slide"))
            self.animateBanners(e.target.getAttribute("data-slide"), true);
        }
      });
    }
    if (bannerBtn) {
      bannerBtn.addEventListener("click", function (e) {
        if (e.target.closest("button.prev-btn")) {
          self.animateBanners(
            Number(
              document.querySelector(".dot.active").getAttribute("data-slide")
            ) - 1,
            true
          );
        } else if (e.target.closest("button.next-btn")) {
          self.animateBanners(
            Number(
              document.querySelector(".dot.active").getAttribute("data-slide")
            ) + 1,
            true
          );
        }
      });
    }
  }
}
