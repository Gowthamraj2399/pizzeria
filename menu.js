(function (root, factory) {
    root['menu'] = factory();
}(window, function(){
    var MENUDATA = [
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
        
    ]

    var getMenuData = function (){
        return MENUDATA;
    }

    var addItemToMenu = function(item) {
        if(item) {
            var newItem = {
                id: MENUDATA.length + 1,
                name: item.name,
                description: item.description,
                images: item.images,
                price: item.price
            }

            MENUDATA.push(newItem);
            return 'New item added to menu.';
        } else {
            return 'Invalid Menu.';
        }
    }

    var removeItemFromMenu = function(itemId) {
        var itemIndex = null;
        for(i = 0; i<MENUDATA.length; i++) {
            if(MENUDATA[i].id === itemId) {
                itemIndex = [i];
            }
        }

        if(itemIndex !== null) {
            MENUDATA.splice(itemIndex, 1);
            return 'Item removed from the menu.';
        }
        else {
            return 'Invalid item id.';
        }
    }

    return {
        getMenuData : getMenuData,
        addItemToMenu: addItemToMenu,
        removeItemFromMenu: removeItemFromMenu
    }
}));