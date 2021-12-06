import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import Content from './components/Content';
// import { SearchAnimeData } from './components/SearchAnimeData';
// import LoadMore from './components/LoadMore';

const url = "https://api.jikan.moe/v3/search/anime?q=naruto&limit=48";

const App = () => {

  const [animes, setAnimes] = useState([]);
  const [allAnimes, setAllAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(16);
  const [query, setQuery] = useState();

  

  const handleLoadMore = () => {
    setVisible(prevValue => prevValue + 16);
  };

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
        setAllAnimes(transformedAnimesData);
        
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
    setQuery(value);
    const filteredAnimes = allAnimes.filter(
      anime => (`${anime.title}`)
      .toLowerCase()
      .includes(value)
    );
    console.log(event.target.value);
    setAnimes(filteredAnimes);
  };

    const handleAnimeSearch = event =>{
      event.preventDefault();
      fetchAnimesOnSearch(query);
    };

    const fetchAnimesOnSearch = async (animeQuery) => {
      const temp  = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeQuery}&limit=48`)
                          .then(res=>res.json());

            const transformedAnimeSearchData = temp.results.map(item=>{
              return {
                id: item.mal_id,
                title: item.title, 
                imageUrl: item.image_url
              };
            });
            console.log(transformedAnimeSearchData);
            setAnimes(transformedAnimeSearchData);
    };

  return (
    <React.Fragment>
      <SearchBar filterAnimes = {filterAnimes} handleAnimeSearch={handleAnimeSearch} query={query}/>
      <Loading isLoading={isLoading} error={error} url={url}/>
      <Content isLoading={isLoading} error={error} visible={visible} animes={animes} />
      {/* <LoadMore isLoading={isLoading} error={error} /> */}

      {!error && !isLoading && <div className="load-button-container w-100 text-center">
          <button className="load-more-button btn btn-transparent" onClick={handleLoadMore} >Load More...</button> 
        </div>
      }
    </React.Fragment>
  )
}

export default App
