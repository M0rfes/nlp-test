const express = require("express");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();

app.use(express.bodyParser());

const comprehend = new AWS.Comprehend({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
app.post("/", async (req, res) => {
  const { text, test = false } = req.body;
  if (test) {
    return res.json({ test });
  }
  const entities = await comprehend
    .detectEntities({
      Text: text,
      LanguageCode: "en",
    })
    .promise();

  const classification = await comprehend
    .classifyDocument({
      EndpointArn:
        "arn:aws:comprehend:ap-south-1:238750554722:document-classifier-endpoint/test" /* required */,
      Text: text,
    })
    .promise();

  return res.json({ entities, classification });
});
