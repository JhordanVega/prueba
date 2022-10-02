// helpers
import tableHeaders from "@/helpers/tableHeaders"
import countriesItems from "@/helpers/countriesItems"

// utils
import { extractAndFormatDate } from '@/utils/utilsDate'

const mxUsers = {
  data: () => ({
    loadingItems: false,
    query: { page: 1, limit: 10 },
    where: {},
    pagination: {
      data: [],
      pages: 0,
      perPage: 10,
      total: 0,
    },
    headers: tableHeaders,
  }),
  filters: {
    formatDate(value) {
      return extractAndFormatDate(value)
    },
    translateGender(value){
      if(value === 'male') return 'masculino'
      if(value === 'female') return 'femenino'
      return '-'
    },
    getNationality(value){
      const nat = countriesItems.find(o => o.key === value);
      return nat?nat.value:value
    }
  },
  methods: {
    toFilter(ev) {
      this.where = ev;
      this.query = { ...this.query, page: 1 };
      this.getAllUsers({
        ...this.query,
        where: ev,
      });
    },
    paginate(ev) {
      this.getAllUsers({
        ...this.query,
        page: ev.page,
        limit: ev.itemsPerPage,
        where: this.where,
      });
      this.query = { ...this.query, page: ev.page, limit: ev.itemsPerPage };
    },
    next(page) {
      this.getAllUsers({
        ...this.query,
        page: page,
        where: this.where,
      });
    },
    goToUser(item){
      this.$router.push({ name: 'user', params: item })
    },
  }
};
export default mxUsers;