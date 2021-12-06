// import React, {useEffect, useState} from 'react';
// import axios from 'axios';

// const SearchAnimeData = (value) => {

//     const [state, setState] = useState([]);
//     const [animes, setAnimes] = useState([]);
//     const [allAnimes, setAllAnimes] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [visible, setVisible] = useState(16);

//     // useEffect(() => {
//     //   setIsLoading(true);
//     //   setError(null);
//     //   try{
//     //     const response =  fetch("https://api.jikan.moe/v3/search/anime?q="+value+"&limit=48");
//     //       if(!response.ok){
//     //         throw new Error("Something went wrong!!!");
//     //       }
//     //     const data =  response.json();
//     //     const transformedAnimesData = data.results.map(animeData => {
//     //     return {
//     //       id: animeData.mal_id,
//     //       title: animeData.title, 
//     //       imageUrl: animeData.image_url
//     //     };
//     //   });
//     //     console.log(transformedAnimesData);
//     //     setAnimes(transformedAnimesData);
//     //     setAllAnimes(transformedAnimesData);
        
//     //   }catch(error){
//     //       setError(error.message);
//     //   }
//     //   setIsLoading(false);
        
//     // }, [value]);
//     useEffect(()=>{
//         axios
//             .get("https://api.jikan.moe/v3/search/anime?q="+value+"&limit=48")
//             .then((data)=>{
//                 console.log(data.results);
//             });

//     }, [value]);
//     return state;
    
// }

// export {SearchAnimeData}
