import { gql } from "apollo-server-core";

// export default gql`
// type Query{
//     seeCoffeeshops(page:Int): [CoffeeShop]
// }
// `

export default gql`
  type CoffeeShopResult {
    coffeeShops: [CoffeeShop]
    totalShops: Int!
  }
  type Query {
    seeCoffeeshops(page: Int!): CoffeeShopResult!
  }
`;