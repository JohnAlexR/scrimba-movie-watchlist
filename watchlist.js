const watchlist = JSON.parse( localStorage.getItem('watchlist'))

function renderWatchlist() {

    let innerHtml = ''

    if (watchlist.length > 0) {

        watchlist.forEach((film)=> {

            innerHtml += `
            
            <div class="movie">
                                <div class="movie-img">
                                    <img src="${film.Poster}" alt="">
                                </div>
                                <div class="movie-info-container">
                                    <div class="movie-info-title">
                                        <h4>${film.Title}</h4>
                                        <div class="movie-info-rating">
                                            <img src="/images/star.svg" alt="">
                                            <p>${film.Rating}/10</p>
                                        </div>
                                    </div>
                                    <div class="movie-info-middle">
                                        <p>${film.Runtime}</p>
                                        <p>${film.Genre}</p>
                                        <div class="movie-info-add-to-watchlist" data-title="${film.Title}">
                                            <img src="/images/minus.svg" alt="" data-title="${film.Title}">
                                            <p data-title="${film.Title}">Remove</p>
                                        </div>
                                    </div>
                                    <div class="movie-info-body">
                                        <p>${film.Plot}</p>
                                    </div>
                                </div>
                            </div>
            
            `
        })

    } else {
        innerHtml = `
            <div class="placeholder">
                <img src="/images/movie-reel-icon.svg" alt="movie reel">
                <p><a class='placeholder-link' href="index.html">None Yet, Add Some Movies To Your Watchlist</a></p>
            </div>
        `
    }

    
    document.getElementById('movies-watchlist').innerHTML = innerHtml

}

renderWatchlist()


document.addEventListener('click', (e)=> {
    if(e.target.dataset.title) {
        const targetMovieObj = watchlist.filter((movie)=> {
            return movie.Title === e.target.dataset.title
    })[0]

    const index = watchlist.indexOf(targetMovieObj)
    watchlist.splice(index,1)

    localStorage.setItem('watchlist', JSON.stringify(watchlist))

    console.log(localStorage)

    renderWatchlist()

}})

//will need to use local storage to set up tomorrow