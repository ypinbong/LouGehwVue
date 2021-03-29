import axios from 'axios';

export default{
    async loadCustomers({ commit }) {
        //console.log('HASIHA',this.$axios.defaults.baseURL);
        // console.log("what", this.$axios);
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/customers/list`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // }
        })
        .then(res => {
            console.log(res);
            commit("SET_CUSTOMER", res.data.customersList);
            // console.log("testCustomer", res.data.view);
            // return res.data;
        })
        .catch(err => err);
    },
        async addCustomer({ commit },{ custName, custAddress, custContact, custStatus}) {
        console.log(custName);
        console.log(custAddress);
        console.log(custContact);
        console.log(custStatus);
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
            commit("ADD_CUSTOMER", res.data.customersList);
            // console.log("testCustomer", res.data.view);
            // return res.data;
        })
    },
}