import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";

//Associações
Category.hasMany(Course, {as: 'courses'});
Course.belongsTo(Category);

Course.hasMany(Episode, {as: 'episodes'});
Episode.belongsTo(Course);

Course.belongsToMany(User, { through: Favorite });
User.belongsToMany(Course, { through: Favorite });

Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id' });
Favorite.belongsTo(Course);
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id' });
Favorite.belongsTo(User);


export {
    Category,
    Course,
    Episode,
    User,
    Favorite
}