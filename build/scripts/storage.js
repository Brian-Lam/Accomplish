$(document).on("DOMContentLoaded", function () {
	Initialize();
});


/*
Uses chrome storage sync to save new goal
*/
function SaveNewGoal() {
	chrome.storage.sync.get('accomplishGoalsList', function(response){
		var existingGoals = response.accomplishGoalsList;
		if (typeof response.accomplishGoalsList === 'undefined') {
			existingGoals = [];
		}
		existingGoals.push({
		'title': $('input[name=newgoal-title]').val(),
		'begin': $('input[name=newgoal-begin]').val(),
		'end': $('input[name=newgoal-end]').val(),
		'description': $('input[name=newgoal-description]').val()
		});
		chrome.storage.sync.set({'accomplishGoalsList': existingGoals});
	});
}

/*
Initialize method that checks if previous goals have been defined and
loads them if they have been
*/
function Initialize() {
	chrome.storage.sync.get('accomplishGoalsList', function(response){
		if (typeof response.accomplishGoalsList !== 'undefined') {
			response.accomplishGoalsList.forEach(function(goal) {
				$(document.body).append('<p> Title: ' + goal.title + '</p>');
				$(document.body).append('<p> Begin: ' + goal.begin + '</p>');
				$(document.body).append('<p> End: ' + goal.end + '</p>');
				$(document.body).append('<p> Description: ' + goal.description + '</p>');
			});
		}
	});
	document.getElementById("main-form").onsubmit = SaveNewGoal;
}
