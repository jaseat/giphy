var list = ["cat", "dog", "tiger", "rabbit", "bird", "gerbil", "frog", 
"hamster", "car", "plane", "socks", "dude", "gif", "what", "test", "dunno", "are", "you", "reading",
"this", "just", "putting", "random", "words"];
var gifs;

var displayButton = function(){
    $("#top-bar").empty();
    list.forEach(e => {
        var button = $("<button>");
        button.addClass("giphy");
        button.attr("topic", e);
        button.html(e);
        $("#top-bar").append(button);
    });
}

//gifs[i].images.fixed_height.url is the url for a fixed height image
//gif[i].images.fixed_height_still.url is the url for a still fixed height image

var displayGif = function(){
    $("#display").empty();
    gifs.forEach(e => {
        var newDiv = $("<div>");
        newDiv.addClass("img-container");
        newDiv.append("<p>Rating: " + e.rating + "</p>");
        var newImg = $("<img>");
        newImg.attr("src", e.images.fixed_height_still.url);
        newImg.attr("still", e.images.fixed_height_still.url);
        newImg.attr("animate", e.images.fixed_height.url);
        newImg.attr("state", "still");
        newImg.addClass("gif");
        $(newDiv).append(newImg);
        $("#display").append(newDiv);
    })
}

var submit = function(event){
    event.preventDefault();
    var add = $("#add").val();
    if(!document.getElementById("add").validity.valid){
        $("#err").html("Required Field");
        $("#add").css("border-color", "red");
        $("#ast").css("display", "inline");
    }
    else if (list.indexOf(add) !== -1){
        $("#err").html("Button already exists");
        $("#add").css("border-color", "red");
        $("#ast").css("display", "inline");
    }
    else{
        $("#err").empty();
        $("#add").css("border-color", '');
        $("#ast").css("display", "none");
        $("#add").val('');
        list.push(add);
        displayButton();
    }
}

var getGifs = function(){
    var topic = $(this).attr("topic");
    var APIKey = "ZolLn4uTARxCGqf1Wz9NqxCCL2K0EGl1";
    var URL = "https://api.giphy.com/v1/gifs/search?api_key="+APIKey+"&q="+topic+"&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
        method: "GET",
        url: URL
    }).then(function(res){
        gifs = res.data;
        displayGif();
    })
}

var animateGif = function (){
    switch($(this).attr("state")){
        case "still":
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("state", "animate");
            break;
        case "animate":
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
            break;
    }
}

$(document).ready(function(){
    $("form").on("submit", submit);
    $(document).on("click", ".giphy", getGifs);
    $(document).on("click", ".gif", animateGif);
    displayButton();
});