$(document).ready(function() {
    ShowBackground();
});

function ShowBackground()
{
    var backgrounds = 
    [
        "above-adventure-aerial-air.jpg",
        "amazing-animal-beautiful-beautifull.jpg",
        "cairn-fog-mystical-background-158607.jpeg",
        "delicate-arch-night-stars-landscape.jpg",
        "pexels-photo-132037.jpeg",
        "pexels-photo-206359.jpeg",
        "pexels-photo-247599.jpeg",
        "pexels-photo-262669.jpeg",
        "pexels-photo-302740.jpeg",
        "pexels-photo-314860.jpeg",
        "pexels-photo-360912.jpeg",
        "pexels-photo-375732.jpeg",
        "pexels-photo-552784.jpeg",
        "StockSnap_RGOP31CS3I.jpg",
        "sunrise-phu-quoc-island-ocean.jpg"
    ];

    var backgroundPath = "/assets/backgrounds/";
    var backgroundFile = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    var backgroundUrl = "url('" + backgroundPath + backgroundFile + "')"
    $("html").css("background-image", backgroundUrl);
}