const barsMenu = document.querySelector('.list-menu__bars');
const body = document.querySelector('body');
barsMenu.addEventListener('click', () =>{
    barsMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
})
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const modelContent = document.querySelector(".modal-content");
    const body = document.querySelector("body");
    // Display the modal with transition
    setTimeout(function() {
        modal.classList.add("show");
        modelContent.classList.add('active');
        body.classList.add('no-scroll');
    }, 100);

    // Close the modal when the user clicks on the "x"
    span.onclick = function() {
        modal.classList.remove("show");
        modelContent.classList.remove('active');
        body.classList.remove('no-scroll');
        setTimeout(function() {
            modal.style.display = "none";
          
            
        }, 500); // Match the transition duration
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove("show");
            setTimeout(function() {
                modal.style.display = "none";
            }, 500); // Match the transition duration
        }
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
  });
