import React from 'react';

const SearchBar = (props) => {
    return (
        <>
            <form className="search-box-container" onSubmit={props.handleAnimeSearch}>
               <input 
                    className="search-box" 
                    placeholder="Search..."
                    required 
                    name="search" 
                    value={props.search}
                    onInput={props.filterAnimes} 
                    onChange={e=>props.setSearch(e.target.value)}
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
