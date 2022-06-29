(function (root, factory){
    root['orders'] = factory()
}(window, function(){
    var ORDERS =  [
        {
            id: 1,
            orderItems: [
                {
                    id: 1,
                    name: 'Veg Pizza',
                    description: 'Description about the item',
                    images:[
                        {
                        id: 123,
                        imageUrl: 'url'
                    },
                    {
                        id: 123,
                        imageUrl: 'url'
                    }],
                    price: 110,
                }
            ],
            orderTotal: 110,
            orderStatus: 'delivered'
        }
    ];

    var getOrderHistory = function() {
        return ORDERS;
    }

    var getCurrentOrders = function() {
        var currentOrders = [];
        for(var j = 0; j < ORDERS.length; j++) {
            if(ORDERS[j].orderStatus !== "delivered" && ORDERS[j].orderStatus !== "cancelled") {
                currentOrders.push(ORDERS[j]);
            }
        }

        if(currentOrders.length > 0){
            return currentOrders;
        } else {
            return 'There are no active orders.';
        }
    }

    var addOrder = function(cartItems) {
        if(cartItems) {
            var newOrder = {
                id: ORDERS.length + 1,
                orderItems: cartItems.items,
                orderTotal: cartItems.itemTotal,
                orderStatus: 'ordered'
            }
            ORDERS.push(newOrder);
            return 'Order placed.';
        } else {
            return 'Invalid order.';
        }
    }

    var changeOrderStatus = function(orderId, status) {
        var orderIndex;
        for(var i = 0; i< ORDERS.length; i++) {
            if(ORDERS[i].id === orderId) {
                orderIndex = i;
            }
        }

        if(orderIndex) {
            ORDERS[orderIndex].orderStatus = status;
            return 'Order status updated.';
        } else {
            return 'Invalid order number.';
        }
    }

    return {
        getOrderHistory: getOrderHistory,
        getCurrentOrders: getCurrentOrders,
        addOrder: addOrder,
        changeOrderStatus: changeOrderStatus
    }
}))