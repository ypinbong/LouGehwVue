import axios from 'axios';

export default{
    async getCustomers({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/customers/list`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // }
        })
        .then(res => {
            commit("setCustomer", res.data.customersList);
            // console.log("testCustomer", res.data.view);
            // return res.data;
        })
        .catch(err => err);
    },
    async addNewCustomer({ commit },{ custName, custAddress, custContact, custStatus }) {
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
                custStatus,
            }
        })
        .then(res => {
            // console.log(res);
            commit("addNewCustomer", res.data.result);
            console.log("testCustomer", res.data.result);
            return res.data;
        })
        // .catch(err => err)

        // try {
        //     const res=   await axios({
        //             method: "POST",
        //             url: `${this.$axios.defaults.baseURL}/customers/list`,
        //             // headers: {
        //             //     Authorization: `Bearer ${SecretKey}`
        //             // }
        //             data: {
        //                 custName,
        //                 custContact,
        //                 custAddress,
        //                 custStatus
        //             }
        //         })
        //         console.log('wee',res);
        //     return res;
        // } catch (e) {
        //     console.log("Error: ",e);
        // }
    },
    async editCustomer({ commit }, { custid, custName, custContact, custAddress, custStatus }) {
        return await axios({
            method: "PATCH",
            url: `${this.$axios.defaults.baseURL}/customers/list/${custid}`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // },
            data: {
                custid,
                custName,
                custAddress,
                custContact,
                custStatus
            }
            })
            .then(res => {
                console.log("Cust Edit Result:", res.data.result);
                commit("editCustomer", res.data.result.product);
                return res.data;
            })
    }
}