(function (root, factory){
    root['cart'] = factory()
}(window, function() {
    var CART = {
        items: [
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
            },
            {
                id: 2,
                name: 'Non Veg Pizza',
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
                price: 210,
            },
            
        ],
        itemTotal: 320
    }
    var showCart = function() {
        return CART;
    }

    var addToCart = function(item){
        if(item) {
            CART.items.push(item);
            CART.itemTotal = CART.itemTotal + item.price;
            return 'Item Added to Cart';
        } else {
            return 'Invalid Item'
        }
    }

    var removeFromCart = function(itemId){
        var itemIndex = null;
        var item;
        for(var i=0; i< CART.items.length; i++) {
            if(CART.items[i].id ===  itemId) {
                itemIndex = i;
                item = CART.items[i]
            }
        }

        if(itemIndex !== null) {
            CART.items.splice(itemIndex, 1);
            CART.itemTotal -= item.price;
            return 'Item removed successfully.'
        } else {
            return 'Invalid Item id.'
        }
    }

    return {
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        showCart: showCart
    }

}))