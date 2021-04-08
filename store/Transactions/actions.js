import axios from 'axios';

export default{
    async getDeliveryHistory({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/transaction/delivery`,
        })
        .then(res => {
            console.log(res);
            commit("setDeliveryHistory", res.data.deliveryList);
        })
        .catch(err => err);
    },
    async addNewDelivery({ commit },{ grandTotal, supid, deliveryDate }) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/transaction/delivery`,
            data: {
                grandTotal,
                supid,
                deliveryDate
            }
        })
        .then(res => {
            console.log(res);
            commit("addNewDelivery", res.data.deliveryList);
        })
    },
    async getSalesHistory({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/transaction/sales`,
        })
        .then(res => {
            console.log(res);
            commit("setSalesHistory", res.data.salesList);
        })
        .catch(err => err);
    },
    async addNewSales({ commit },{ grandTotal, custid, date }) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/transaction/sales`,
            data: {
                grandTotal,
                custid,
                date
            }
        })
        .then(res => {
            console.log(res);
            commit("addNewSales", res.data.salesList);
        })
    },
}