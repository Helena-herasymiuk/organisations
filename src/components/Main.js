import React from 'react';
import Search from './main/Search'
import OrganisationList from './main/OrganisationList'
import OrgsService from './service'
import utils from './utils'

class Main extends React.Component {
  constructor() {
    super();
    this.state={ searchedOrgs: false }
	}

  debounceEvent(...args) {
    this.debouncedEvent = utils.debounce(...args);
    return event => {
      event.persist();
      return this.debouncedEvent(event);
    }
  }

  handleSearch = (event) => {
    const value =  event.target.value.toLowerCase();
    OrgsService.searchOrg(value)
      .then(data => {
        this.setState({ searchedOrgs: data })
      })
      .catch((error) => ["it's error"]);
  };

  render(){ 
  console.log(new Date(1561468780*1000)) 
	  return(
		  <main className="main">
        <Search handleSearch={this.debounceEvent(this.handleSearch, 500)}/>
        <OrganisationList searchedOrgs={this.state.searchedOrgs}/>
		  </main>
	)}
}

export default Main;
