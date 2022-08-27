const ajaxData = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const input = document.querySelector('#search');
const lists = document.querySelector('.lists')
const city = [];

fetch(ajaxData)
.then(blob => blob.json())
.then(data => city.push(...data));

function findMatches(state, cities){
    return cities.filter(place => {
        const regax = new RegExp(state, 'gi')
        return place.city.match(regax) || place.state.match(regax)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayResult(){
    const value = findMatches(this.value, city);
    const html = value.map(place => {
        return `<li>
            <h2>${place.city}, ${place.state}</h2>  
            <h3>${numberWithCommas(place.population)}</h3>  
        </li>`
    }).join('')
    lists.innerHTML = html;
    console.log(value)
}

input.addEventListener('change', displayResult);
input.addEventListener('keyup', displayResult);