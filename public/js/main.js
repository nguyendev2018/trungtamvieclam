const barsMenu = document.querySelector(".list-menu__bars");
const body = document.querySelector("body");
const overlayBlack = document.querySelector(".overlay-black");
const iconClose = document.querySelector(".bi.bi-x-lg");
const menuHeader = document.querySelector(".header-bottom");
barsMenu.addEventListener("click", () => {
  barsMenu.classList.toggle("active");
  body.classList.toggle("no-scroll");
  overlayBlack.classList.add("active");
});
iconClose.addEventListener("click", () => {
  closeMenuMobile();
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];

  setTimeout(function () {
    modal.classList.add("show");
    body.classList.add("no-scroll");
    overlayBlack.classList.add("active");
  }, 1000);

  span.onclick = function () {
    closeModal();
  };
  window.onclick = function (event) {
    if (event.target == overlayBlack) {
      closeModal();
      closeMenuMobile();
    }
  };

  document.onkeydown = function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal();
    }
  };

  function closeModal() {
    modal.classList.remove("show");
    body.classList.remove("no-scroll");
    overlayBlack.classList.remove("active");
  }
});

function closeMenuMobile() {
  body.classList.remove("no-scroll");
  barsMenu.classList.remove("active");
  overlayBlack.classList.remove("active");
}
// scroll header
document.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    menuHeader.classList.add("header-bottom__scroll");
  } else {
    menuHeader.classList.remove("header-bottom__scroll");
  }
});
$(document).ready(function () {
  $("select.select2").each(function () {
    let elm = "";
    if (typeof $(this).data("wrapper") !== "undefined") {
      elm = $(this).parent();
    }
    $(this).select2({
      templateResult: function (data, container) {
        if (data.element) {
          $(container).addClass($(data.element).attr("class"));
        }
        return data.text;
      },
      dropdownParent: elm,
      minimumResultsForSearch: 10,
    });
  });
  function checkScreenWidth() {
    if ($(window).width() < 552) {
      $(".collapse-filter").attr("id", "collapse-btn");
    }
    else {
      $(".collapse-filter").removeAttr("id");
    }
  }
  checkScreenWidth();
  $(window).resize(function () {
    checkScreenWidth();
  });
  $("#btn-filter").click(function () {
    $("#collapse-btn").toggleClass("active"); // toggle collapse
  });
});
