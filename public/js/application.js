;
$(document).ready(function() {
  'use strict';

  $('#search').on('keyup', function() {
    var fuzzySearchText = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$';
    console.log(fuzzySearchText);
    var reg = RegExp(fuzzySearchText, 'i');
    var survey_title;
    $(".survey_list a").parents().show();
    $(".survey_list a").filter(function() {
      survey_title = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(survey_title);}).parent().hide();

  });
  // event handler
  // prevent default
  // go to this ajax function
  $("body").on("submit", ".create_question", function(event){
    event.preventDefault();
    createQuestion();
  });

  createQuestion = function () {
    var route = $('.add-question').attr('action')
    var formData = $('.add-question').serialize()
    $.ajax({
      url: route,
      type: 'POST',
      data: formData,
    })
    .done(function(response) {
      $('.questionsList').append(response)
      $('#questions').replaceWith(formData.description)
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  };

});
  
  //Simple search: 
    // $(".survey_list a").filter(function(item) {return !~$(this).text().indexOf(searchtext)}).parent().hide();
    // var searchtext = $(this).val();
    // console.log($(this).val());
    // $(".survey_list a").filter(function(item) {console.log($(this).text().indexOf(searchtext))}).parent().hide();