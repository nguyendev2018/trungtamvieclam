const barsMenu = document.querySelector('.list-menu__bars');
const body = document.querySelector('body');
barsMenu.addEventListener('click', () =>{
    barsMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
})
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
  });
