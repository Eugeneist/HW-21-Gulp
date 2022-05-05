
// ----- jQuerry version ------

const figure = $(".myfigure");
const form = $(".form");
const select = $(".form-select");
const color = $(".form-control-color");


select.change(() => {
    figure.fadeOut(0,1);
    if (select.val() == "square") {
        figure.removeClass().addClass("square");
    } else if (select.val() == "rectangle") {
        figure.removeClass().addClass("rectangle");
    } else if (select.val() == "circle") {
        figure.removeClass().addClass("circle");
    } else{
        figure.removeClass();
    }
    figure.fadeIn(1000);
})


color.on('input', function() { figure.css("background-color", color.val()); });

