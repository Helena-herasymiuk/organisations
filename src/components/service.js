const API_URL = 'https://api.github.com';

const PhonesService = {
  async getAll(query = '') {
    let result;
    try {
      const response = await window.fetch(API_URL + '/organizations?page=1&per_page=100');
      result = await response.json();
    } catch (error) {
      result = [];
    }
    const filteredResult = result.filter((org) => {
      return org.login.toLowerCase().includes(query.toLowerCase());
    });

    return filteredResult;
  },
  getById(id) {
    return window.fetch(API_URL + '/orgs/' + id)
      .then((response) => response.json())
  }
}
export default PhonesService;