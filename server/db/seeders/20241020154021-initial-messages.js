'use strict';

const { Message } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Message.bulkCreate([
      {
        title: 'Моя любимая Узи',
        body: 'Моя Узи скончалась вчера; неделю назад ей поставили диагноз — почечная недостаточность. Я купил все необходимые лекарства и даже регулярно водил её к ветеринарам, но этим утром ветеринар позвонил, чтобы сообщить, что она внезапно ушла. Сейчас у меня в сердце невыносимая боль.',
        img: 'uzi.jpeg',
      },
      {
        title: 'Снова дома',
        body: 'Ездили в поездку к родителям, и ему оооочень не нравится их дом. Крис вообще не любит переезды, машины и всякое такое. Вы бы видели его, когда вернулись орбатно 😻😻😻 Просто ангел!',
        img: 'home.webp',
      },
      { title: 'Жена купил очки для Шейна', body: '', img: 'glasses1.webp' },
      { title: 'Правдоподобный рисунок моего Томаса', body: '', img: 'painted.webp' },
      {
        title: 'Ещё Шейн',
        body: 'Он даже не сопротивляется носить очки! 😁😁 Смешнуля Шейн',
        img: 'glasses2.webp',
      },
      { title: 'Сегодня его день рождения - 2 года', body: '', img: 'birthday.jpeg' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Message.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });
  },
};
