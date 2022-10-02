import apiBase from "./apiBase.service";

const UserService = {
  getAll(data) {
    let filtros = ''
    if('gender' in data.where) filtros = `&gender=${data.where.gender}`
    if('nat' in data.where) filtros = `${filtros}&nat=${data.where.nat}`

    let path = `api/?exc=login&page=${data.page}&results=${data.limit}`
    if(filtros !== ''){
      path = path + filtros
    }
    return apiBase.get(path);
  },

  getCSV() {
    return apiBase.get(`api/?format=csv`,
    {responseType: 'arraybuffer',headers: {'Content-Type': 'blob'}});
  },

};

export default UserService;
