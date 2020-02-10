const knex = require("knex");
const handleProducts = (req, res, database) => {
  console.log(req.body);
  const { gender, relation, occasion, interest } = req.body;
  const val = interest.map((data, i) => {
    return data.toLowerCase();
  });

  database
    .select(
      "id",
      "prodName",
      "price",
      "prodShortDesc",
      "imgLink",
      "prodLink",
      "imgLink2"
    )
    .from("gifts")
    .whereIn(
      "id",
      database
        .select("gift_id")
        .from("mapping")
        .whereIn(
          "interest_id",
          database
            .select("id")
            .from("interest")
            .whereIn(knex.raw("lower(interest)"), val)
        )
    )
    .where(knex.raw(" ',' || RTRIM(gender) || ',' "), "like", `%,${gender},%`)
    .where(
      knex.raw(" ',' || RTRIM(relation) || ',' "),
      "like",
      `%,${relation},%`
    )
    .where(
      knex.raw(" ',' || RTRIM(occasion) || ',' "),
      "like",
      `%,${occasion},%`
    )
    .then(resp => res.send(resp));
};

const productsByInterest = (req, res, database) => {
  const { gender, relation, occasion, interest, subinterest } = req.body;
  const val = interest.map((data, i) => {
    return data.toLowerCase();
  });
  const subval = subinterest.map((data, i) => {
    return data.toLowerCase();
  });

  database
    .select("prodName", "price", "prodShortDesc", "imgLink", "imgLink2")
    .from("gifts")
    .whereIn(
      "id",
      database
        .select("gift_id")
        .from("mapping")
        .whereIn(
          "interest_id",
          database
            .select("id")
            .from("interest")
            .whereIn(knex.raw("lower(interest)"), val)
        )
        .whereIn(
          "subinterest_id",
          database
            .select("id")
            .from("subint")
            .whereIn(knex.raw("lower(subinterest)"), subval)
        )
    )
    .where(knex.raw(" ',' || RTRIM(gender) || ',' "), "like", `%,${gender},%`)
    .where(
      knex.raw(" ',' || RTRIM(relation) || ',' "),
      "like",
      `%,${relation},%`
    )
    .where(
      knex.raw(" ',' || RTRIM(occasion) || ',' "),
      "like",
      `%,${occasion},%`
    )
    .then(resp => res.send(resp));
};

const productDetails = (req, res, database) => {
  const { prodName } = req.body;

  database
    .select("*")
    .from("gifts")
    .where("prodName", prodName)
    .then(resp => res.send(resp));
};
module.exports = { handleProducts, productsByInterest, productDetails };
