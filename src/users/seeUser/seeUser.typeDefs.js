import { gql } from "apollo-server-core";

export default gql`
    type Query{
        seeUser(username:String!, page:Int): User
    }
`