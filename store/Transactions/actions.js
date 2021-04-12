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
    async addNewDelivery({ commit },{ grandTotal, supName, deliveryDate, itemsList }) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/transaction/delivery`,
            data: {
                supName,
                deliveryDate,
                grandTotal,
                itemsList
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
    async addNewSales({ commit },{ grandTotal, custName, itemsList }) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/transaction/sales`,
            data: {
                custName,
                grandTotal,
                itemsList
            }
        })
        .then(res => {
            console.log(res);
            commit("addNewSales", res.data.salesList);
        })
    },
}