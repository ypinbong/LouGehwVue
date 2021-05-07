import axios from 'axios';

export default{
    async getCustomers({ commit }, { token }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/customers/list/`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            commit("setCustomer", res.data.customersList);
            console.log("token: ", localStorage.token);
            console.log("Resulta: ", res.data);
            /*if(res.data.success===false){
                localStorage.removeItem('token')
                this.app.router.push('/login')
            }*/
            return res.data;
        })
        .catch(err => err);
    },
    async addNewCustomer({ commit }, { custName, custAddress, custContact, custStatus, token }) {
        console.log("addNewCustToken: ", token);
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/customers/list`,
            headers: {
                Authorization: `Bearer ${token}`
            },
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
    },
    async editCustomer({ commit }, { custid, custName, custContact, custAddress, custStatus, token }) {
        console.log("editCustToken: ", token);
        return await axios({
            method: "PATCH",
            url: `${this.$axios.defaults.baseURL}/customers/list/${custid}`,
            headers: {
                Authorization: `Bearer ${token}`
                // "token": "eyJhbGciOiJIUzI1NiJ9.YWRtaW4.23a2LfcEJ7pbe5mqaW8cJ7kPr_e6jI3JLb9gXSf2h_k"
            },
            data: {
                custid,
                custName,
                custAddress,
                custContact,
                custStatus,
            }
            })
            .then(res => {
                console.log("Cust Edit Result:", res);
                commit("editCustomer", res.data.result.product);
                return res.data;
            })
    }
}