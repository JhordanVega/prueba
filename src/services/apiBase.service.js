import axios from "axios";
//import DOMAIN_WEB from "@/utils/domainWeb";

const ApiBaseService = axios.create({
  //   baseURL: process.env.VUE_APP_API_BASE,
  //baseURL: DOMAIN_WEB,
  baseURL: 'https://randomuser.me/',
  headers: {
    "Content-type": "application/json",
  },
});

ApiBaseService.interceptors.request.use(function (config) {
  const event = {
  event:  'Requests',
  target: 'apiBase',
  action: 'requests',
  'target-properties': 'label',
  value: config.url.replace(new RegExp("[0-9]+", "g"), "-ID-"),
  'interaction-type': 'noninteraction',
  }
  if(window.dataLayer){
    window.dataLayer.push(event);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default ApiBaseService;

//para obtener items

//getPaginate (obtiene un listado paginado)
//getFind     (obtiene un listado sin paginado, usado para autocompletes)
//getAll      (obtiene un listado sin pagindado, no soporta automplete, ideal para selects)

//Variaciones

//getFindByFact (obtiene un listado sin pagindado, para autocomplete por hecho)
//getFindReduced (obtiene un listado sin paginado reducido, para autocomplete osea {id:'45',nombre:"juan"})
//getAllByFact (obtiene un listado sin pagindado por hecho)
//getAllReduced (obtiene un listado sin paginado reducido, osea {id:'45',nombre:"juan"})
