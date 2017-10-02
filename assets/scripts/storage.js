function save() {
	chrome.storage.sync.get('accomplishGoalsList', function(response){
		var existingGoals = response.accomplishGoalsList;
		if(typeof response.accomplishGoalsList === 'undefined') {
			existingGoals = [];
		}
		existingGoals.push({
		'title': document.getElementsByName('newgoal-title')[0].value,
		'begin': document.getElementsByName('newgoal-begin')[0].value,
		'end': document.getElementsByName('newgoal-end')[0].value,
		'description': document.getElementsByName('newgoal-description')[0].value
		});
		chrome.storage.sync.set({'accomplishGoalsList': existingGoals});
	});
}

function initialize() {
	chrome.storage.sync.get('accomplishGoalsList', function(response){
		if(typeof response.accomplishGoalsList !== 'undefined') {
			response.accomplishGoalsList.forEach(function(goal) {

				var titleTag = document.createElement('p');
				var titleText = document.createTextNode("Title: " + goal.title);
				titleTag.appendChild(titleText);
				document.body.appendChild(titleTag);

				var beginTag = document.createElement('p');
				var beginText = document.createTextNode("Begin: " + goal.begin);
				beginTag.appendChild(beginText);
				document.body.appendChild(beginTag);

				var endTag = document.createElement('p');
				var endText = document.createTextNode("End: " + goal.end);
				endTag.appendChild(endText);
				document.body.appendChild(endTag);

				var descriptionTag = document.createElement('p');
				var descriptionText = document.createTextNode("Description: " + goal.description);
				descriptionTag.appendChild(descriptionText);
				document.body.appendChild(descriptionTag);
			});
		}
	});
}

document.addEventListener("DOMContentLoaded", function () {
	initialize();
	document.getElementById("main-form").onsubmit = save;
});