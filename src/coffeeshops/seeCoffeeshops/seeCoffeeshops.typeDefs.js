import { gql } from "apollo-server-core";

export default gql`
type Query{
    seeCoffeeshops(page:Int): [CoffeeShop]
}
`