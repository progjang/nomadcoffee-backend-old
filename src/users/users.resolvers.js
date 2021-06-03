import client from "../client";

export default {
    User: {
        followers: async({id},{page=1}) => {
            const followers = await client.user
            .findUnique({
                where:{id}
            }).followers({
                take:2,
                skip:(page-1)*2
            }
            )
            return followers;
        },
        following:async({id},{page=1}) => {
            const following = await client.user
            .findUnique({
                where:{id}
            }).following({
                take:2,
                skip:(page-1)*2
            }
            );
            return following;
        },
    }
}