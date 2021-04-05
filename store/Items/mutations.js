export default {
    setItems(state, item) {
        state.itemsState = item;
        // console.log(state.customersState);
    },
    addNewItem(state, item) {
        state.itemsState.push(item);
    },
    editItem(state) {
        const index = state.itemsState.findIndex();
        state.itemsState.splice(index, 1);
        state.itemsState.push(editedData);
        
    },
}