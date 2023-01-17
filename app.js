const dropdownBtn = document.getElementById("btn");
const dropdownMenu = document.getElementById("dropdown");

// Toggle dropdown function
const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
};

// Toggle dropdown open/close when dropdown button is clicked
dropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});

// Close dropdown when dom element is clicked
document.documentElement.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    toggleDropdown();
  }
});



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34f4484778mshd2593ee8292cea4p135885jsna008ce8ab6ac',
		'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
	}
};

//////////////////// Make ///////////////////
document.addEventListener('click', function(){
    document.getElementById('makesList').classList.remove('show')
    document.getElementById('makesList2').classList.remove('show')
})

function addMake(makes, divId, selectors){

    makes.data.forEach( function(element){
        const makeButton = document.createElement('button')
        makeButton.innerText = element.name;
        makeButton.addEventListener('click', function(){
            document.getElementById(selectors).innerText = element.name
        })
        document.getElementById(divId).append(makeButton)
    } )
}

document.getElementById('makeSelector').addEventListener('click', function(e){
    e.stopPropagation();
    document.getElementById('makesList').classList.toggle('show')
})

fetch('https://car-api2.p.rapidapi.com/api/makes?direction=asc&sort=id', options)
	.then(response => response.json())
	.then(result => {
        addMake(result, 'makesList', 'makeSelector')
        addMake(result, 'makesList2', 'makeSelector2')
    })
	.catch(err => console.log('Something went wrong while getting make list, try again'));

document.getElementById('makeSelector2').addEventListener('click', function(e){
    e.stopPropagation();
    document.getElementById('makesList2').classList.toggle('show')
})

//////////////////// Year ///////////////////
document.addEventListener('click', function(){
    document.getElementById('yearsList').classList.remove('show')
    document.getElementById('yearsList2').classList.remove('show')
})

function addYears(years, whichCar){

    years.forEach(function(element){
        const yearButton = document.createElement('button')
        yearButton.innerText = element;
        yearButton.addEventListener('click', function(){
            if(whichCar === 1){
                document.getElementById('yearSelector').innerText = element
                populateModels(
                    document.getElementById('yearSelector').innerText,
                    document.getElementById('makeSelector').innerText,
                    'modelsList',
                    'modelSelector')
            } else{
                document.getElementById('yearSelector2').innerText = element
                populateModels(
                    document.getElementById('yearSelector2').innerText,
                    document.getElementById('makeSelector2').innerText,
                    'modelsList2',
                    'modelSelector2'
                    )
            }
        })
        if(whichCar === 1){
            document.getElementById('yearsList').append(yearButton)
        } else {
            document.getElementById('yearsList2').append(yearButton)
        }
    } )
}

document.getElementById('yearSelector').addEventListener('click', function(e){
    e.stopPropagation();
    document.getElementById('yearsList').classList.toggle('show')
})

document.getElementById('yearSelector2').addEventListener('click', function(e){
    e.stopPropagation();
    document.getElementById('yearsList2').classList.toggle('show')
})

fetch('https://car-api2.p.rapidapi.com/api/years', options)
	.then(response => response.json())
	.then(result => {
        addYears(result, 1)
        addYears(result, 2)
    })
    .catch(err => {
        alert('Something went wrong while getting year list, try again')
        console.log(err)
    });


//////////////////// Models  ///////////////////

document.addEventListener('click', function(){
    document.getElementById('modelsList').classList.remove('show')
    document.getElementById('modelsList2').classList.remove('show')
})

function addModels(models,modelListDiv, modelSelector){
    console.log(models)
    
    models.data.forEach( function(element){
        const modelButton = document.createElement('button')
        modelButton.innerText = element.name;
        modelButton.addEventListener('click', function(){
            document.getElementById(modelSelector).innerText = element.name
        })
        document.getElementById(modelListDiv).append(modelButton)
    } )
}
    
document.getElementById('modelSelector').addEventListener('click', function(e){
    e.stopPropagation();
    document.getElementById('modelsList').classList.toggle('show')
})

document.getElementById('modelSelector2').addEventListener('click', function(e){
    e.stopPropagation();
    document.getElementById('modelsList2').classList.toggle('show')
})

function populateModels(selectYear, selectedMake, modelListDiv, modelSelector){
    console.log(selectedMake)
    fetch(`https://car-api2.p.rapidapi.com/api/models?verbose=yes&year=${selectYear}&sort=id&make=${selectedMake}&direction=asc`, options)
	.then(response => response.json())
	.then(result => {
        addModels(result, modelListDiv, modelSelector)
    })
	.catch(err => console.error(err));
}



/// engine //// 

// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault()

// const search = document.querySelector('input[type="text"]').value
// fetch(`https://car-api2.p.rapidapi.com/api/engines?make=${selectedMake}&model=${modelSelector}&verbose=yes&year=${selectYear}&direction=asc&sort=id`, options)
// .then(function(response){
//     return response.json();
//  })

// .then(function(data){
//    let placeholder = document.querySelector("#data-output");
//    let out = "";
//    for(let data of data){
//       out += `
//          <tr>
//             <td>${data.engine_type}</td>
//             <td>${data.cylinders}</td>
//             <td>${data.horsepower}</td>
//          </tr>
//       `;
//    }
 
//    placeholder.innerHTML = out;
// });