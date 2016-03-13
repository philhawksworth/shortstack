
// var fs  = require('fs');
var reqwest = require('reqwest');
var $ = require('jbone');
$.ajax = reqwest.compat;

var paths = require("../../scripts/config.js").paths;


// list ALL templates
// TODO : Automate this so that it is generated from the list of templates found in the directory
var templates = {
  main : require("../templates/main.js"),
  listing : require("../templates/listing.js"),
  partial : require("../templates/partial_body.js")
};


function addEventHandlers() {

  var dynamicPageLinks = document.querySelectorAll('[data-template]');

  $(dynamicPageLinks).on("click", function(e){
    e.preventDefault();

    // tell the page that a content transition is happening
    $('body').addClass('loading');
    $('body .content')[0].addEventListener("animationend", function(e){
        $('body').removeClass('loading');
    }, false);

    // get data from the api and render it
    var dataSource = returnAPIPath(e.target.pathname + ".json");
    reqwest(dataSource, function (resp) {
      renderContent(resp.template, resp);
      setAddress(e.target.pathname);
    })
  });

};

function setAddress(path){
  history.pushState({}, null, path);
}

// todo add popstate to manage browser history button usage



// Determine the api path from the hijcked link's href
function returnAPIPath(path){
  return "/api" + path.replace(".html", ".json");
}


// Output some data to the page via a given template
function renderContent(template, data){
  // var output = require("../templates/partial_body.js")[template](data);
  var output = templates['partial']['body'](data);
  $('.content').html(output);
};


// let's go!
$(function () {
  addEventHandlers();
});

