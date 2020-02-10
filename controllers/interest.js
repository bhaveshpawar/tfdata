const knex = require("knex");
const handleInterest = (req, res, database) => {
  database
    .select("*")
    .from("interest")
    .then(resp => res.send(resp));
};

const getSubinterest = (req, res, database) => {
  database
    .select("*")
    .from("subint")
    .then(resp => res.send(resp));
};
const postSubinterest = (req, res, database) => {
  const { interest } = req.body;
  const subval = interest.map((data, i) => {
    return data.toLowerCase();
  });

  database
    .select("*")
    .from("subint")
    .whereIn(
      "interest_id",
      database
        .select("id")
        .from("interest")
        .whereIn(knex.raw("lower(interest)"), subval)
    )
    .then(resp => res.send(resp));
};
module.exports = { handleInterest, getSubinterest, postSubinterest };
