const {conn} = require("./conn");
const { STRING, INTEGER } = conn.Sequelize;

const Thing = conn.define("thing", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ranking: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = {Thing};
