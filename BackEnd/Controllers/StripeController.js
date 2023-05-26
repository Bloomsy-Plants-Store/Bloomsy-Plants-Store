const config = require("../config.json");
const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

const charge = async (req, res) => {
  try {

    const token = await stripe.tokens.create({
        card: {
          number:req.body.creditNumber,
          exp_month:req.body.creditMonth,
          exp_year: req.body.creditYear,
          cvc:req.body.creditCVC
        }
    });

    await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: token.id
    });
    res.status(200).json({ message: "Your order is about to be delivered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  charge
};
