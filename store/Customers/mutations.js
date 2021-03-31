export default {
    setCustomer(state, customer) {
        state.customersState = customer;
        // console.log(state.customersState);
    },
    addCustomer(state, customer) {
        state.customersState.push(customer);
    },
    editCustomer(state, customer) {
        const index = state.customersState.findIndex();
        state.customersState.splice(index, 1);
        state.customersState.push(editedData);
        
    },
    setSupplier(state, customer) {
        state.suppliersState = customer;
        // console.log(state.customersState);
    },
    addSupplier(state, customer) {
        state.suppliersState.push(customer);
    },
    editSupplier(state, customer) {
        const index = state.suppliersState.findIndex();
        state.suppliersState.splice(index, 1);
        state.suppliersState.push(editedData);
        
    }
}