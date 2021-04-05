export default {
    setSupplier(state, supplier) {
        state.suppliersState = supplier;
        // console.log(state.customersState);
    },
    addNewSupplier(state, supplier) {
        state.suppliersState.push(supplier);
    },
    editSupplier(state) {
        const index = state.suppliersState.findIndex();
        state.suppliersState.splice(index, 1);
        state.suppliersState.push(editedData);
        
    },
}