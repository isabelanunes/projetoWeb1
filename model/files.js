const MongoClient = require("mongodb").MongoClient;
const path = require("path");

//const variaveis_ambiente = require("../config/bd.json");
//const url = variaveis_ambiente.heroku;
const url = process.env.BD;

module.exports = class Files {
  static async insertFile(req, res) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    const { data, descricao } = req.body;
    const { file } = req;

    let result = await db.collection("files").insertOne({
      data: data,
      descricao: descricao,
      image_name: file.filename,
    });

    res.status(200).json(result);

    conn.close();
  }

  static async findData(data) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("files").findOne({
      data: data,
    });
    conn.close();

    return result;
  }

  static async findAll(data) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    let result = await db.collection("files").find().toArray();
    console.log(result);
    conn.close();

    return result;
  }

  static async download(req, res) {
    try {
      const { filename } = req.params;
      return res.download(path.join(__dirname, `../uploads/${filename}`));
    } catch (error) {
      return res.status(400);
    }
  }
};
