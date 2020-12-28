// 注意：每次调用$.git() 或 $.post()  $.ajax()的时候，
// 会先调用  ajaxPrefilter
$.ajaxPrefilter(function(options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    console.log(options.url);
})