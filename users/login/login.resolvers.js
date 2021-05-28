import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default {
    Mutation:{
        login: async (_,{username, password}) => {
            // username db check
            const user = await client.user.findFirst({where: {username}});
            if(!user){
                throw new Error("No user found")
            }
            console.log(user);

            // password check
            const okPassword = await bcrypt.compare(password, user.password)
            if(!okPassword) {
                throw new Error("password mismatched")
            }
            // create token and return
            const token = jwt.sign({id:user.id}, process.env.SECRET_KEY);
            
            return {
                ok:true,
                token
            }
        }
    }
}