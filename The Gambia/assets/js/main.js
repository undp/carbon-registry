$('.menu').click(function () {
  $(this).toggleClass("click");
  $('.sidebar').toggleClass("show");
  $('.col2').toggleClass("less");
});
$('.feat-btn').click(function () {
  $('nav ul .feat-show').toggleClass("show");
  $('nav ul .first').toggleClass("rotate");
});
$('.serv-btn').click(function () {
  $('nav ul .serv-show').toggleClass("show1");
  $('nav ul .second2').toggleClass("rotate");
});
$('nav ul li').click(function () {
  $(this).addClass("active").siblings().removeClass("active");
});

// navbar btn dropdown
$('.btn3').click(function () {
  $('nav ul .btn3-show').toggleClass("show3");
  $('nav ul .caret3').toggleClass("rotate");
});
$('.btn4').click(function () {
  $('nav ul .btn4-show').toggleClass("show4");
  $('nav ul .caret4').toggleClass("rotate");
});
$('.btn5').click(function () {
  $('nav ul .btn5-show').toggleClass("show5");
  $('nav ul .caret5').toggleClass("rotate");
});


