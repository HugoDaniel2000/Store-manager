const error = (err, req, res, _) => {
  console.log(err);
  return res.status(500).end();
};

module.exports = error;