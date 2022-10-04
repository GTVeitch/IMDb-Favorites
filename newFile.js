const myFavoritesList = []; 
const myLeastFavorites = [];
const movieList = [];
const movieHistory = [];
const shownMovies = [];


const imageHighlight = document.querySelector('#highlight-image')
const titleHighlight = document.querySelector('.highlightTitle')
const ratingHighlight = document.querySelector('#movieRating')
const releaseYear = document.querySelector('#releaseYear')
const movieProfiles = document.querySelector('#movieProfiles')
const historyBar  = document.querySelector('#list')
const newMovieForm = document.querySelector('#newMovie')
const randomButton = document.querySelector('#randomMovies')
const favoritesButton = document.querySelector('#addToFavorites')
const favoritesList = document.querySelector('#myFavorites')



let currentMovie = {};
let movieListLength = 0
let movieHistoryLength = 0



//Need to get done
    //add a alert that doesn't allow ytou to add the movies to the favorites list twice
    //remove from favorites button 
    //history bar 
    //format properly

//Want to get done    
    //myfavorites stays when we refresh the page. 


//API!
// fetch(`https://imdb-api.com/en/API/Top250Movies/k_9m771wic`)
//     .then(response => response.json())
//     .then(thing => {
//         movieList.push(thing.items)
//         movieListLength = movieList[0].length
//         randomMovies()
// })     


//Local JSON
fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(thing => {
        movieList.push(thing)
        movieListLength = movieList[0].length
        randomMovies() 
    }
)    


function createMovieCard(movieObj) {
    currentMovie = movieObj;
    const navItem = document.createElement('span')
    //const space = document.createElement('br')
    const navItem2 = document.createElement('img')
    navItem.innerText = movieObj.title
    navItem2.src = movieObj.image
    navItem.classList.add('movieText')
    navItem2.classList.add('movieCover')
    movieProfiles.append(navItem2)
    //navItem.appendChild(space)
    navItem2.append(navItem)
    navItem2.addEventListener('click', e => {
        e.preventDefault()
        showSelected(movieObj)
        currentMovie = movieObj
        movieHistory.push(movieObj)
        historyList()
        //set the current movie when clicked. 
        }
        )
    }


function randomMovies() {
    //this function clears all the movies from the array
    movieProfiles.innerHTML = ''
    for(const bill = 0;bill < shownMovies.length ; bill){
        shownMovies.pop()
    }
    for(let joe = 0; joe < 3; joe++){
        for(let counter = 0; counter < 5; counter++){

                let thing = parseInt(Math.random() * movieListLength - 1)
                //checks for identicle input
                //in the entire shownMovies Array find the movieList[0][thing]
                while(shownMovies.find(function () {movieList[0][thing]})){
                    thing = parseInt(Math.random() * movieListLength - 1)  
                }
                //movieList[0] is accesting the nested array.
                createMovieCard(movieList[0][thing])
                shownMovies.push(movieList[0][thing])
        }
        const lineBreak = document.createElement('br')
        movieProfiles.append(lineBreak)
    }
    showSelected(shownMovies[0])
    //show random
    //showSelected(movieList[0] [parseInt(Math.random() * movieListLength)])
}
 

function showSelected(movieObj) {
    // ^^^this stores the value of  current movie in the cards. 
    imageHighlight.src = movieObj.image
    titleHighlight.textContent = movieObj.title
    ratingHighlight.textContent = movieObj.imDbRating
    releaseYear.textContent = movieObj.year
}


function randomButtonPower() {
    randomButton.addEventListener('click', e => {
        e.preventDefault()
        randomMovies()
    })
}
randomButtonPower()


function favoritesButtonPower(){
    favoritesButton.addEventListener('click', e => {
        e.preventDefault()
        myFavoritesList.push(currentMovie)
        createFavoriteMovieCard(currentMovie)
        //navItem.textContent = currentMovie.title
    })
}
favoritesButtonPower()


function createFavoriteMovieCard(movieObj) {
        currentMovie = movieObj;
        const navItem = document.createElement('img')
        const navItem2 = document.createElement('ul')

            navItem.src = movieObj.image
            navItem2.innerText = movieObj.title
        favoritesList.append(navItem2)
        navItem2.append(navItem)
        navItem2.addEventListener('click', e => {
            e.preventDefault()
            showSelected(movieObj)
            movieHistory.push(movieObj)
            historyList()
            //set the current movie when clicked. 
            currentMovie = movieObj
        }
    )
}

    
function historyList() {
    movieHistoryLength = (movieHistory.length -1)
    //this line clears the history  
    historyBar.innerHTML = 'History : '

    while(movieHistory.length >= 10) {movieHistory.shift()}

    for(let counter = 0; counter < movieHistoryLength; counter ++) {

        const navItem = document.createElement("span")
            navItem.textContent = movieHistory[counter].title + " | "
            historyBar.appendChild(navItem)
            navItem.addEventListener('click', (e) => {
                e.preventDefault
                showSelected(movieHistory[counter])
            }
        )    
    }
}


//input form 
function addMovie(){
    newMovieForm.addEventListener('submit', e =>{
        e.preventDefault()
        let newMovie = {}
            newMovie.image = e.target['new-image'].value
            newMovie.title = e.target['new-name'].value
            newMovie.imDbRating = e.target['new-rating'].value
            newMovie.year = e.target['new-releaseYear'].value
        shownMovies.pop()
        shownMovies.push(newMovie)
        movieList.push(newMovie)
        let shownMovieLength = (shownMovies.length-1)
        createMovieCard(shownMovies[(shownMovieLength)])
        showSelected(newMovie)
    })

}
addMovie()

//take the entire move list
//run a find on it (depends on the button clicked) 
//take the returned array from find that has a foreach loop that spits it 
//through each card.
//criteria is(>9.0, 8.9, 8.8, 8.7, etc.)