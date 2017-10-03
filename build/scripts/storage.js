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
			var index = 0;
			response.accomplishGoalsList.forEach(function(goal) {
				var newGoal = 
					'<div class=goal-item index=' + index + '>' +
						'<div class=goal-property-title><u>' + goal.title + '</u></div>' +
						'<div class="goal-property-time">' +
							'<div class="goal-property-begin">' + goal.begin + '</div>' +
							'<div class="goal-property-begin">' + goal.end + '</div>' +
						'</div>';
				if(typeof goal.description !== 'undefined') {
					newGoal += '<div class="goal-property-description">' + goal.description + '</div>';
				}
				newGoal += '</div>';
				$('#goals-list').append(newGoal);
				index++;
			});
		}
	});
	$("#main-form").submit(SaveNewGoal);
}
