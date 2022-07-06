(function (root, factory) {
  root["orders"] = factory(root["cart"], root["auth"]);
})(window, function (cart, authentication) {
  var auth = null;
  var currentUser = null;
  var isAdmin = null;

  var ORDERS = {};

  var init = function () {
    auth = authentication.getCurrentUser();
    if (auth) {
      currentUser = auth.name;
      isAdmin = auth.userType === 0 ? false : true;
    }
    if (!isAdmin) {
      if (typeof ORDERS[currentUser] === "undefined") {
        ORDERS[currentUser] = [];
        return "Your orders has been initialized";
      }
    }
  };

  var getOrderHistory = function () {
    init();
    if (!auth) {
      return "Please signin to continue";
    }
    if (!isAdmin) {
      return ORDERS[currentUser];
    } else {
      return "Admin has no permission to this page";
    }
  };

  var getCurrentOrders = function () {
    init();
    if (!auth) {
      return "Please signin to continue";
    }
    if (!isAdmin) {
      var currentOrders = [];
      for (var j = 0; j < ORDERS[currentUser].length; j++) {
        if (
          ORDERS[currentUser][j].orderStatus !== "delivered" &&
          ORDERS[currentUser][j].orderStatus !== "cancelled"
        ) {
          currentOrders.push(ORDERS[currentUser][j]);
        }
      }

      if (currentOrders.length > 0) {
        return currentOrders;
      } else {
        return "There are no active orders.";
      }
    } else {
      return "Admin has no permission to this page";
    }
  };

  var getAllOrders = function () {
    init();
    if (!auth) {
      return "Please signin to continue";
    }
    if (isAdmin) {
      return ORDERS;
    } else {
      return "users has no permission to this page";
    }
  };

  var addOrder = function () {
    init();
    if (!auth) {
      return "Please signin to continue";
    }
    if (!isAdmin) {
      var cartItems = cart.showCart();
      if (cartItems.items.length > 0) {
        var newOrder = {
          id: ORDERS[currentUser].length + 1,
          orderItems: cartItems.items,
          orderTotal: cartItems.itemTotal,
          orderStatus: "ordered",
        };
        ORDERS[currentUser].push(newOrder);
        cart.emptyCart();
        return "Order placed.";
      } else {
        return "There is no item in cart";
      }
    } else {
      return "Admin has no permission to this page";
    }
  };

  var changeOrderStatus = function (userName, orderId, status) {
    init();
    if (!auth) {
      return "Please signin to continue";
    }
    if (isAdmin) {
      var orderIndex = null;
      if (typeof ORDERS[userName] !== "undefined") {
        for (var i = 0; i < ORDERS[userName].length; i++) {
          if (ORDERS[userName][i].id === orderId) {
            orderIndex = i;
          }
        }

        if (orderIndex !== null) {
          ORDERS[userName][orderIndex].orderStatus = status;
          return "Order status updated.";
        } else {
          return "Invalid order number.";
        }
      } else {
        return "Invalid user details.";
      }
    } else {
      return "users has no permission to this page";
    }
  };

  return {
    init: init,
    getOrderHistory: getOrderHistory,
    getCurrentOrders: getCurrentOrders,
    addOrder: addOrder,
    changeOrderStatus: changeOrderStatus,
    getAllOrders: getAllOrders,
  };
});
