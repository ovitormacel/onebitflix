import { ResourceOptions } from "adminjs";

const userResourceOptions: ResourceOptions = {
  navigation: 'Administração',
  // Manipula as propriedades dos inputs
  properties: {
    birth: {
      type: 'date'
    },
    password: {
      type: 'password'
    },
    role: {
        // Define o input como um select
      availableValues: [
        //Opções do Select
        { value: 'admin', label: 'Administrador' },
        { value: 'user', label: 'Usuário Padrão' }
      ]
    }
  },
  editProperties: [
    'firstName',
    'lastName',
    'phone',
    'birth',
    'email',
    'password',
    'role'
  ],
  filterProperties: [
    'firstName',
    'lastName',
    'phone',
    'birth',
    'email',
    'role',
    'createdAt',
    'updatedAt'
  ],
  listProperties: [
    'id',
    'firstName',
    'email',
    'role'
  ],
  showProperties: [
    'id',
    'firstName',
    'lastName',
    'phone',
    'birth',
    'email',
    'role',
    'createdAt',
    'updatedAt'
  ],
}

export { userResourceOptions }