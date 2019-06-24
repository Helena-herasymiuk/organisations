import React from 'react';
import Search from './main/Search'
import OrganisationList from './main/OrganisationList'
import OrgsService from './service'
import utils from './utils'

class Main extends React.Component {
  constructor() {
    super();
    this.state={
      orgs: [],
      searchedOrgs: []
    }
	}

  debounceEvent(...args) {
    this.debouncedEvent = utils.debounce(...args);
    return event => {
      event.persist();
      return this.debouncedEvent(event);
    }
  }

  componentDidMount() {
    OrgsService.getAll()
      .then(data => {
        this.setState({ orgs: data })
      });
  }

  handleSearch = (event) => {
    const value =  event.target.value.toLowerCase();
    const filtredOrgs = this.state.orgs.filter((org) => {
      return org.login.toLowerCase().includes(value);
    });

    OrgsService.getAllDetails(filtredOrgs)
      .then(data => {
        this.setState({ searchedOrgs: data })
      })
      .catch((error) => []);
  };

  render(){   
	  return(
		  <main className="main">
        <Search handleSearch={this.debounceEvent(this.handleSearch, 500)}/>
        <OrganisationList searchedOrgs={this.state.searchedOrgs}/>
		  </main>
	)}
}

export default Main;
