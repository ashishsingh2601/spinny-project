import React, {useState, useEffect, useCallback, useRef} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import Content from './components/Content';

const App = () => {

    const [animes, setAnimes] = useState([]);
    const [allAnimes, setAllAnimes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState();
    const [hasSearched, setHasSearched] = useState(false);
    
    const prevSearch = usePrevious(search);

    //custom hook to persist the previous search value
    function usePrevious(value){
      const ref = useRef();
      useEffect(()=>{
        ref.current = value;
      });
      return ref.current;
    }
    
    //executes whenever search query changes
    useEffect(()=>{
      if(prevSearch !== search){
        clearState();
      }
    }, [prevSearch, search]);

    //resets page number to 1 if search query changes
    const clearState = ()=>{
      setPage(1);
    };

    //fetches animes from api based on search query and page number 
    const fetchAnimesOnSearch = useCallback(async (animeQuery, page) => {
      setIsLoading(true);
      setError(null);
      try{
      const response  = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeQuery}&limit=16&page=${page}`);
          if(!response.ok){
            throw new Error("Something went wrong!!!");
          }                    
        const data = await response.json();

            const transformedAnimeSearchData = data.results.map(item=>{
              return {
                id: item.mal_id,
                title: item.title, 
                imageUrl: item.image_url
              };
            });
            console.log("transformed", transformedAnimeSearchData);
            setAnimes(animes => [...animes, ...transformedAnimeSearchData]);
            setAllAnimes(transformedAnimeSearchData);
      }catch(error){
        setError(error.message);
      }
      setIsLoading(false);
    }, []);

  //searches animes when user press enter or click Go button after entering search query
  const handleAnimeSearch = event =>{
      event.preventDefault();
      console.log(search);
      fetchAnimesOnSearch(search, page);
  };

  //responsible for loading more animes on clicking (load more...)
  const loadMoreAnimes = () =>{
    setPage(prevPage => prevPage + 1);
    fetchAnimesOnSearch(search, page);
  };

  //filtering animes from the loaded animes (based on current entered value) 
  const filterAnimes = event =>{
    event.preventDefault();
    const value = event.target.value.toLowerCase();
    if(value){
      setHasSearched(true);
    }
    const filteredAnimes = allAnimes.filter(
      anime => (`${anime.title}`)
      .toLowerCase()
      .includes(value)
    );
    console.log(event.target.value);
    setAnimes(filteredAnimes);
  };
  return (
    <React.Fragment>
    <div className="body-container">
      <div className="header">
        <SearchBar filterAnimes={filterAnimes} handleAnimeSearch={handleAnimeSearch} search={search} clearState={clearState} setSearch={setSearch}/>
        <Loading isLoading={isLoading} error={error} search={search} page={page}/>
      </div>
      <Content isLoading={isLoading} error={error} animes={animes} hasSearched={hasSearched} setAnimes={setAnimes}/>
      {!error && !isLoading && hasSearched &&<div className="load-button-container w-100 mt-6 text-center">
          <button className="load-more-button btn btn-transparent" onClick={loadMoreAnimes} >Load More...</button> 
        </div>
      }
      </div>
    </React.Fragment>
  )
}
export default App
