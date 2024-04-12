import { User } from "../models"
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
    const courseOnList: number[] = [];

    // Itera a lista de episódios
    const lastEpisodes = episodes.reduce((currentList, episode) => {
        // Caso a lista não possua um episódio do curso iterado, adiciona ele.
        if (!courseOnList.includes(episode.courseId)) {
            courseOnList.push(episode.courseId);
            currentList.push(episode);
            
            return currentList;
        }

        // Caso contrário, substitue pelo mais recente.
        const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId);

        if(episodeFromSameCourse!.order > episode.order) return currentList;

        const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId);
        
        listWithoutEpisodeFromSameCourse.push(episode);
        
        return listWithoutEpisodeFromSameCourse;;

    }, [] as EpisodeInstance[]);

    return lastEpisodes;
}

export const userService = {
    findUserByEmail: async (email: string) => {
        const user = await User.findOne({ where: { email: email } });

        return user;
    },
    
    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes);

        return user;
    },

    update: async (id: number, attributes: {
        firstName: string,
        lastName: string
        phone: string,
        birth: Date,
        email: string
    }) => {
        const [ affectedRows, updatedUsers ] = await User.update(attributes, { where: { id }, returning: true });
    
        return updatedUsers[0];
    },

    updatePassword: async (id: number, password: string) => {
        const [ affectedRows, updatedUsers ] = await User.update({ password }, { 
            where: { id },
            returning: true,
            //Executa os hooks do model. Utiliza o bcrypt
            individualHooks: true 
        });

        return updatedUsers[0];
    },

    // Retorna uma lista de continuar assistindo
    getKeepWatchingList: async (id: number) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
            include: {
                //Utiliza a associação da tabela WatchTime para retornar os Episódios
                association: 'Episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                    ['course_id', 'courseId']
                ],
                include: [{
                    // Retorna as infos do curso na qual o episódio pertence
                    association: 'Course',
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        ['thumbnail_url', 'thumbnailUrl']
                    ],
                    as: 'course'
                }],
                through: {
                    // Define o alias manualmente
                    as: 'watchTime',
                    attributes: [
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        });

        if (!userWithWatchingEpisodes) throw new Error("Usuário não encontrado!");

        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)
        // @ts-ignore
        // Ordena a lista pelo último episódio assistido
        keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1);

        return keepWatchingList;
    }

}