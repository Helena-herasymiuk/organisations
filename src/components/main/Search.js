import React from 'react';

function Search(props) {
	return(
		<div className="search"> 
		  <h1> Search </h1>
      <input type="text"
             onChange={props.handleSearch}
             autoFocus>
      </input>
		</div>
	)
}

export default Search;
