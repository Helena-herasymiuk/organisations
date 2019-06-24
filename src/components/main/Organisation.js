import React from 'react';
import OrgsService from './../service'

class Organisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: false,
      members: []
    }
  }

  handleSelect = (event) => {
    const selected = this.props.searchedOrgs.filter(org=>{
      return event.target.textContent === (org.name || org.login)
    })
    const selectedLogin = selected[0].login;
    this.setState({
      selectedOrg: selectedLogin
    })
    
    OrgsService.getMembers(selectedLogin)
    .then(data=>{
        this.setState({
          members: data
        })
        console.log(data)
      })
    console.log(selectedLogin)
  }

  renderMembers = () => {
  //   OrgsService.getMembers()
  console.log(this.state.members)
  return this.state.members.map((member, i)=>{
      return <p>{member.login}</p>
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
              <div>{this.renderMembers()}</div>
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

export default Organisation;
