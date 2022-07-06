(function (root, factory) {
  root["cart"] = factory(root["auth"], root["menu"].getMenuData());
})(window, function (authentication, menu) {
  var auth = null;
  var currentUser = null;
  var isAdmin = null;

  var menuData = menu;
  var CART = {};

  var init = function () {
    auth = authentication.getCurrentUser();
    if (auth) {
      currentUser = auth.name;
      isAdmin = auth.userType === 0 ? false : true;
    }

    if (!isAdmin) {
      if (typeof CART[currentUser] === "undefined") {
        CART[currentUser] = {
          items: [],
          itemTotal: null,
        };
        return "Your cart has been initialized";
      }
    }
  };

  var showCart = function () {
    init();
    if (auth) {
      if (!isAdmin) {
        if (CART[currentUser].items.length > 0) {
          return CART[currentUser];
        } else {
          return "Your cart is empty";
        }
      } else {
        return "Admin has no permission to this page";
      }
    } else {
      return "Please signin to continue";
    }
  };

  var addToCart = function (itemId) {
    init();
    if (auth) {
      if (!isAdmin) {
        var item;
        for (var a = 0; a < menuData.length; a++) {
          if (menuData[a].id === itemId) {
            item = menuData[a];
          }
        }
        if (item) {
          CART[currentUser].items.push(item);
          CART[currentUser].itemTotal =
            CART[currentUser].itemTotal + item.price;
          return "Item Added to Cart";
        } else {
          return "Invalid Item";
        }
      } else {
        return "Admin has no permission to this page";
      }
    } else {
      return "Please signin to continue";
    }
  };

  var removeFromCart = function (itemId) {
    init();
    if (auth) {
      if (!isAdmin) {
        var itemIndex = null;
        var item;

        for (var i = 0; i < CART[currentUser].items.length; i++) {
          if (CART[currentUser].items[i].id === itemId) {
            itemIndex = i;
            item = CART[currentUser].items[i];
          }
        }

        if (CART[currentUser].items.length > 0) {
          if (itemIndex !== null) {
            CART[currentUser].items.splice(itemIndex, 1);
            CART[currentUser].itemTotal -= item.price;
            return "Item removed successfully.";
          } else {
            return "Invalid Item id.";
          }
        } else {
          return "Your cart is empty.";
        }
      } else {
        return "Admin has no permission to this page";
      }
    } else {
      return "Please signin to continue";
    }
  };

  var emptyCart = function () {
    init();
    if (auth) {
      if (!isAdmin) {
        CART[currentUser] = {
          items: [],
          itemTotal: null,
        };
      } else {
        return "Admin has no permission to this page";
      }
    } else {
      return "Please signin to continue";
    }
  };

  return {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    showCart: showCart,
    emptyCart: emptyCart,
  };
});
