export default {
    setCustomer(state, customer) {
        state.customersState = customer;
        // console.log(state.customersState);
    },
    addNewCustomer(state, customer) {
        state.customersState.push(customer);
    },
    editCustomer(state) {
        const index = state.customersState.findIndex();
        state.customersState.splice(index, 1);
        state.customersState.push(editedData);
        
    },
}