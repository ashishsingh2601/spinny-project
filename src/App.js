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
  const [visible, setVisible] = useState(16);
  // const [limit, setLimit] = useState(16);
  
    const prevSearch = usePrevious(search);
    // const prevLimit = usePreviousLimit(limit);

    const handleAnimeSearch = event =>{
      event.preventDefault();
      console.log(search);
      fetchAnimesOnSearch(search, page);
    };

    // function usePreviousLimit(value){
    //   const limitRef = useRef();
    //   useEffect(()=>{
    //     limitRef.current = value;
    //   });
    //   return limitRef.current;
    // }
    // useEffect(()=>{
      
    // }, [prevLimit, limit]);

    function usePrevious(value){
      const ref = useRef();
      useEffect(()=>{
        ref.current = value;
      });
      return ref.current;
    }

    useEffect(()=>{
      if(prevSearch !== search){
        clearState();
      }
    }, [prevSearch, search]);

    const clearState = ()=>{
      setPage(1);
      // setLimit(16);
    };

    const fetchAnimesOnSearch = useCallback(async (animeQuery, page) => {
      setIsLoading(true);
      setError(null);
      try{
      const response  = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeQuery}&limit=16&page=${page}`)
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
            console.log(transformedAnimeSearchData);
            setAnimes(transformedAnimeSearchData);
            setAllAnimes(transformedAnimeSearchData);
            
            // setAnimes(animes=>[...animes, transformedAnimeSearchData]);
            // setAllAnimes(allAnimes=>[...allAnimes, transformedAnimeSearchData]);
      }catch(error){
        setError(error.message);
      }
      setIsLoading(false);
    }, []);

  const loadMoreAnimes = () =>{
    setPage(prevPage => prevPage + 1);
    // setLimit(prevLimit => prevLimit + 16);
    // console.log(limit);
    fetchAnimesOnSearch(search, page);
  };


  const filterAnimes = event =>{
    event.preventDefault();
    const value = event.target.value.toLowerCase();
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
      <Content isLoading={isLoading} error={error} visible={visible}  animes={animes} setAnimes={setAnimes}/>
      {!error && !isLoading && <div className="load-button-container w-100 mt-6 text-center">
          <button className="load-more-button btn btn-transparent" onClick={loadMoreAnimes} >Load More...</button> 
        </div>
      }
      </div>
    </React.Fragment>
  )
}

export default App
