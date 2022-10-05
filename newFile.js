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
const ratingButtons = document.querySelectorAll('.filterButtons')

//Establish a starting point for these variables. 
let movieListLength = 0
let movieHistoryLength = 0


//see if adding title to  the fetch will work and delete  .items below. We  will see. 
//API!
// fetch(`https://imdb-api.com/en/API/Top250Movies/k_9m771wic`)
//     .then(response => response.json())
//     .then(thing => {
//         movieList.push(thing.items)
//         movieListLength = (movieList[0].length)
//         randomMoviesOnCard()
// })     


//Local JSON
fetch(`http://localhost:3000/items`)
    .then(response => response.json())
    .then(objectData => {
        movieList.push(objectData)
        //assigns the variable an actual value
        movieListLength = (movieList[0].length)
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
    movieProfiles.appendChild(navItem /*, navItem3*/)
    //Add it all to the movie profiles section of the HTML
    navItem.append(navItem2)
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
    for(const counter1 = 0; counter1 < shownMovies.length ; counter1){
        shownMovies.pop()
    }
    for(let counter3 = 0; counter3 < 25; counter3++){

            let randomNumber = parseInt(Math.random() * movieListLength)
            let duplicates = false
            //checks for identicle input
            //in the entire shownMovies Array find the movieList[0][thing]

            do{
                //establish a new random #, we need that number within out loop. 
                //set it as true so the repeat condition is not met
                duplicates = false
                //make a new random
                randomNumber = parseInt(Math.random() * movieListLength)
                //check if the movie  title is not the  same as the random title 
                shownMovies.forEach(movie => {
                    //if the random title is not the same, nothing happens 
                    switch(movie.title === movieList[0][randomNumber].title){
                        case (true):
                            duplicates = true
                            break;
                        //if a bug occurs or the random  title exists in our list,
                        //then the repeat condition is met.
                        default:
                            
                            break;
                        }
                    }
                        
                )
                //repeat condition 
            } while (duplicates === true)
            

            //movieList[0] is accesting the nested array.
            createMovieCard(movieList[0][randomNumber])
            shownMovies.push(movieList[0][randomNumber])
        }
    
    showSelectedCard(shownMovies[0])
}

function showSelectedCard(movieObj) {
    currentMovie = movieObj
    imageHighlight.src = movieObj.image
    titleHighlight.textContent = movieObj.title
    ratingHighlight.textContent = movieObj.imDbRating
    releaseYear.textContent = movieObj.year
}

function createFavoriteMovieCard(movieObj) {
    currentMovie = movieObj;
    const navItem = document.createElement('img')
    const navItem2 = document.createElement('div')
    const navItem3 = document.createElement('button')
        navItem.src = movieObj.image
        navItem.classList.add('movieCover')
        navItem2.innerText = movieObj.title
        navItem.classList.add("movieText")
        navItem3.textContent = "Unfavorite"
    favoritesList.append(navItem2)
    navItem2.append(navItem)
    navItem2.append(navItem3)
    navItem.addEventListener('click', e => {
        e.preventDefault()
        showSelectedCard(movieObj)
        movieHistory.push(movieObj)
        historyList()
        //set the current movie when clicked. 
        currentMovie = movieObj
    })
    navItem3.addEventListener('click', e => {
        e.preventDefault()
        // in my favs, destructivly remove, (find in the list the first movie
        //that  has a title  equal to a movie in the movie object list) 
        myFavoritesList.splice(myFavoritesList.find(movie => movie.title = movieObj.title))
        navItem2.remove()
        //make it remove from favorite list. Not needed here necesarily. 
    })
}

function favoritesButtonPower(){
    favoritesButton.addEventListener('click', e => {
        e.preventDefault()
        let duplicates = false
        myFavoritesList.forEach(movie => {
            switch(movie.title === currentMovie.title){
                case(true):    
                    duplicates = true
                    alert("You already have that movie in your favorites list.")
                    break;
                default:
                    //is basically saying case false 
                    break;
            }
        })    
        if(duplicates === false) {
            myFavoritesList.push(currentMovie)
            createFavoriteMovieCard(currentMovie)
        }       
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
            //newMovie.imDbRating = e.target['new-rating'].value
            newMovie.imDbRating = '9.2'
            newMovie.year = e.target['new-releaseYear'].value
        shownMovies.pop()
        shownMovies.push(newMovie)
        movieList[0].push(newMovie)
        movieListLength = (movieList[0].length)
        //redefines show movie length
        shownMovieLength = (shownMovies.length-1)
        //print oujt the last thing, which is the newly submitted movie
        //and we push(),  thats why its at the end. 
        createMovieCard(shownMovies[(shownMovieLength)])
        showSelectedCard(newMovie)
    })

}
addMovie()

//now need to take the text value of the button and 
        //pass the text value to a function and in that function 
        //we will filter through all of movies for the rating 
        //equal to the selected one and we will get it returned in an array. 
function ratingButtonPower(){
    for (let counter = 0; counter <= 12; counter++) { 
        ratingButtons[counter].addEventListener('click', e => {
            e.preventDefault()
            searchMovieList(e.target.innerText)
        })
    }
}
ratingButtonPower()


function searchMovieList(ratingInput){
    //this will search through the movie list array  
    //and pull out  all the ones that match that rating. return that array. 
    let filteredMovies = movieList[0].filter(movie => {return movie.imDbRating.includes(ratingInput)})
    movieProfiles.innerHTML = ''
    filteredMovies.forEach(movie => {createMovieCard(movie)})
    showSelectedCard(filteredMovies[0])
}
    






//take the entire move list
//run a find on it (depends on the button clicked) 
//take the returned array from find that has a foreach loop that spits it 
//through each card.
//criteria is(>9.0, 8.9, 8.8, 8.7, etc.)

//couldn't i make a loop function that selects all of the items with 9.1,9,0 etc. 
//as a switch or a else if (need to look up which)


//Need to get done:
    //format properly

//Want to get done:    
    //myfavorites stays when we refresh the page. 
    //add a input form in the highlight section, where
    //   you can make notes and also give a movie your personal rating. 
    //   data
