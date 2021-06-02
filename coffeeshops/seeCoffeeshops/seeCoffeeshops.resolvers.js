import client from "../../client";

export default {
    Query:{
        seeCoffeeshops: (_,{page=1}) => client.coffeeShop.findMany({
            take: 2,
            skip: (page-1) * 2
        })
    }
}