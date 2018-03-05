const request = require("superagent");
const crypto = require("crypto");
require("dotenv").config();

const ts = Date.now();
const data = ts + `${process.env.API_PRIVATE_KEY}` + `${process.env.API_KEY}`;
const hash = crypto.createHash("md5").update(data).digest("hex");

module.exports = {
  find: (req, res) => {
    request.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${process.env.API_KEY}&hash=${hash}`)
      .then((response) => {
        const characterData = response.body.data.results;
        res.send(characterData);
      }
      ).catch((error) => {
        res.status(500).send(error);
      });
  }
};