import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export interface Category {
    id: number,
    name: string,
    position: number
}

// Define uma interface de atributos de criação, sendo opcional o "id"
export interface CategoryCreationAttributes extends Optional<Category, 'id'>{}

/* Define uma interface para a instância do Model Category, 
ela recebe o Model genérico do Squelize e os Atributos de Category */
export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category {}

export const Category = sequelize.define<CategoryInstance, Category>('Category', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})