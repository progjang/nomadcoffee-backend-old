import client from "../client";

export default {
    Mutation:{
        createMovie: (_, {title, year}) => client.movie.create({data:{title, year}}),
        deleteMovie: (_, {id}) => client.movie.delete({where:{id}}),
        updateMovie: (_, {id, year}) => client.movie.update({where:{id}, data:{year}})
    }
}