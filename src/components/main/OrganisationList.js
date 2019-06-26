import React from 'react';
import OrgsService from './../service';
import MemberList from './MemberList'

class OrganisationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: false,
      members: []
    }
    this.notFound = "Sorry, i can't find";
    this.searching = "Sorry, i'm searching";
  }

  handleSelect = (event) => {
    const selected = this.props.searchedOrgs.filter(org=>{
      return event.target.textContent === org.login
    })
    const selectedLogin = selected[0].login;

    if(this.state.selectedOrg === selectedLogin){
      this.setState({
        selectedOrg: false,
        members: [],
        selectedUser: false,
        followers: false,
        follows: false
      })
      return;
    }
    
    this.setState({
      selectedOrg: selectedLogin,
      members: []
    })
    
    OrgsService.getMembers(selectedLogin)
      .then(data => {
        if(data.length === 0) {
          data = ""
        };
        this.setState({ members: data });
      })
      .catch((error) => ["it's error"]);
  }

  renderSearchedOrgs = () => {
    const {searchedOrgs} = this.props;
    if(!searchedOrgs) {
      return <p>Please enter name of organisation</p>
    }

    if(searchedOrgs && searchedOrgs[0] 
      && searchedOrgs[0].message) {
      return (
        <p>Sorry, it's error: 
          <br></br>
          {searchedOrgs[0].message}
        </p>
    )}

    if(searchedOrgs.length === 0) {
      return <p>{this.notFound}</p> 
    }

    return searchedOrgs.map((org, i ) => {
      return (
        <div className="organisation"
             key={org.id + i} >
          <h2 className="organisation__name click"
              onClick={this.handleSelect}>
            {org.login}
          </h2>
          {(this.state.selectedOrg &&
           this.state.selectedOrg === org.login)?(
            <div className="org__info">
              <h3>Members :
              </h3>
              <MemberList members={this.state.members}/>
            </div>)
          :("")}
        </div>
      )
    });
  }

	render() {
    return(
  		<div className="organisations">
        {this.renderSearchedOrgs()}
  		</div>
	  )
  }
}

export default OrganisationList;
