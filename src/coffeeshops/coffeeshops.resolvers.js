import client from "../client";

export default {
    CoffeeShop: {
        user: async({userId}) => client.user.findUnique({where:{id:userId}}),
        photos: async ({id}) => client.coffeeShopPhoto.findMany({
            where: {coffeeShopId: id,} 
        }),
        categories: async({id}) => client.category.findMany({
            where: {
                shops:{
                    some: {id}
                }
            }
        }),
    },

    Category: {
        shops: async({id},{page=1}) => client.coffeeShop.findMany({
                where: {
                    categories: {
                        some: {id}
                    },
                },
                take: 2,
                skip: (page-1) * 2,
            }),
        totalShops: async({id}) => client.coffeeShop.count({
            where: {
                categories: {
                    some: {id}
                },
            },
        })
    }
}