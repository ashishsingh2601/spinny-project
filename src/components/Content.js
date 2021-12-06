import React from 'react';
import AnimeCard from './AnimeCard';

const Content = (props) => {
    return (
        <>
            <div className="main-anime-card-container">
                <section className="main-container">
                {/* <div className="cards-container"> */}

                {!props.isLoading && props.animes.length > 0 && 
                    props.animes.slice(0, props.visible).map((anime, index)=>{
                    return <AnimeCard animeData = {anime} key = {index} />
                    })
                
                /* <AnimeCard animes={animes} />} */
                }
                {!props.isLoading && props.animes.length === 0 && !props.error && <p>No Animes Found!!!</p>}
                {!props.isLoading && props.error && <p>{props.error}</p>}
                </section>
            </div>
        </>
    )
}

export default Content
