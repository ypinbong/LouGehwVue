import axios from 'axios';

export default{
    async getSuppliers({ commit }) {
        return await axios({
            method: "GET",
            url: `${this.$axios.defaults.baseURL}/suppliers/list`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // }
        })
        .then(res => {
            console.log(res);
            commit("setSupplier", res.data.suppliersList);
            // console.log("testCustomer", res.data.view);
            // return res.data;
        })
        .catch(err => err);
    },
    async addNewSupplier({ commit },{ supName, supAddress, supContact }) {
        return await axios({
            method: "POST",
            url: `${this.$axios.defaults.baseURL}/suppliers/list`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // }
            data: {
                supName,
                supContact,
                supAddress,
            }
        })
        .then(res => {
            console.log(res);
            commit("addNewSupplier", res.data.result);
            console.log("testCustomer", res.data.result);
            return res.data;
        })
    },
    async editSupplier({ commit }, { supid, supName, supContact, supAddress, supStatus }) {
        return await axios({
            method: "PATCH",
            url: `${this.$axios.defaults.baseURL}/suppliers/list/${supid}`,
            // headers: {
            //     Authorization: `Bearer ${SecretKey}`
            // },
            data: {
                supid,
                supName,
                supAddress,
                supContact,
                supStatus
            }
            })
            .then(res => {
                console.log("supnew", res.data.result);
                commit("editSupplier", res.data.result.product);
                return res.data;
                
            })
    }
}