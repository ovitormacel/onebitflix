'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {name: 'Front End', position: 1, created_at: new Date(), updated_at: new Date()},
      {name: 'Back end', position: 2, created_at: new Date(), updated_at: new Date()},
      {name: 'Ferramentas de Desenvolvimento', position: 3, created_at: new Date(), updated_at: new Date()},
      {name: 'Soft Skills', position: 4, created_at: new Date(), updated_at: new Date()},
      {name: 'Carreira', position: 5, created_at: new Date(), updated_at: new Date()},
      {name: 'Games e Engines', position: 6, created_at: new Date(), updated_at: new Date()},
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      position: [1,2,3,4,5,6]
    }, {})
  }
};
