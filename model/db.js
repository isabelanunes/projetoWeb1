const MongoClient = require("mongodb").MongoClient;

//const variaveis_ambiente = require("../config/bd.json");
//const url = variaveis_ambiente.heroku;
const url = process.env.BD;

module.exports = class Users {
  static async insertUser(email, password, admin) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("users").insertOne({
      email: email,
      password: password,
      admin: admin,
    });

    conn.close();

    return result;
  }

  static async findUser(email) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("users").findOne({
      email: email,
    });

    conn.close();

    return result;
  }

  static async verifyUser(email, password) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("users").findOne({
      email: email,
      password: password,
    });

    conn.close();

    return result;
  }

  static async find() {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("users").find({}).toArray();
    // console.log(result);
    conn.close();

    return result;
  }
};
