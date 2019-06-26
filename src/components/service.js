const API_URL = 'https://api.github.com'

const OrgsService = {
  async getMembers (login) {
    let result;
    try {
      const response = await fetch(API_URL + '/orgs/' + login + '/members');
      result = await response.json();
    } catch (error) {
      result = [];
    }
    return result;
  },
  async getFollow (login, follow) {
    let result;
    try {
      const response = await fetch(API_URL + '/users/' + login + '/' + follow);
      result = await response.json();
    } catch (error) {
      result = [];
    }
    return result;
  },
  async searchOrg (login) {
    let result;
    try {
      const response = await fetch(API_URL + '/search/users?q=' + login + '%20type:org');
      result = await response.json()
    } catch (error) {
      result = [];
    }
    return result.items;
  }
}
export default OrgsService
