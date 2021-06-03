import client from "../../client"

export default {
    Query:{
        seeCategory: async (_,{name}) => client.category.findUnique({
                where: {name}
            }),
    }
}