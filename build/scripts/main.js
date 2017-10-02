$(document).ready(function() {
    UpdateDateTime();
});

/*
Load the date and populate the DOM.
*/
function LoadDate()
{
    var dateCurrentDate = new Date();
    var dateMonth = getMonthString(dateCurrentDate.getMonth());
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
    var timeHours = timeCurrent.getHours();
    var timeMinutes = timeCurrent.getMinutes();
    var timeSeconds = timeCurrent.getSeconds();
    var timeString = timeHours + ":" + IntToTwoCharacterString(timeMinutes) + ":" + IntToTwoCharacterString(timeSeconds);
    $(".greeting-time").text(timeString);
    
    return;
}

/*
Run LoadDate and LoadTime on an interval
*/
function UpdateDateTime()
{
    LoadDate();
    var intervalDate = setInterval(LoadDate, 100);
    LoadTime();
    var intervalTime = setInterval(LoadTime, 100);
}

/*
Converts a integer to a two character string. 
Used for minute and second.

Source: 
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
function getMonthString(month)
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