const handlePopularGifts = (req, res, database) => {
  database
    .select("*")
    .from("gifts")
    .where("popularity", "=", "yes")
    .then(giftData => res.json(giftData))
    .catch(err => res.send(err));
};

module.exports = { handlePopularGifts };
