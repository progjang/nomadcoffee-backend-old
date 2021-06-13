import jwt from "jsonwebtoken";
import client from "../client";
export const getUser = async(token) => {
    try{

        if (!token) {
            return null;
        }
        const {id} = jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findFirst({where: {id}});
        if(user) {
            return user;
        } else{
            return null;
        }
    } catch {
        return null;
    }
};

export const protectedResolver = (ourResolver) => (
    root,
    args,
    context,
    info
) => {
    console.log(context, info);
    if (!context.loggedinUser) {
        const query = info.operation.operation === "query";
        if(query){
            return null;
        } else{
            return {
                ok:false,
                error: "please log in to perform this acton",
            };
        }

    }
    return ourResolver(root, args, context, info);
}
