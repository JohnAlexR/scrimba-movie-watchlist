// api key:  54fe24a4

let movieArray = []

document.getElementById('search-btn').addEventListener('click', async ()=> {

    console.log('clicked')

    document.getElementById('movies').innerHTML = `
        <img src='/images/loading.gif' class='loading'>
    `

    let searchInput = document.getElementById('search-bar').value

    movieArray= []

    getMovieId(searchInput)

    //will need to figure out how to put +'s between search input result
})

async function getMovieId(searchInput) {

    let innerhtml = ''

    const res = await fetch(`http://www.omdbapi.com/?apikey=54fe24a4&s=${searchInput}`)
    const data = await res.json()

            await data.Search.forEach((movie) => {
                movieArray.push(movie.imdbID)})
    
                for(let i = 0; i < movieArray.length; i++) {
    
                    const response = await fetch(`http://www.omdbapi.com/?apikey=54fe24a4&i=${movieArray[i]}`)
                    const film = await response.json()

                    console.log(film)

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
                                        <p>${film.Runtime}</p>
                                        <p>${film.Genre}</p>
                                        <div class="movie-info-add-to-watchlist">
                                            <img src="/images/plus.svg" alt="">
                                            <p>Watchlist</p>
                                        </div>
                                    </div>
                                    <div class="movie-info-body">
                                        <p>${film.Plot}</p>
                                    </div>
                                </div>
                            </div>
                            `

                            console.log(innerhtml)
                        }
                        document.getElementById('movies').innerHTML = innerhtml
                }
            
