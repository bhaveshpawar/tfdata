const handleMapping = (req, res, database) => {
  const { gift, interest, subinterest, category } = req.body;
  database
    .insert({
      gift_id: database
        .select("id")
        .from("gifts")
        .where("prodName", "=", gift),
      interest_id: database
        .select("id")
        .from("interest")
        .where(knex.raw("lower(interest)"), "=", interest.toLowerCase()),
      subinterest_id: database
        .select("id")
        .from("subint")
        .where(knex.raw("lower(subinterest)"), "=", subinterest.toLowerCase()),
      category_id: database
        .select("id")
        .from("category")
        .where(knex.raw("lower(prod_category)"), "=", category.toLowerCase())
    })
    .into("mapping")
    .then(resp =>
      res.json(
        `${gift} successfully mapped to ${interest} interest and ${subinterest} subinterest`
      )
    )
    .catch(err => {
      console.log(err);
      res.status(400).json("Unable to map product");
    });
};

module.exports = { handleMapping };
