import client from "../../client";

export default {
    CoffeeShopResult: {
        totalShops: () => client.coffeeShop.count(),
    },
    
    Query:{
        seeCoffeeshops: (_,{page=1}) => ({
            coffeeShops: client.coffeeShop.findMany({
            take: 3,
            skip: (page-1) * 3
            }),
        }),
    },
};    