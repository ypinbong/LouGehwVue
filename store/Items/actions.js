import axios from 'axios';

export default{
    async loadCustomers({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/customers/list`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // }
        })
        .then(res => {
            console.log(res);
            commit("setCustomer", res.data.customersList);
            // console.log("testCustomer", res.data.view);
            // return res.data;
        })
        .catch(err => err);
    },
    async addCustomer({ commit },{ custName, custAddress, custContact, custStatus }) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/customers/list`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // }
            data: {
                custName,
                custContact,
                custAddress,
                custStatus
            }
        })
        .then(res => {
            console.log(res);
            commit("addCustomer", res.data.customersList);
            // console.log("testCustomer", res.data.view);
            // return res.data;
        })
    },
    async editCustomer({ commit }, { custid, custName, custAddress, custContact, custStatus }) {
        return await axios({
            method: "PATCH",
            url: `${this.$axios.defaults.baseURL}/customers/list/${custid}`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // },
            data: {
                custid,
                custName,
                custContact,
                custAddress,
                custStatus
            }
            })
            .then(res => {
                // console.log("supnew", res);
                commit("editCustomer", res.config.data);
                return res;
                console.log("Test", res.config.data);
            })
            .catch(err => err);
    }
}