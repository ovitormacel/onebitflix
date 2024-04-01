import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt';

// Inteface Objeto User
export interface User {
  id: number
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user'
}

// Interface atributos opcionais na criação
export interface UserCreationAttributes
  extends Optional<User, 'id'> {}

// Interface da Instância do Model
export interface UserInstance
  extends Model<User, UserCreationAttributes>, User {}

export const User = sequelize.define<UserInstance, User>('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birth: {
    allowNull: false,
    type: DataTypes.DATE
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    // Valida se realmente é um Email
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
        isIn: [['admin', 'user']]
    }
  }
}, {
    // Opções de Hooks
    hooks: {
        // Executa algo antes de salvar o registro no Banco
        beforeSave: async (user) => {
            // Verifica se o usuário é novo ou a senha foi alterada
            if(user.isNewRecord || user.changed('password')) {
                // Se verdadeiro, atualiza o valor da senha para uma Hash Criptografada.
                user.password = await bcrypt.hash(user.password.toString(), 10); 
            }
        }
    }
})