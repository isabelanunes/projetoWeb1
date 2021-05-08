const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://admin:admin@cluster0.cjg76.mongodb.net/db_web?retryWrites=true&w=majority";

module.exports = class Users {
  static async insertUser(email, password) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("users").insertOne({
      email: email,
      password: password,
    });

    conn.close();

    return result;
  }

  static async findUser(email, password) {
    console.log(email, password);
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("users").findOne({
      email: email,
      password: password,
    });

    conn.close();

    return result;
  }
};
