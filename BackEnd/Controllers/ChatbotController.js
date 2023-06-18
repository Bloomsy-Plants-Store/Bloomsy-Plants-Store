const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

var sendMessage = (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.prompt,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256
    });

    response.then((data) => {
        res.send({message: data.data.choices[0].text})
    }).catch((err) => {
        res.send({message: err})
    })

}

module.exports = { sendMessage };
