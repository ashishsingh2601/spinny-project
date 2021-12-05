import React, {useState, useEffect, useCallback} from 'react';
import AnimeCard from './components/AnimeCard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const url = "https://api.jikan.moe/v3/search/anime?q=naruto&limit=16";

const App = () => {

  const [animes, setAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    const fetchAnimes  = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try{
        const response = await fetch(url);
          if(!response.ok){
            throw new Error("Something went wrong!!!");
          }
        const data = await response.json();
        const transformedAnimesData = data.results.map(animeData => {
        return {
          id: animeData.mal_id,
          title: animeData.title, 
          imageUrl: animeData.image_url
        };
      });
        console.log(transformedAnimesData);
        setAnimes(transformedAnimesData);
        
      }catch(error){
          setError(error.message);
      }
      setIsLoading(false);
    }, []);
  
  
    useEffect(()=>{
      fetchAnimes();
    }, [fetchAnimes]);
    
  
  const filterAnimes = event =>{
    event.preventDefault();
    const value = event.target.value.toLowerCase();
    // const filteredAnime = 
    console.log(event.target.value);
  };



  return (
    <React.Fragment>
    <form className="search-box-container">
      <input className="search-box" placeholder="Search..." name="search" onInput={filterAnimes}/>
      <button className="btn btn-secondary search-button" type="submit">Go</button>
    </form>
      <section className="main-container">
        {/* <div className="cards-container"> */}

        {!isLoading && animes.length > 0 && 
          animes.map((anime, index)=>{
            return <AnimeCard animeData = {anime} key = {index} />
          })
        
        /* <AnimeCard animes={animes} />} */
        }
        {!isLoading && animes.length === 0 && !error && <p>No Animes Found!!!</p>}
        {isLoading && <p style={{
                          
                          width: '100%',
                          color: '#fff',
                          marginLeft: '27rem' 
                          
                          


                                      }}>
        Requesting: https://api.jikan.moe/v3/search/anime?q=naruto&limit=16</p>}
        {!isLoading && error && <p>{error}</p>}
        {/* </div> */}
        {/* <div className="load-button-container w-100 text-center">
          <button className="load-more-button btn btn-transparent" type="submit">Load More...</button> 
        </div> */}
      </section>
      <div className="load-button-container w-100 text-center">
          <button className="load-more-button btn btn-transparent" type="submit">Load More...</button> 
        </div>
      
    </React.Fragment>
  )
}

export default App
