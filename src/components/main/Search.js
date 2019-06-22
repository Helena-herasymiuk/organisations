import React from 'react';


function Search(props) {
	return(
		<div>
		  <h1> Search </h1>
      <input type="text"
             onChange={props.handleSearch}>
      </input>
		</div>
	)
}

export default Search;
