import client from "../../client";

export default {
    Query: {
        seeCategories: (_,{page=1}) => client.category.findMany({
            take: 2,
            skip: (page-1) * 2
        })
    }
}