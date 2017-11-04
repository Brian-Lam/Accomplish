$(document).ready(function() {
    PageFadeIn();
    UpdateDateTime();
    AttachMenuButtonListeners();
});

/*
Load the date and populate the DOM.
*/
function LoadDate()
{
    var dateCurrentDate = new Date();
    var dateMonth = GetMonthString(dateCurrentDate.getMonth());
    var dateDay = dateCurrentDate.getDate();
    var dateString = dateMonth + " " + dateDay;
    $(".greeting-date").text(dateString);
    return;
}

/*
Load the time and populate the DOM.
*/
function LoadTime()
{
    var timeCurrent = new Date();
    // Hour
    var timeHours = timeCurrent.getHours();
    var timeHourPeriod = "AM";

    if (timeHours >= 12) {
        // Show PM if it's after 12 noon
        timeHourPeriod = "PM";
    }
    
    timeHours = timeHours % 12;
        
    if (timeHours == 0) {
        // If it's midnight, show hour as 12
        timeHours = 12;
    }

    // Minute and seconds
    var timeMinutes = timeCurrent.getMinutes();
    
    // Display String
    var timeString = timeHours + ":" + IntToTwoCharacterString(timeMinutes) + " " + timeHourPeriod;
    $(".greeting-time").text(timeString);
    
    return;
}

/*
Run LoadDate and LoadTime on an interval, updating every second.
*/
function UpdateDateTime()
{
    LoadDate();
    var intervalDate = setInterval(LoadDate, 1000);
    LoadTime();
    var intervalTime = setInterval(LoadTime, 1000);
}

/*
Converts a integer to a two character string. 
Used for displaying Minutes.

Source: https://stackoverflow.com/questions/8513032/less-than-10-add-0-to-number
*/
function IntToTwoCharacterString(_input)
{
    return ('0' + _input).slice(-2);
}

/*
Translate a month number into a string. 0-index based, 
so Month 0 is January.

Source: https://www.w3schools.com/jsref/jsref_getmonth.asp
*/
function GetMonthString(month)
{
    if (month < 0 || month > 11)
    {
        return ""; 
    }

    var months = new Array();
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";

    return months[month];
}

/* 
Set up button actions
*/
function AttachMenuButtonListeners()
{
    $("#new-goal-button").click(function(){
        ShowNewGoalForm();
    });

    $("#new-goal-close-button").click(function(){
        $(".new-goal-wrapper").fadeOut(100);
    });

    $(".goal-property-edit-button").click(function(){
        $("[name=newgoal-title]").val("hey");
    });

    $(".goal-property-edit-button").click(function(){
        // Retrieve current values
        var goalItem = $(this).closest(".goal-item");
        var goalTitle = $(goalItem).find("[name=goal-title]").val();
        var goalBegin = $(goalItem).find("[name=goal-begin]").val();
        var goalEnd = $(goalItem).find("[name=goal-end]").val();
        var goalDescription = $(goalItem).find("[name=goal-description]").val();

        // Populate edit form
        $("[name=newgoal-title]").val(goalTitle);
        $("[name=newgoal-end]").val(goalEnd);
        $("[name=newgoal-begin]").val(goalBegin);
        $("[name=newgoal-description]").val(goalDescription);
        
        ShowEditGoalForm();
    });

    // Click outside of goal form popup to closeit
    $(document).mouseup(function(e) 
    {
        // Credit: https://stackoverflow.com/questions/1403615/use-jquery-to-hide-a-div-when-the-user-clicks-outside-of-it
        var container = $(".new-goal-wrapper");
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            $(".new-goal-wrapper").fadeOut(100);
        }
    });
}

/* 
Fade in the new goal form, hide anything edit related
*/
function ShowNewGoalForm()
{
    $("#edit-goal-submit").hide();
    $("#new-goal-submit").show();

    $("#edit-goal-h2").hide();
    $("#add-goal-h2").show();

    $("#remove-goal-submit").hide();

    $(".new-goal-wrapper").fadeIn(100);
}

/* 
Fade in the edit goal form, hide anything add related
*/
function ShowEditGoalForm()
{
    $("#edit-goal-submit").show();
    $("#new-goal-submit").hide();

    $("#edit-goal-h2").show();
    $("#add-goal-h2").hide();

    $("#remove-goal-submit").show();

    $(".new-goal-wrapper").fadeIn(100);
}

/*
Fade in effect on page load 
*/
function PageFadeIn() 
{
    $(".fade-cover").fadeOut(800);
}