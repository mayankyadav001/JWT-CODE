const connection = require("../../Model/dbConnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");

const userSignup = async (req, res) => {
  const { userid, username, password } = req.body;
  const query = "SELECT * FROM users WHERE userid = ?";
  const query1 = " INSERT INTO users SET ?";
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  const data1 = {
    userid,
    username,
    password: pass,
  };
  connection.query(query, userid, (error, result) => {
    if (result.length) {
      return res.send({ message: "user id allready exist" });
    }
    connection.query(query1, data1, (err, result) => {
      if (err) {
        return res.send({ Error: err.sqlMessage });
      }
      return res.send({ status: 200, respnse: result });
    });
  });
};

const loginUser = async (req, res) => {
  const sql = "SELECT * FROM users WHERE UserID = ?";
  connection.query(sql, [req.body.UserID], (err, data) => {
    if (err) return res.json({ Error: "login error in sever" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.Password.toString(),
        data[0].Password,
        (err, response) => {
          if (err) return res.json({ Error: "password compare error" });
          if (response) {
            const UserID = data[0].UserID;
            const Username = data[0].Username;
            const token = jwt.sign({ UserID, Username }, "jwt-secrat-key", {
              expiresIn: "1d",
            });
            return res.json({ Status: "Succes", token });
          } else {
            return res.json({ Error: "password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "no userid existed" });
    }
  });
};

module.exports = { userSignup, loginUser };
