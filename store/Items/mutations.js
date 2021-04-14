export default {
    setItems(state, item) {
        state.itemsState = item;
        // console.log(state.customersState);
    },
    addNewItem(state, item) {
        state.itemsState.push(item);
    },
    editItem(state, editedData) {
        const index = state.itemsState.findIndex(
            item => item.id == editedData[0].id
        );
        state.itemsState.splice(index, 1);
        state.itemsState.push(editedData);
        
    },
}