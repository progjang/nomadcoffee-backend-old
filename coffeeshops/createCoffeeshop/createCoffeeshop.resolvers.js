import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation:{
        createCoffeeShop: protectedResolver(
            async(_,{name, urls:photoUrls, categories:categoryNames}, {loggedinUser}) => {
                console.log(photoUrls, categoryNames);
                let categoryNamesObj = [];
                let photoUrlsObj = [];
                if(categoryNames) {
                    // const categoryNames = category.match(/#[\w]+/g);
                    categoryNamesObj = categoryNames.map((name)=>({
                        where:{name},
                        create:{name},
                    }));
                }
                if(photoUrls) {
                    photoUrlsObj = photoUrls.map((url)=>{
                        url = `${loggedinUser.id}-${Date.now()}-${url}`;
                        return ({
                        where:{url},
                        create:{url},
                        })
                    });
                }
                console.log(categoryNamesObj, photoUrlsObj);
                const coffeeShop = await client.coffeeShop.create({
                    data:{
                        name,
                        user: {
                            connect: {
                                id: loggedinUser.id,
                            }
                        
                        },
                        ...(categoryNamesObj.length>0 && 
                            {categories: {
                                connectOrCreate: categoryNamesObj
                                },
                            }),
                        ...(photoUrlsObj.length>0 &&
                            {photos: {
                                connectOrCreate: photoUrlsObj,
                                }
                            }),
                    },
                });
                return {ok:true}
            })
    }
}