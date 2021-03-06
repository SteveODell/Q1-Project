var userBMR;

$('#userDataSubmit').click(function(event) {
  //obtain user inputs
    var userAgeNum = parseInt(document.getElementById("userAge").value)
    var userHeightNum = parseInt(document.getElementById("userHeight").value)
    var userWeightNum = parseInt(document.getElementById("userWeight").value)
    var userGenderValue = document.getElementById("userGender").value
    var userSelection = document.getElementById("beerChoice").value
    var userExercise = document.getElementById("exerciseLevel").value

    // use gender-appropriate formula
    switch (userGenderValue) {
      case 'Male':
        userBMR = parseInt((15.875*userHeightNum + 4.54*userWeightNum - 5*userAgeNum + 5) * 1.3);
        break;
      case "Female":
      userBMR = parseInt((15.875*userHeightNum + 4.54*userWeightNum - 5*userAgeNum - 161) * 1.3);
      break;
    }

    $('#bmrResultsBox').text('Your daily calorie allowance is: ' + userBMR);
    event.preventDefault(event);

});

var myAppId = '8a645784';
var myAppKey = '311449cd85d0a73dd09cad74ee661a9d'
var dailyCals = 0


function callNixApi(userInput) {
	var calledSearchItem;
	$('.resultBox').html('');
	$.ajax({
		type: 'GET',
		async: true,
		url: 'https://api.nutritionix.com/v1_1/search/'+ userInput +'?'+
		'fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2C&appId=' + myAppId + '&appKey=' + myAppKey,
		success: function(d) {
			calledSearchItem = d.hits;
			calledSearchItem.map(function(item) {
				var foodLists = item.fields
				$('.resultBox').append(
					'<div class="foodResultContainer">'+
						'<h4>' + foodLists.brand_name +  "  " +  foodLists.item_name + '</h4>' +
						'<h5>Calories: <span class="calories">' + foodLists.nf_calories + '</span></h5>' +
						'<h5>Serving Size: ' + foodLists.nf_serving_size_qty + ' ' + foodLists.nf_serving_size_unit +'</h5>' +
					'</div>'
					);
			});
		}
	});
}

function searchValue() {
	var listValue = document.getElementById('searchBar').value;
	callNixApi(listValue);
}

$('#searchForm').submit(function(e) {
	e.preventDefault();
});

$(document).on("click", ".foodResultContainer", function(e) {
	dailyCals += parseInt($(this).find('.calories').text())
	$('.dailyTotal').text('Daily Running Calorie Total: ' + dailyCals)
	$('.resultBox').html('')
})

$(document).on("click", ".yourBeerDisplayBox", function() {
  var yourBeers
  var selectedBeer = document.getElementById("beerChoice").value
  switch (selectedBeer) {
    case "1":
      yourBeers = parseInt((userBMR - dailyCals)/90)
      break;
    case "2":
      yourBeers = parseInt((userBMR - dailyCals)/150)
      break;
    case "3":
      yourBeers = parseInt((userBMR - dailyCals)/180)
      break;
    case "4":
      yourBeers = parseInt((userBMR - dailyCals)/220)
      break;
  }
  $('.yourBeerDisplayBox').text('You earned ' + yourBeers + ' tonight!')
  alert('You get ' + yourBeers + ' today!');
})

$(document).on("click", "#resetButton", function() {
  dailyCals = 0
  $('.dailyTotal').text('Daily Running Calorie Total: ' + dailyCals)
});
