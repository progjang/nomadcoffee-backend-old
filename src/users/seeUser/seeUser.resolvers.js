import client from "../../client";

export default {
    Query:{
        seeUser: (_,{username, page}) => client.user.findUnique({where:{username}})
    }
}