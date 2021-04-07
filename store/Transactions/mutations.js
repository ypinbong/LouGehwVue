export default {
    setDeliveryHistory(state, deliveries) {
        state.deliveriesState = deliveries;
        // console.log(state.deliveriesState);
    },
    addNewDelivery(state, deliveries) {
        state.deliveriesState.push(deliveries);
    },
    setSalesHistory(state, sales) {
        state.salesState = sales;
        // console.log(state.salesState);
    },
    addNewSales(state, sales) {
        state.salesState.push(sales);
    },
}