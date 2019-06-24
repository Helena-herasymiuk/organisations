import React from 'react';
import Search from './main/Search'
import Organisation from './main/Organisation'
import User from './main/User'
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
    .then(data=>{this.setState({
        orgs: data
      })})
  }

  handleSearch = (event) =>{
    const target =  event.target.value;
    const filtredOrgs = this.state.orgs.filter((org) => {
      return org.login.toLowerCase().includes(target.toLowerCase());
    });
    OrgsService.getAllDetails(filtredOrgs)
      .then(data=>{this.setState({
        searchedOrgs: data
        })
      })
      .catch((error) => {return []});
  };

  render(){
     
	  return(
		  <main className="main">
        <Search handleSearch={this.debounceEvent(this.handleSearch, 500)}/>
        <div> </div>
        <Organisation searchedOrgs={this.state.searchedOrgs}/>
        <User />
		  </main>
	)}
}

export default Main;
