import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        unfollowUser: protectedResolver(async (_, {username}, {loggedinUser}) => {
            const user = await client.user.findUnique({where:{username}});
            if(!user){
                return {
                    ok: false,
                    error: "The user does not exist."
                };
            }
            (user);
            await client.user.update({
                where:
                    {
                        id: loggedinUser.id,
                    },
                data:{
                    following:{
                        disconnect:{
                            username,
                        },
                    },
                },
            });
            return {
                ok:true,
            }
        }),
    },
}