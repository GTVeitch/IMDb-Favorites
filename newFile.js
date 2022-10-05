//Establish empty arrays/objects to store various objects in wehen we need to
const myFavoritesList = []; 
const movieList = [];
const movieHistory = [];
const shownMovies = [];
let currentMovie = {};

//Establish variables to target areas of HTML that
//we add Javascript Functionality to represent the data in. 
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

//Establish a starting point for these variables. 
let movieListLength = 0
let movieHistoryLength = 0


//see if adding title to  the fetch will work and delete  .items below. We  will see. 
//API!
// fetch(`https://imdb-api.com/en/API/Top250Movies/k_9m771wic`)
//     .then(response => response.json())
//     .then(thing => {
//         movieList.push(thing.items)
//         movieListLength = movieList[0].length
//         randomMoviesOnCard()
// })     


//Local JSON
fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(objectData => {
        movieList.push(objectData)
        //assigns the variable an actual value
        movieListLength = movieList[0].length
        randomMovieOnCard() 
    }
)    


function createMovieCard(movieObj) {
    //establishing individual entities 
    currentMovie = movieObj;
    //Nav item 1: create and add text content
    const navItem = document.createElement('span')
    navItem.innerText = movieObj.title
    navItem.classList.add('movieText')
    //Nav item 2: create and add image content
    const navItem2 = document.createElement('img')
    navItem2.src = movieObj.image
    navItem2.classList.add('movieCover')
    //Nav item 3: create and add a highlight button
    // const navItem3 = document.createElement('button')
    // navItem3.innerText = 'Learn More!'
    // navItem3.classList.add('movieButton')
    //Add the span, nested within the img. 
    navItem2.append(navItem /*, navItem3*/)
    //Add it all to the movie profiles section of the HTML
    movieProfiles.append(navItem2)
    //functionality for the individual movie cards. 
    navItem2.addEventListener('click', e => {
        e.preventDefault()
        //add the card to the movie highlight area
        showSelectedCard(movieObj)
        //establishing individual entities 
        currentMovie = movieObj
        //to then add the individual movie name to the history section
        movieHistory.push(movieObj)
        historyList()
        }
    )
    //if we want the buttons to be the only way to get a movie in the lightlight section
    // navItem3.addEventListener('click', e=> {
    //     e.preventDefault()
    //     showSelectedCard(movieObj)
    //     }
    //     )    
}

//need to remove duplicates
function randomMovieOnCard() {
    //this line clears all the movies from the array
    movieProfiles.innerHTML = ''
    for(const counter1 = 0;counter1 < shownMovies.length ; counter1){
        shownMovies.pop()
    }
    for(let counter2 = 0; counter2 < 3; counter2++){
        for(let counter3 = 0; counter3 < 5; counter3++){

                let randomNumber = parseInt(Math.random() * movieListLength - 1)
                //checks for identicle input
                //in the entire shownMovies Array find the movieList[0][thing]
                while(shownMovies.find(function () {movieList[0][randomNumber]})){
                    randomNumber = parseInt(Math.random() * movieListLength - 1)  
                }
                //movieList[0] is accesting the nested array.
                createMovieCard(movieList[0][randomNumber])
                shownMovies.push(movieList[0][randomNumber])
        }
        const lineBreak = document.createElement('br')
        movieProfiles.append(lineBreak)
    }
    showSelectedCard(shownMovies[0])
    //show random
    //showSelectedCard(movieList[0] [parseInt(Math.random() * movieListLength)])
}

function showSelectedCard(movieObj) {
    imageHighlight.src = movieObj.image
    titleHighlight.textContent = movieObj.title
    ratingHighlight.textContent = movieObj.imDbRating
    releaseYear.textContent = movieObj.year
}

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
        showSelectedCard(movieObj)
        movieHistory.push(movieObj)
        historyList()
        //set the current movie when clicked. 
        currentMovie = movieObj
    }
)
}

function favoritesButtonPower(){
    favoritesButton.addEventListener('click', e => {
        e.preventDefault()
        myFavoritesList.push(currentMovie)
        createFavoriteMovieCard(currentMovie)
        //navItem.textContent = currentMovie.title
    })
}
favoritesButtonPower()

function randomButtonPower() {
    randomButton.addEventListener('click', e => {
        e.preventDefault()
        randomMovieOnCard()
    })
}
randomButtonPower()

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
                showSelectedCard(movieHistory[counter])
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
        showSelectedCard(newMovie)
    })

}
addMovie()


//take the entire move list
//run a find on it (depends on the button clicked) 
//take the returned array from find that has a foreach loop that spits it 
//through each card.
//criteria is(>9.0, 8.9, 8.8, 8.7, etc.)

//couldn't i make a loop function that selects all of the items with 9.1,9,0 etc. 
//as a switch or a else if (need to look up which)


//Need to get done:
    //add a alert that doesn't allow ytou to add the movies to the favorites list twice
    //no duplicate random cards 
    //remove from favorites: button 
    //history bar 
    //format properly
    //event listeners to 9.1, etc. buttons  

//Want to get done:    
    //myfavorites stays when we refresh the page. 
    //add a input form in the highlight section, where
    //   you can make notes and also give a movie your personal rating. 
    //   data