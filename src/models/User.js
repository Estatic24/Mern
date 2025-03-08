const users = require("../../../homework/data/usersData");
const Task = require("./Task");

let lastId = users.length ? Math.max(...users.map((u) => u.id)) : 0;

module.exports = {
  getAll() {
    return users;
  },

  getById(id) {
    return users.find((user) => user.id === id) || null;
  },

  create(userData) {
    if (!userData.fullName || !userData.job || !userData.age || !userData.city) {
      throw new Error("Все поля (fullName, job, age, city) обязательны");
    }

    const newUser = {
      id: ++lastId,
      fullName: userData.fullName,
      job: userData.job,
      age: userData.age,
      city: userData.city,
    };
    users.push(newUser);
    return newUser;
  },


  update(id, updateData) {
    const user = this.getById(id);
    if (!user) return null;

    Object.assign(user, updateData);
    return user;
  },

  delete(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    Task.deleteAllByUserId(id);
    return true;
  },
};
