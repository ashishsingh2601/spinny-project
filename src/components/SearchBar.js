import React from 'react';

const SearchBar = (props) => {
    return (
        <>
            <form className="search-box-container" onSubmit={props.handleAnimeSearch}>
               <input 
                    className="search-box" 
                    placeholder="Search..." 
                    name="search" 
                    value={props.query}
                    onInput={props.filterAnimes} 
                />
               <button 
                    className="btn btn-transparent search-button" 
                    type="submit" 
                    onClick={props.handleAnimeSearch}
                    >Go
                </button>
            </form>
        </>
    )
}

export default SearchBar
