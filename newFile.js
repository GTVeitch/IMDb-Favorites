const myFavorites = []; 
const myLeastFavorites = [];
const movieList = [];
const  movieHistory = [];

const imageHighlight = document.querySelector('#highlight-image')
const titleHighlight = document.querySelector('.highlightTitle')
const ratingHighlight = document.querySelector('#movieRating')
const releaseYear = document.querySelector('#releaseYear')
const movieProfiles = document.querySelector('#movieProfiles')
const historyBar  = document.querySelector('#history')


//API!
// fetch(`https://imdb-api.com/en/API/Top250Movies/k_9m771wic`)
//     .then(response => response.json())
//     .then(movieArray => {
//         movieArray.items.forEach(bob => {
//             createMovieCard(bob);
//         })
//         hightlightSelected(movieArray[0])   
//     })    


//Local JSON
fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(thing => {
        movieList.push(thing)
        //console.log(movieList)
        movieList[0].forEach(items => {
            createMovieCard(items)
        })
        showSelected(movieList[0][0])
        
    })    


function createMovieCard(movieObj) {
    //movieProfile.textContent = ''
        const navItem = document.createElement('img')
        //navItem.innerText = movieObj.title
        navItem.src = movieObj.image
        movieProfiles.append(navItem)
        navItem.addEventListener('click', e => {
            e.preventDefault()
            movieHistory.push(movieObj)
            showSelected(movieObj)
        }
        )
    }





//event listeners to:
// random movies
// add to favorites
// history drop down menu, selected one will merge into it. 
// an add to favorites on  each of the 6 items. 
// create movie 




function showSelected(movieObj) {
    //currentMovie = movieObj
    imageHighlight.src = movieObj.image
    titleHighlight.textContent = movieObj.title
    ratingHighlight.textContent = movieObj.imDbRating
    releaseYear.textContent = movieObj.year
}

function addHistory() {
    const navItem = document.createElement['div']
}
addHistory()