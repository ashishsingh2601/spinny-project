import React from 'react'

const Loading = (props) => {
    return (
        <>
            {props.isLoading && <p style={{width: '100%', color: '#fff', marginLeft: '27rem'}}>
                        <span 
                          style={{color:'rgb(116, 166, 255)', fontSize:'1.2rem', fontFamily:'sans-serif'}}>
                          <strong>Requesting:</strong>
                        </span> {`https://api.jikan.moe/v3/search/anime?q=${props.animeQuery}&limit=48`}
                      </p>
            }
        </>
    )
}
export default Loading
