$(document).ready(function() {
    ShowBackground();
});

function ShowBackground()
{
    var backgrounds = 
    [
        "cairn-fog-mystical-background-158607.jpeg",
        "delicate-arch-night-stars-landscape.jpg",
        "pexels-photo-132037.jpeg",
        "pexels-photo-139975.jpeg",
        "pexels-photo-206359.jpeg",
        "pexels-photo-206660.jpeg",
        "pexels-photo-262669.jpeg",
        "pexels-photo-314860.jpeg",
        "pexels-photo-325185.jpeg",
        "pexels-photo-360912.jpeg",
        "sunrise-phu-quoc-island-ocean.jpg"
    ];

    var backgroundPath = "/assets/backgrounds/";
    var backgroundFile = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    var backgroundUrl = "url('" + backgroundPath + backgroundFile + "')"
    $("html").css("background-image", backgroundUrl);
}