$(document).on("DOMContentLoaded", function () {
	Initialize();
});

/*
Save new goal to Chrome cloud sync storage.
*/
function SaveNewGoal(e) {
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
Loads previously saved goals from Google Chrome Cloud Sync storage, and
puts them into the DOM. 
*/
function Initialize() {
	chrome.storage.sync.get('accomplishGoalsList', function(response){
		if (typeof response.accomplishGoalsList !== 'undefined') {
			var index = 0;
			response.accomplishGoalsList.forEach(function(goal) {
				var newGoal = 
					'<div class=goal-item data-index=' + index + '>' +
						'<nobr>' +
						'<span class=goal-property-title>' + goal.title + '</span>' +
						'<div class=goal-property-edit-button> </div>' +
						'<span class="goal-property-end float-right">' + DaysUntil(goal.end) + ' days</span>' +
						'</nobr>';
				
				newGoal += "<input type=hidden name=goal-title />";
				newGoal += "<input type=hidden name=goal-begin />";
				newGoal += "<input type=hidden name=goal-end />";
				newGoal += "<input type=hidden name=goal-description />";

				// If the goal has a begin date, show a progress bar
				if (typeof goal.begin !== 'undefined') {
					newGoal += '<div class="progress-bar-wrapper"><div class="progress-bar-finished"style=\"width:' + CurrentProgressToGoal(goal.begin, goal.end) +'%\"></div></div>';
				}

				newGoal += '</div>';
				
				// If the goal has a description, show it
				if (typeof goal.description !== 'undefined') {
					newGoal += '<div class="goal-property-description">' + goal.description + '</div>';
				}				

				newGoal += '</div>';
				$('#goals-list').append(newGoal);

				// Populate hidden fields for fast retrieval later
				var newGoalDiv = $(".goal-item").last();
				$(newGoalDiv).find("[name=goal-title]").val(goal.title);
				$(newGoalDiv).find("[name=goal-begin]").val(goal.begin);
				$(newGoalDiv).find("[name=goal-end]").val(goal.end);
				$(newGoalDiv).find("[name=goal-description]").val(goal.description);

				index++;
			});
		}
	});

	$("#main-form").submit(SaveNewGoal);
}

/* 
Used to calculate the percentage towards a goal 
*/
function CurrentProgressToGoal(beginDateString, endDateString)
{
	var endDate = new Date(endDateString).getTime();
	var beginDate = new Date(beginDateString).getTime();
	var todayDate = new Date().getTime();

	if (endDate < beginDate || endDate < todayDate)
	{
		return 0;
	}

	var progressDecimal = ((todayDate - beginDate) / (endDate - beginDate));
	var progressPercentage = progressDecimal * 100;
	return progressPercentage.toString();
}

/* 
Used to calculate days until a given date (provided as a string)
*/
function DaysUntil(dateString)
{
	var secondsInDay = 86400000;
	var endDate = new Date(dateString);
	var todayDate = new Date();
	return Math.round(Math.abs((endDate.getTime() - todayDate.getTime())/(secondsInDay)));
}