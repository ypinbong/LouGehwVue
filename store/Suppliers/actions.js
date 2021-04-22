import axios from 'axios'

export default {
  async getSuppliers({ commit }, { token }) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/suppliers/list`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setSupplier', res.data.suppliersList)
        // console.log("testCustomer", res.data.view);
        // return res.data;
      })
      .catch((err) => err)
  },
  async addNewSupplier({ commit }, { supName, supAddress, supContact, token }) {
    return await axios({
      method: 'POST',
      url: `${this.$axios.defaults.baseURL}/suppliers/list`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        supName,
        supContact,
        supAddress,
      },
    }).then((res) => {
      console.log(res)
      commit('addNewSupplier', res.data.result)
      console.log('testSupplier', res.data.result)
      return res.data
    })
  },
  async editSupplier(
    { commit },
    { supid, supName, supContact, supAddress, supStatus, token }
  ) {
    return await axios({
      method: 'PATCH',
      url: `${this.$axios.defaults.baseURL}/suppliers/list/${supid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        supid,
        supName,
        supAddress,
        supContact,
        supStatus,
        token,
      },
    }).then((res) => {
      console.log('supnew', res.data.result)
      commit('editSupplier', res.data.result.product)
      return res.data
    })
  },
}
