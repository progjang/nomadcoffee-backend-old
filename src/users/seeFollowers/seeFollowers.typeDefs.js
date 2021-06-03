import { gql } from "apollo-server"

export default gql `
    type SeeFollowersResult{
        ok: Boolean!,
        error: String,
        followers: [User],
        totalFollowers: Int
    }
    type Query{
        seeFollowers(username:String!, lastId:Int): SeeFollowersResult!
    }
`