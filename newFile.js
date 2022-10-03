const myFavorites = []; 
const myLeastFavorites = [];
let movieList = [];

fetch(`https://imdb-api.com/en/API/Top250Movies/k_9m771wic`)
    .then(response => response.json())
    .then(data => movieList.push(data))
    .then(console.log(movieList))

    

// let navBar = document.querySelector('#list')  
// function newFunction() {
//     navBar.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log('you mad it')
// })}

// newFunction()