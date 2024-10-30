"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        id: "3c3cd00b-b1fc-40f2-a0f0-292e76e335bb",
        name: "Divyansh Sadhwani",
        username: null,
        phone: "923300249819",
        email: "kirshna@gmail.com",
        country: "Pakistan",
        city: "Karachi",
        status: true,
        password: await bcrypt.hash("password1", 10),
        created_at: new Date("2024-10-28 19:09:40"),
        updated_at: null,
        role_id: "aae5fa8e-1e02-4781-9be2-8bfa74c7bc4c",
      },
      {
        id: "a1aacb5a-4bcc-489f-9d8f-1db512a67347",
        name: "Kirshan Lal",
        username: null,
        phone: "03363598202",
        email: "kirshna.malhi0asdfasdf66@gmail.com",
        country: "Pakistan",
        city: "Karachi",
        status: true,
        password: await bcrypt.hash("password2", 10),
        created_at: new Date("2024-10-28 17:13:51"),
        updated_at: null,
        role_id: "9146aa9d-6311-45e1-98f2-abac28c45da6",
      },
      {
        id: "ebd9d1e0-267a-4f84-b7fd-7c706952cd2c",
        name: "Kirshan Lal",
        username: "KrishnaMalhi",
        phone: "923363598202",
        email: "kirshna.malhi066@gmail.com",
        country: "Pakistan",
        city: "Karachi",
        status: true,
        password: await bcrypt.hash("password3", 10),
        created_at: new Date("2024-10-21 06:57:22"),
        updated_at: null,
        role_id: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
