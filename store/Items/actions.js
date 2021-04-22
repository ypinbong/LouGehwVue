import axios from 'axios';

export default{
    async getItems({ commit }, {token}) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/items/list`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            commit("setItems", res.data.itemsList);
            // console.log("testCustomer", res.data.view);
            // return res.data;
        })
        .catch(err => err);
    },
    async addNewItem({ commit },{ name, barcode, description, supName, price, quantity, token }) {  
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/items/list`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                name,
                barcode,
                description,
                supName,
                price,
                quantity,
            }
        })
        .then(res => {
            commit("addNewItem", res.data.result);
            console.log("addNewItem", res.data.result);
            return res.data;
        })
    },
    async editItem({ commit }, { id, name, barcode, description, supName,  price, quantity, token }) {
        return await axios({
            method: "PATCH",
            url: `${this.$axios.defaults.baseURL}/items/list/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id,
                name,
                barcode,
                description,
                supName,
                price,
                quantity,
            }
            })
            .then(res => {
                console.log("Item Edit Result:", res);
                commit("editItem", res.data.result.product);
                return res.data;
            })
    }
}