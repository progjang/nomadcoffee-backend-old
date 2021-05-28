import { gql } from "apollo-server-core";

export default gql`
type createUserResult {
    ok: Boolean!
    error: String
}

type Mutation{
    createAccount(
        username: String!
        email: String!
        password: String!
        name: String
        location: String
    ): createUserResult
}
`