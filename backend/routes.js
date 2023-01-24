app.get("/", async (req, res) => {
  // fetch the settings and the default choices
  const query = new Parse.Query("BotSettings");
  const settings = await query.first();
  res.send({
    content: settings.get('welcomeContent'),
    choices: settings.get('welcomeChoices'),
  });
})

app.post("/ask", async (req, res) => {
  let content = req.body.content.trim().toLowerCase();
  content = content.replace(/[.,?!]/, "");  // remove punctuation

  // check for exact matches
  const exactQuery = new Parse.Query("BotResponse");
  exactQuery.equalTo("requestExact", content);
  const exactResult = await exactQuery.first();

  if (exactResult != null) {
    return res.send({
      content: exactResult.get('responseContent'),
      image: exactResult.get('responseImage'),
      choices: exactResult.get('responseChoices'),
    })
  }

  // split the message and check for keyword matches
  const words = content.split(" ");
  for (let i = 0; i < words.length; i++) {
    const keywordQuery = new Parse.Query("BotResponse");
    keywordQuery.equalTo('requestKeywords', words[i]);
    const keywordResult = await keywordQuery.first();

    if (keywordResult != null) {
      return res.send({
        content: keywordResult.get('responseContent'),
        image: keywordResult.get('responseImage'),
        choices: keywordResult.get('responseChoices'),
      })
    }
  }

  // fallback message if the request wasn't understood
  const query = new Parse.Query("BotSettings");
  const settings = await query.first();

  res.send({
    content: settings.get('responseUnknown'),
    choices: settings.get('welcomeChoices'),
  });
})