import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        followUser: protectedResolver(async(_, {toFollow}, {loggedinUser}) => {
            const user = await client.user.findUnique({where: {username:toFollow}});
            if(!user){
                return {
                    ok: false,
                    error: "The user does not exist."
                };
            }
            await client.user.update({
                where: {
                    id: loggedinUser.id
                },
                data:{
                    following: {
                        connect: {
                            username: toFollow,
                        },
                    },
                },
            });
        return {
            ok: true,
        };
        }),
    },
};