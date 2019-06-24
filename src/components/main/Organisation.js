import React from 'react';
import OrgsService from './../service'

class Organisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: false,
      members: [],
      selectedUser: false,
      followers: [],
      follows: []
    }
  }

  handleSelect = (event) => {
    const selected = this.props.searchedOrgs.filter(org=>{
      return event.target.textContent === (org.name || org.login)
    })
    const selectedLogin = selected[0].login;
    if(this.state.selectedOrg === selectedLogin){
      this.setState({
        selectedOrg: false,
        members: []
      })
      return;
    }
    this.setState({
      selectedOrg: selectedLogin,
      members: []
    })
    
    OrgsService.getUsersDetails(selectedLogin)
    .then(data=>{
      if(data.length === 0){
        data = ""
      }
        this.setState({
          members: data
        })
        console.log(data)
      })
    console.log(selectedLogin)
  }

  renderFollowers = () => {
    if(!Array.isArray(this.state.followers)){
      return <p>Sorry, i don't know them</p>
    }
    if(this.state.followers.length === 0){
      return <p>Sorry, i'm searching</p>
    }
    return this.state.followers.map((person, i)=>{
      return (
        <p key={i}>{person.name}</p>
    )})
  }

    renderFollows = () => {
    if(!Array.isArray(this.state.follows)){
      return <p>Sorry, i don't know them</p>
    }
    if(this.state.follows.length === 0){
      return <p>Sorry, i'm searching</p>
    }
    return this.state.follows.map((person, i)=>{
      return (
        <p key={i}>{person.name}</p>
    )})
  }

  renderMembers = () => {
    if(!Array.isArray(this.state.members)){
      return <p>Sorry, i don't know them</p>
    }
    if(this.state.members.length === 0){
      return <p>Sorry, i'm searching</p>
    }
    // emptyArraysCheck(this.state.members);
    return this.state.members.map((member, i)=>{
      return (
        <>
        <div  className="member"
              key={i}>
          <img alt="member avatar" 
                     className="member_avatar"
                     src={member.avatar_url}></img>
          <p onClick={this.handleSelectUser}
             className="member_name">
            {member.name || member.login}
          </p>
        </div>
        {(this.state.selectedUser &&
           this.state.selectedUser === member.login)?(
           <div className="member_info">
              
              <div> followers:{this.renderFollowers()} </div>
              <div> follows:{this.renderFollows()} </div>
           </div>
           ):(" ")}
        </>
    )})
  }

  handleSelectUser = (event) => {
    const selected = this.state.members.filter(member=>{
      return event.target.textContent === (member.name || member.login)
    })
    const selectedLogin = selected[0].login;
    if(this.state.selectedUser === selectedLogin){
      this.setState({
        selectedUser: false,
        followers: [],
        follows: []
      })
      return;
    }
    this.setState({
        selectedUser: selectedLogin
      })
    OrgsService.getFollowDetails(selectedLogin,"followers")
      .then(data=>{
        if(data.length === 0){
          data = ""
        }
          this.setState({
            followers: data
          })
      })

    OrgsService.getFollowDetails(selectedLogin,"following")
      .then(data=>{
        if(data.length === 0){
          data = ""
        }
          this.setState({
            follows: data
          })
      })
  }

  renderSearchedOrgs = () => {
    return this.props.searchedOrgs.map((org, i ) => {
      return (
        <div className="organisation"
             key={i} >
          <h4 className="organisation__name"
              onClick={this.handleSelect}>
            {org.name || org.login}
          </h4>
          {(this.state.selectedOrg &&
           this.state.selectedOrg === org.login)?(
            <div className="org__info">
              <p className="org_description">{org.description}</p>
              <div>Members :{this.renderMembers()}</div>
            </div>)
          :("")}
        </div>
    )});
  }

	render() {
    return(
  		<div className="organisations">
  		  <h1> Organisations </h1>
        {this.renderSearchedOrgs()}
  		</div>
	)}
}

// const emptyArraysCheck = (array) => {
//   if(!Array.isArray(array)){
//       return <p>Sorry, i don't know them</p>;

//     }
//   if(array.length === 0){
//       return <p>Sorry, i'm searching</p>
//     }
// }

export default Organisation;
