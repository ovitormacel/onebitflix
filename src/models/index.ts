import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";
import { Like } from "./Like";

//Associações
Category.hasMany(Course, {as: 'courses'});

Course.belongsTo(Category);
Course.hasMany(Episode, {as: 'episodes'});
Course.belongsToMany(User, { through: Favorite });
Course.hasMany(Favorite, { as: 'FavoritesUsers', foreignKey: 'course_id' });
Course.belongsToMany(User, {through: Like});

Episode.belongsTo(Course);

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: 'FavoritesCourses', foreignKey: 'user_id' });
User.belongsToMany(Course, {through: Like});

Favorite.belongsTo(Course);
Favorite.belongsTo(User);



export {
    Category,
    Course,
    Episode,
    User,
    Favorite,
    Like
}