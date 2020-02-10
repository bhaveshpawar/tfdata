const handleWishlist = (req, res, database) => {
  const { userid } = req.body;
  database
    .select("*")
    .from("gifts")
    .whereIn(
      "id",
      database
        .select("giftid")
        .from("wishlist")
        .where("userid", userid)
    )
    .then(resp => res.send(resp))
    .catch(err => res.send(err));
};

const addtowishlist = (req, res, database) => {
  const { userid, giftid } = req.body;
  database
    .into("wishlist")
    .insert({
      userid: userid,
      giftid: giftid
    })
    .then(resp => res.send(resp))
    .catch(err => res.send(err));
};

const removefromwishlist = (req, res, database) => {
  const { userid, giftid } = req.body;
  database
    .from("wishlist")
    .where({
      userid: userid,
      giftid: giftid
    })
    .del()
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
    });
};
module.exports = { handleWishlist, addtowishlist, removefromwishlist };
