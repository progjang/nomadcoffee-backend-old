import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {
    Mutation: {
        editCoffeeShop: protectedResolver(
            async(_, {id, name, latitude, longitude, categories:newCategories},{loggedinUser}) => {
            const oldShop = await client.coffeeShop.findFirst({
                where:{
                    id,
                    userId:loggedinUser.id,
                },
                include: {
                    categories: {
                        select: {
                            name: true,
                        }
                    }
                }
            });
            if(!oldShop){
                return {
                    ok: false,
                    error: "CoffeeShop not found."
                }
            }
            let newCategoriesObj = null;
            if(newCategories) {
                newCategoriesObj = newCategories.map((name)=>({
                    where: {name},
                    create:{name}
                }))
            }
            const shop = await client.coffeeShop.update({
                where: {
                    id,
                },
                data: {
                    name,
                    latitude,
                    longitude,
                    ...(newCategories.length > 0 && 
                        { categories: {
                        disconnect: oldShop.categories,
                        connectOrCreate: newCategoriesObj
                        }})
                }
            });
            return {
                ok: true,
            }

        })
    }
}