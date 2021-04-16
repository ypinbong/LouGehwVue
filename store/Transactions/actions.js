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
            commit("addNewDelivery", res.data.result);
            console.log('Adding Delivery Transaction Result:', res.data);
            return res.data;
        })
    },
    async getSalesHistory({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/transaction/sales`,
        })
        .then(res => {
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
            commit("addNewSales", res.data.result);
            console.log("Adding Sales Transaction Result:", res.data);
            return res.data;
        })
    },
}