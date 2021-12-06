import React from 'react'

const Loading = (props) => {
    return (
        <>
          <div className="loading-container">
            {props.isLoading && <p>
                        <span 
                          style={{color:'rgb(116, 166, 255)', fontSize:'1.2rem', fontFamily:'sans-serif'}}>
                          <strong>Requesting:</strong>
                        </span> {`https://api.jikan.moe/v3/search/anime?q=${props.search}&limit=16&page=${props.page}`}
                      </p>
            }
          </div>
        </>
    )
}
export default Loading
