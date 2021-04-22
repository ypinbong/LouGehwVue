import axios from 'axios'

export default {
  async getDeliveryHistory({ commit }, {token}) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/transaction/delivery`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res)
        commit('setDeliveryHistory', res.data.deliveryList)
      })
      .catch((err) => err)
  },
  async addNewDelivery(
    { commit },
    { grandTotal, supName, deliveryDate, itemsList, token }
  ) {
    return await axios({
      method: 'POST',
      url: `${this.$axios.defaults.baseURL}/transaction/delivery`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        supName,
        deliveryDate,
        grandTotal,
        itemsList,
      },
    }).then((res) => {
      commit('addNewDelivery', res.data.result)
      console.log('Adding Delivery Transaction Result:', res.data)
      return res.data
    })
  },
  async getSalesHistory({ commit }, {token}) {
    return await axios({
      method: 'GET',
      url: `${this.$axios.defaults.baseURL}/transaction/sales`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setSalesHistory', res.data.salesList)
      })
      .catch((err) => err)
  },
  async addNewSales({ commit }, { grandTotal, custName, itemsList, token }) {
    return await axios({
      method: 'POST',
      url: `${this.$axios.defaults.baseURL}/transaction/sales`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        custName,
        grandTotal,
        itemsList,
      },
    }).then((res) => {
      commit('addNewSales', res.data.result)
      console.log('Adding Sales Transaction Result:', res.data)
      return res.data
    })
  },
}
