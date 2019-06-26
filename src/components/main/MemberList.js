import React from 'react';
import OrgsService from './../service'

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: false,
      followers: false,
      follows: false
    }
    this.notFound = "Sorry, i can't find";
    this.searching = "Sorry, i'm searching";
  }

  handleSelectUser = (event) => {
    const selected = this.props.members.filter(member => {
      return event.target.textContent ===  member.login
    })
    const selectedLogin = selected[0].login;

    if(this.state.selectedUser === selectedLogin) {
      this.setState({
        selectedUser: false,
        followers: false,
        follows: false
      })
      return;
    }

    this.setState({
        selectedUser: selectedLogin,
        followers: false,
        follows: false
      })
  }

  hanndleFollowers = (event) => {
    if(this.state.followers) {
      this.setState({ followers: false })
      return;
    }

    OrgsService.getFollow(this.state.selectedUser,"followers")
      .then(data => {
        if(data.length === 0) {
          data = true
        };
        this.setState({ followers: data })
      })
      .catch((error) => ["it's error"]);
      event.target.nextSibling.textContent = this.searching
  }

  hanndleFollows = (event) => {
    if(this.state.follows) {
      this.setState({ follows: false })
      return;
    }

    OrgsService.getFollow(this.props.selectedUser,"following")
      .then(data => {
        if(data.length === 0) {
          data = true
        };
        this.setState({ follows: data })
      })
      .catch((error) => ["it's error"]);
  }

  renderFollow = (follow) => {
    if(!Array.isArray(follow)) {
      return <p>{this.notFound}</p>
    }
    return follow.map((person, i) => {
      return <p key={person.id + i}>{person.login}</p> 
    })
  }

  renderMembers() {
    const {members} = this.props;
    
    if(!Array.isArray(members)) {
      return <p>{this.notFound}</p>
    }
    if(members.length === 0) {
     return <p>{this.searching}</p> 
    }

    return members.map((member, i) =>{
      return (
        <div  className="member"
              key={member.id + i}>
          <div className="member_main">
            <img alt="member avatar" 
                 className="member_avatar"
                 src={member.avatar_url}></img>
            <p className="member_name click"
              onClick={this.handleSelectUser}>
              {member.login}
            </p>
          </div>
          {(this.state.selectedUser &&
          this.state.selectedUser === member.login)?(
            <div className="member_info">
              <div className="member_followers"> 
                <h4 className="member_followers click"
                    onClick={this.hanndleFollowers}>
                  followers:
                </h4> 
                  {this.state.followers?
                    (this.renderFollow(this.state.followers))
                    :("")}
              </div>
              <div> 
                <h4 className="member_follows click"
                    onClick={this.hanndleFollows}>
                  follows:
                </h4> 
                  {this.state.follows?
                    (this.renderFollow(this.state.follows))
                    :("")}
              </div>
            </div>
          ):(" ")}
      </div>
    )})
  }

  render(){
    return(
      <div className="members">
        {this.renderMembers()}
      </div>
    )
  }
}

export default MemberList;
