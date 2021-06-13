import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Query: {
        me: protectedResolver((_,__,{loggedinUser}) => client.user.findUnique({
                where:{
                    id: loggedinUser.id,
                },
            }))
    }
}