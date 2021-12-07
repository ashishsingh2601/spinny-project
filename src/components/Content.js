import React from 'react';
import AnimeCard from './AnimeCard';

const Content = (props) => {

    return (
        <>
            <div className="main-anime-card-container">
                <section className="main-container">
                {!props.isLoading && props.animes.length > 0 && 
                    props.animes.map((anime, index)=>{
                    return <AnimeCard animeData = {anime} key = {index} />
                    })
                }
                {!props.isLoading && !props.error && !props.hasSearched && <p 
                                                                                    style={{
                                                                                        color: '#00ff00',
                                                                                        width: '50%',
                                                                                        margin: 'auto', 
                                                                                        textAlign: 'center',
                                                                                        alignItems: 'center',
                                                                                        fontSize: '3rem',
                                                                                        fontFamily: 'sans-serif'
                                                                                    }}>
                                                                                     Search Animes!
                                                                                    </p>
                }
                {!props.isLoading && props.animes.length === 0 && !props.error && props.hasSearched && <p 
                                                                                    style={{
                                                                                        color: '#ff0909',
                                                                                        width: '50%',
                                                                                        margin: 'auto', 
                                                                                        textAlign: 'center',
                                                                                        alignItems: 'center',
                                                                                        fontSize: '3rem',
                                                                                        fontFamily: 'sans-serif'
                                                                                    }}>
                                                                                        No Animes Found!!!
                                                                                    </p>}
                {!props.isLoading && props.error && <p
                                                    style={{
                                                            color: '#ff0909',
                                                            width: '50%',
                                                            margin: 'auto', 
                                                            textAlign: 'center',
                                                            alignItems: 'center',
                                                            fontSize: '3rem',
                                                            fontFamily: 'sans-serif'
                                                       }}>{props.error}</p>}
                </section>
            </div>
        </>
    )
}
export default Content
