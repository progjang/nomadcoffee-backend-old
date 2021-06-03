import { gql } from "apollo-server";

export default gql`
type User {
    id: Int!
    username: String!
    email: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
    followers(page:Int): [User]
    following(page:Int): [User]
}
`

// how to use 
// {
//     seeUser(username:"user1"){
//       id
//       username
//       followers(page:1){
//         id
//         username
//       }
//       following(page:2){
//         id
//         username
//     }
//   }