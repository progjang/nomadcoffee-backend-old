import { gql } from "apollo-server-core";

export default gql`
type Query{
    seeCoffeeshop(id:Int): CoffeeShop
}
`