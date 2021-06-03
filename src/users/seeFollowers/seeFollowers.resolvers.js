import client from "../../client";

export default {
    Query:{
        seeFollowers: async(_,{username, lastId}) => {
            const user = await client.user.findUnique({where: {username}, select:{id:true,}});
            if(!user){
                return {
                    ok: false,
                    error: "The user does not exist."
                };
            }
            const followers = await client.user
            .findUnique({where:{username}})
            .followers({
                take:2,
                skip:lastId ?1 : 0,
                ...(lastId && {cursor:{id:lastId}}),
            });
            const totalFollowers = await client.user.count({
                where: {following:{some:{username}}},
            })
            return {
                ok:true,
                followers,
                totalFollowers,
            };
        }
    }
}