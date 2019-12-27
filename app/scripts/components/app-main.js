import React, {useState, useEffect} from 'react';
import SearchBox from './search';
import Card from './card';

function App() {
    const [movie, setMovie] = useState({
      movieID: 157336, // set initital load movie - Interstellar
    })
    
  // the api request function
  function fetchApi(url) {

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // update state with API data
      setMovie({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path
      })
    })

  } // end function

  function fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    fetchApi(url)
  } // end function

  useEffect(()=> {
    let url = `https://api.themoviedb.org/3/movie/${movie.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
        fetchApi(url)

        //========================= BLOODHOUND ==============================//
        let suggests = new Bloodhound({
          // datumTokenizer argument
          datumTokenizer: function(datum) {
            return Bloodhound.tokenizers.whitespace(datum.value);
          },
          // quertyTokenizer argument
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          
          remote: {
            url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
            filter: function(movies) {
              // Map the remote source JSON array to a JavaScript object array
              return $.map(movies.results, function(movie) {
                return {
                  value: movie.original_title, // search original title
                  id: movie.id // get ID of movie simultaniously
                };
              });
            } // end filter
          } // end remote
        }); // end new Bloodhound

        suggests.initialize(); // initialise bloodhound suggestion engine

        //========================= END BLOODHOUND ==============================//

        //========================= TYPEAHEAD ==============================//
        // Instantiate the Typeahead UI
        $('.typeahead').typeahead({
          hint: true,
          highlight: true,
          minLength: 2
        }, {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
          fetchMovieID(datum.id)
        }); // END Instantiate the Typeahead UI
        //========================= END TYPEAHEAD ==============================//
      },[]) // END COMPONENT DID MOUNT HOOK

      return (
      <div>
        <SearchBox />
        <Card data={movie}/>
      </div>
    )

} // END FUNCTION - APP
module.exports = App;
