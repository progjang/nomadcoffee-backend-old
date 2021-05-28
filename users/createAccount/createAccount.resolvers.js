import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async (_, {username, email, password, name, location}) => {
            try{
                const existingUser = await client.user.findFirst({
                    where: {
                        OR : [{username}, {email}]
                    }});
                if(existingUser){
                    throw new Error("This username/email is already taken.")
                }
    
                const uglyPassword = await bcrypt.hash(password, 10);
    
                const user = await client.user.create({
                    data: {
                        username,
                        email,
                        password:uglyPassword,
                        name,
                        location
                    }
                });
                console.log(user)
                if(user){
                    return {
                        ok: true
                    }
                }

            } catch(e){
                console.log(e);
                return {
                    ok: false,
                    error: `failed to create the user (${username}/${email})`
                }
            }
        }//createAccount block
    }//Mutation block
}