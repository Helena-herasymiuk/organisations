const API_URL = 'https://api.github.com';

const OrgsService = {
  // async getAll() {
  //   let result;
  //   try {
  //     const response = await fetch(API_URL + '/organizations?page=1&per_page=100');
  //     result = await response.json();
  //   } catch (error) {
  //     result = [];
  //   }
  //   return result;
  // },
  // async getById(login) {
  //   let result;
  //   try {
  //     const response = await fetch(API_URL + '/orgs/' + login);
  //     result = await response.json();
  //   } catch (error) {
  //     result = error;
  //   }
  //   return result;
  // },
  // async getAllDetails(orgs){
  //   const promises = await orgs.map((org) => OrgsService.getById(org.login));
  //   return await Promise.all(promises)
  // },
  async getMembers(login) {
    try {
      const response = await fetch(API_URL + '/orgs/' + login + "/members");
      return await response.json()
    } catch (error) {
      return error;
    } 
  },
  // getUser(login){
  //   return fetch(API_URL + '/users/' + login)
  //     .then((response) => response.json())
  // },
  // async getUsersDetails(login){
  //   const members = await OrgsService.getMembers(login);
  //   const promises = await members.map((member) => OrgsService.getUser(member.login));
  //   return await Promise.all(promises)
  // },
  async getFollow(login,follow) {
    const response = await fetch(API_URL + '/users/' + login + "/" + follow);
    return  await response.json()
  },
  // async getFollowDetails(login,follow){
  //   const follows = await OrgsService.getFollow(login,follow);
  //   const promises = await follows.map((person) => OrgsService.getUser(person.login));
  //   return await Promise.all(promises)
  // },
  async searchOrg(login) {
    let result;
    try {
      const response = await fetch(API_URL + '/search/users?q=' + login + '%20type:org');
      result = await response.json();
    } catch (error) {
      result = [];
    }
    return result.items;
  },
  // async getOrgDetails(login){
  //   const orgs = await OrgsService.searchOrg(login)
  //   const promises = await orgs.map((org) => OrgsService.getById(org.login));
  //   return await Promise.all(promises)
  // }
}
export default OrgsService;
