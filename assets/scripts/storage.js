function SaveNewGoal(){chrome.storage.sync.get("accomplishGoalsList",function(n){var o=n.accomplishGoalsList;void 0===n.accomplishGoalsList&&(o=[]),o.push({title:$("input[name=newgoal-title]").val(),begin:$("input[name=newgoal-begin]").val(),end:$("input[name=newgoal-end]").val(),description:$("input[name=newgoal-description]").val()}),chrome.storage.sync.set({accomplishGoalsList:o})})}function Initialize(){chrome.storage.sync.get("accomplishGoalsList",function(n){void 0!==n.accomplishGoalsList&&n.accomplishGoalsList.forEach(function(n){$(document.body).append("<p> Title: "+n.title+"</p>"),$(document.body).append("<p> Begin: "+n.begin+"</p>"),$(document.body).append("<p> End: "+n.end+"</p>"),$(document.body).append("<p> Description: "+n.description+"</p>")})}),$("#main-form").submit(SaveNewGoal)}$(document).on("DOMContentLoaded",function(){Initialize()});