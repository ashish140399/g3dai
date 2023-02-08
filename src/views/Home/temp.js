const { Configuration, OpenAIApi } = require("openai");



const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
async function fetchData() {
  const completion = await openai.createCompletion(
    {
      model: "text-davinci-003",
      prompt: "Rotate a 3d model using babylonjs",
      temperature: 0,
      max_tokens: 1000
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  completion.then((r) => {
    console.log(r)
  })
  // console.log(completion.data.choices[0].text);
}
fetchData();