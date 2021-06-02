import { gql } from "apollo-server";

export default gql`
type CreateCoffeeShopResult{
    ok: Boolean!
    error: String
}

type Mutation{
    createCoffeeShop(
        name:String!
        urls: [String]
        categories: [String]
    ): CreateCoffeeShopResult
}
`