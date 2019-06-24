const API_URL = 'https://api.github.com';

const OrgsService = {
  async getAll() {
    let result;
    try {
      const response = await fetch(API_URL + '/organizations?page=1&per_page=100');
      result = await response.json();
    } catch (error) {
      result = [];
    }
    return result;
  },
  getById(login) {
    return fetch(API_URL + '/orgs/' + login)
      .then((response) => response.json())
  },
  async getAllDetails(orgs){
    const promises = await orgs.map((org) => OrgsService.getById(org.login));
    return await Promise.all(promises)
  },
  async getMembers(login) {
    let result;
    const response = await fetch(API_URL + '/orgs/' + login + "/members");
    return result = await response.json()
  },
  getUser(login){
    return fetch(API_URL + '/users/' + login)
      .then((response) => response.json())
  },
  async getUsersDetails(login){
    const members = await OrgsService.getMembers(login);
    const promises = await members.map((member) => OrgsService.getUser(member.login));
    return await Promise.all(promises)
  },
  async getFollow(login,follow) {
    let result;
    const response = await fetch(API_URL + '/users/' + login + "/" + follow);
    return result = await response.json()
  },
  async getFollowDetails(login,follow){
    const follows = await OrgsService.getFollow(login,follow);
    const promises = await follows.map((person) => OrgsService.getUser(person.login));
    return await Promise.all(promises)
  }
}
export default OrgsService;
