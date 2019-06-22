import React from 'react';
import Search from './main/Search'
import Organisation from './main/Organisation'
import User from './main/User'
import PhonesService from './service'

class Main extends React.Component {
    constructor() {
    super();
    this.state={
      orgs: [],
      searchedOrgs: []
    }
  
	}

  async componentDidMount() {
    const orgs = await PhonesService.getAll()
      this.setState({
        orgs: orgs
      })
  }

  handleSearch = (event) =>{
    const target =  event.target.value;
    const filtredOrgs = this.state.orgs.filter((org) => {
      return org.login.toLowerCase().includes(target.toLowerCase());
    });
    this.setState({
        searchedOrgs: filtredOrgs
    })
  }

  renderSearchedOrgs(){
    const searched = this.state.searchedOrgs;
    return searched.map((org, i ) => <div key={i}>{org.login}</div>);
    console.log(searched)
  }

  render(){
    console.log(this.state.searchedOrgs.login)
	  return(
		  <main>
        <Search handleSearch={this.handleSearch}/>
        <div> {this.renderSearchedOrgs()}</div>
        <Organisation />
        <User />
		  </main>
	)}
}

export default Main;
