function LoadDate(){var e=new Date,t=getMonthString(e.getMonth())+" "+e.getDate();$(".greeting-date").text(t)}function LoadTime(){var e=new Date,t=e.getHours(),n="AM";t>=12&&(n="PM"),0==t?t=12:t>12&&(t-=12);var r=t+":"+IntToTwoCharacterString(e.getMinutes())+" "+n;$(".greeting-time").text(r)}function UpdateDateTime(){LoadDate();setInterval(LoadDate,1e3);LoadTime();setInterval(LoadTime,1e3)}function IntToTwoCharacterString(e){return("0"+e).slice(-2)}function getMonthString(e){if(e<0||e>11)return"";var t=new Array;return t[0]="January",t[1]="February",t[2]="March",t[3]="April",t[4]="May",t[5]="June",t[6]="July",t[7]="August",t[8]="September",t[9]="October",t[10]="November",t[11]="December",t[e]}$(document).ready(function(){UpdateDateTime()});