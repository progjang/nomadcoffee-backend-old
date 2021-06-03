import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import fs from "fs";

const HOST_URL = "http://localhost:4000";
const STATIC_URL = HOST_URL + "/static";
export default {
    Mutation:{
        editProfile: protectedResolver(async (
            _,
            {username, password:newPassword, email, name, location, avatar, githubUsername},
            {loggedinUser}
            ) => {
            let avatarURL=null;
            if(avatar){
                const {filename, createReadStream } = await avatar;
                const genFilename = `${loggedinUser.id}-${Date.now()}-${filename}`
                const stream = createReadStream();
                const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + genFilename);
                stream.pipe(writeStream);
                avatarURL = `${STATIC_URL}/${genFilename}`
            }
            let uglyPassword = null;
            if(newPassword){
                uglyPassword = await bcrypt.hash(newPassword,10);
            }
            (newPassword, uglyPassword);
            const user = await client.user.update({where:{id:loggedinUser.id}, data:{
                username,
                ...(uglyPassword && {password:uglyPassword}),
                ...(avatarURL && {avatarURL}),
                email,
                name,
                location,
                githubUsername,
            }}); //update block end
            return {
                ok: true,
            }
        })
    }
}