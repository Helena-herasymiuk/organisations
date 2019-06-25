import React from 'react';
import OrgsService from './../service'

class OrganisationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: false,
      members: [],
      selectedUser: false,
      followers: [],
      follows: []
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

  handleSelectUser = (event) => {
    const selected = this.state.members.filter(member => {
      return event.target.textContent ===  member.login
    })
    const selectedLogin = selected[0].login;
    if(this.state.selectedUser === selectedLogin) {
      this.setState({
        selectedUser: false,
        followers: [],
        follows: []
      })
      return;
    }
    this.setState({
        selectedUser: selectedLogin,
        followers: [],
        follows: []
      })

    OrgsService.getFollow(selectedLogin,"followers")
      .then(data => {
        if(data.length === 0) {
          data = ""
        };
        this.setState({ followers: data })
      })
      .catch((error) => ["it's error"]);

    OrgsService.getFollow(selectedLogin,"following")
      .then(data => {
        if(data.length === 0) {
          data = ""
        };
        this.setState({ follows: data })
      })
      .catch((error) => ["it's error"]);
  }

  renderFollow = (follow) => {
    if(!Array.isArray(follow)) {
      return <p>{this.notFound}</p>
    }
    if(follow.length === 0) {
      return <p>{this.searching}</p>  
    }
    return follow.map((person, i) => {
      return <p key={person.id + i}>{person.login}</p> 
    })
  }

  renderMembers = () => {
    const {members} = this.state;
    if(!Array.isArray(members)) {
      return <p>{this.notFound}</p>
    }
    if(members.length === 0) {
     return <p>{this.searching}</p> 
    }
    return members.map((member, i) => {
      return (
        <div  className="member"
              key={member.id + i}>
          <div className="member_main">
            <img alt="member avatar" 
                 className="member_avatar"
                 src={member.avatar_url}></img>
            <p className="member_name"
              onClick={this.handleSelectUser}>
              {member.login}
            </p>
          </div>
          {(this.state.selectedUser &&
          this.state.selectedUser === member.login)?(
            <div className="member_info">
              <div className="member_followers"> 
                <h4> followers:
                </h4> 
                {this.renderFollow(this.state.followers)}
              </div>
              <div> 
                <h4> follows:
                </h4> 
                {this.renderFollow(this.state.follows)}
              </div>
            </div>
          ):(" ")}
      </div>
    )})
  }

  renderSearchedOrgs = () => {
    const {searchedOrgs} = this.props;
    if(!searchedOrgs){
      return <p>Please enter name of organisation</p>
    }
    if(searchedOrgs && searchedOrgs[0] 
      && searchedOrgs[0].message){
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
          <h2 className="organisation__name"
              onClick={this.handleSelect}>
            {org.login}
          </h2>
          {(this.state.selectedOrg &&
           this.state.selectedOrg === org.login)?(
            <div className="org__info">
              <p className="org_description">
              {org.description}
              </p>
              <div className="members">
                <h3>Members :
                </h3>
                {this.renderMembers()}
              </div>
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
