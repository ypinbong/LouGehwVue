export default {
    SET_CUSTOMER(state, customer) {
        state.customersState = customer;
        // console.log(state.customersState);
    },
    ADD_CUSTOMER(state, customer) {
        state.customersState.push(customer);
    }
}