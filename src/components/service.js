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
    // return fetch(API_URL + '/orgs/' + login + "/members")
    //   .then((response) => response.json())
      const response = await fetch(API_URL + '/orgs/' + login + "/members");
      console.log(API_URL + '/orgs/' + login + "/members")
      return result = await response.json()
  },
  getUser(login){
    return fetch(API_URL + '/users/' + login)
      .then((response) => response.json())
  },
  async getUsersDetails(members){
    const promises = await members.map((member) => OrgsService.getUser(member.login));
    return await Promise.all(promises)
  }
}
export default OrgsService;
