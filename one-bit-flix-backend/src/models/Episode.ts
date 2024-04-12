import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import { WatchTimeInstance } from './WatchTime'

// Interface Objeto Episode
export interface Episode {
  id: number
  name: string
  synopsis: string
  order: number
  videoUrl: string
  secondsLong: number
  courseId: number
}

// Interface atributos necessários para criação, Atributos Opcionais, 'id', 'videoUrl, 'secondsLong'
export interface EpisodeCreationAttributes extends Optional<Episode, 'id' | 'videoUrl' | 'secondsLong' > {}

//Interface Instância Episode
export interface EpisodeInstance extends Model<Episode, EpisodeCreationAttributes>, Episode {
  watchTime?: WatchTimeInstance
}

// Model Episode
export const Episode = sequelize.define<EpisodeInstance, Episode>('Episode', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  order: {
    allowNull: false,
    type: DataTypes.STRING
  },
  videoUrl: {
    type: DataTypes.STRING
  },
  secondsLong: {
    type: DataTypes.INTEGER
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})