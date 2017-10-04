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
Action that occurs when a goal is clicked from the list.
*/
function clickedGoal(e) {
	// index of element to remove
	var index = parseInt(e.currentTarget.getAttribute('data-index'));
	e.currentTarget.parentElement.removeChild(e.currentTarget);
	chrome.storage.sync.get('accomplishGoalsList', function(response){
		var existingGoals = response.accomplishGoalsList;
		// Remove index from array
		existingGoals.splice(index, 1);

		// Decrease the index of elements after deleted element.
		$('div.goal-item').each(function() {
			var currentIndex = parseInt($(this).attr('data-index'));
			if(currentIndex > index) {
				$(this).attr('data-index', currentIndex - 1);
			}
		});

		// Resync the new array
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
					'<div class=goal-item data-index=' + index + '>' +
						'<span class=goal-property-title>' + goal.title + '</span>' +
						'<span class="goal-property-end float-right">' + DaysUntil(goal.end) + ' days</span>';
				
				if (typeof goal.begin !== 'undefined') {
					newGoal += '<div class="progress-bar-wrapper"><div class="progress-bar-finished"style=\"width:' + CurrentProgressToGoal(goal.begin, goal.end) +'%\"></div></div>';
				}

				newGoal += '</div>';
				
				if (typeof goal.description !== 'undefined') {
					newGoal += '<div class="goal-property-description">' + goal.description + '</div>';
				}

				newGoal += '</div>';
				$('#goals-list').append(newGoal);
				$('div.goal-item[data-index="' + index +'"]').click(clickedGoal);
				index++;
			});
		}
	});
	$("#main-form").submit(SaveNewGoal);
}

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

function DaysUntil(dateString)
{
	var secondsInDay = 86400000;
	var endDate = new Date(dateString);
	var todayDate = new Date();
	return Math.round(Math.abs((endDate.getTime() - todayDate.getTime())/(secondsInDay)));
}