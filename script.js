// api key:  54fe24a4
console.log(localStorage.getItem('watchlist'))

const watchlist = JSON.parse( localStorage.getItem('watchlist'))

let movieArray = []
let currentMoviesArray = []

document.getElementById('search-btn').addEventListener('click', handleSearch)
document.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        handleSearch()
    }
});

function handleSearch() {

    document.getElementById('movies').innerHTML = `
        <img src='/images/loading.gif' class='loading'>
    `

    let searchInput = document.getElementById('search-bar').value

    movieArray= []

    getMovieId(searchInput)
}

async function getMovieId(searchInput) {

    let innerhtml = ''
    let currentMovie = {}

    try{

        const res = await fetch(`https://www.omdbapi.com/?apikey=54fe24a4&s=${searchInput}`)
        const data = await res.json()

                await data.Search.forEach((movie) => {
                    movieArray.push(movie.imdbID)})
        
                    for(let i = 0; i < movieArray.length; i++) {
        
                        const response = await fetch(`https://www.omdbapi.com/?apikey=54fe24a4&i=${movieArray[i]}`)
                        const film = await response.json()

                        currentMovie = {
                            Title: film.Title,
                            Poster: film.Poster,
                            Rating: film.imdbRating,
                            Runtime: film.Runtime,
                            Genre: film.Genre,
                            Plot: film.Plot
                        }

                        currentMoviesArray.push(currentMovie)

                                innerhtml += `
                                <div class="movie">
                                    <div class="movie-img">
                                        <img src="${film.Poster}" alt="">
                                    </div>
                                    <div class="movie-info-container">
                                        <div class="movie-info-title">
                                            <h4>${film.Title}</h4>
                                            <div class="movie-info-rating">
                                                <img src="/images/star.svg" alt="">
                                                <p>${film.imdbRating}/10</p>
                                            </div>
                                        </div>
                                        <div class="movie-info-middle">
                                            <p class='runtime'>${film.Runtime}</p>
                                            <p class='genre'>${film.Genre}</p>
                                            <div id='${film.Title}-watchlist'>
                                                <div class="movie-info-add-to-watchlist" data-title="${film.Title}">
                                                    <img src="/images/plus.svg" alt="" data-title="${film.Title}">
                                                    <p data-title="${film.Title}">Watchlist</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="movie-info-body">
                                            <p>${film.Plot}</p>
                                        </div>
                                    </div>
                                </div>
                                `
                            }
                            document.getElementById('movies').innerHTML = innerhtml
                    
    } catch(err) {
        document.getElementById('movies').innerHTML = `
        <div class="placeholder failed">
                <img src="/images/emoticon-sad-outline.svg" alt="movie reel">
                <p>Nothing Found, Try Again.</p>
            </div>
        `
    }   
}
            
document.addEventListener('click', (e)=> {

    if(e.target.dataset.title) {
        const targetMovieObj = currentMoviesArray.filter((movie)=> {
            return movie.Title === e.target.dataset.title
        })[0]
        
        watchlist.push(targetMovieObj)

        document.getElementById(`${e.target.dataset.title}-watchlist`).innerHTML = `
            <div class="movie-info-add-to-watchlist" data-remove="${e.target.dataset.title}">
                <img src="/images/minus.svg" alt="" data-remove="${e.target.dataset.title}">
                <p data-remove="${e.target.dataset.title}">Remove</p>
            </div>`

        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }


    if(e.target.dataset.remove) {

        console.log(e.target.dataset.remove)

        const targetMovieObj = currentMoviesArray.filter((movie)=> {
            return movie.Title === e.target.dataset.remove
        })[0]

        const index = watchlist.indexOf(targetMovieObj)
        watchlist.splice(index, 1)


        document.getElementById(`${e.target.dataset.remove}-watchlist`).innerHTML = `
            <div class="movie-info-add-to-watchlist" data-title="${e.target.dataset.remove}">
                <img src="/images/plus.svg" alt="" data-title="${e.target.dataset.remove}">
                <p data-title="${e.target.dataset.remove}">Watchlist</p>
            </div>`

            localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }

})
