import client from "../../client";

const PAGE_SIZE = 2;
export default {
    Query:{
        seeFollowing: async(_,{username, page=1}) => {
            const user = await client.user.findUnique({where: {username}, select:{id:true,}});
            if(!user){
                return {
                    ok: false,
                    error: "The user does not exist."
                };
            }
            const following = await client.user
            .findUnique({where:{username}})
            .following({
                take: PAGE_SIZE,
                skip: (page - 1) * PAGE_SIZE,
            });
            return {
                ok:true,
                following,
            };
        }
    }
}