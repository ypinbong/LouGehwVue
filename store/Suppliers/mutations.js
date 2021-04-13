export default {
    setSupplier(state, supplier) {
        state.suppliersState = supplier;
        // console.log(state.customersState);
    },
    addNewSupplier(state, supplier) {
        state.suppliersState.push(supplier);
    },
    editSupplier(state, editedData) {
        const index = state.suppliersState.findIndex(
            supplier => supplier.supid == editedData[0].supid
        );
        state.suppliersState.splice(index, 1);
        state.suppliersState.push(editedData);
    },
}