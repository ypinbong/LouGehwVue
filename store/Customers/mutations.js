export default {
    setCustomer(state, customer) {
        state.customersState = customer;
        // console.log(state.customersState);
    },
    addNewCustomer(state, customer) {
        state.customersState.push(customer);
    },
    editCustomer(state, editedData) {
        const index = state.customersState.findIndex(
            customer => customer.custid == editedData[0].custid
        )
        state.customersState.splice(index, 1);
        state.customersState.push(editedData);      
    },
}