import { gql } from "apollo-server-core";

export default gql`
    type EditCoffeeShopResult{
        ok:Boolean!
        error: String
    }
    type Mutation{
        editCoffeeShop(
            id:Int
            latitude:String
            longitude:String
            categories:[String]):EditCoffeeShopResult
    }
`