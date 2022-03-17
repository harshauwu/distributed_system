class OrderConstants {
    static get STATUS() {
        return {
            PENDING: {
                id: 1,
                name: 'Pending'
            },
            COMPLETED: {
                id: 2,
                name: 'Completed'
            }
        };
    }
}

module.exports = OrderConstants;