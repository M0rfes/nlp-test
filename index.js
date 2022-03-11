const express = require("express");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();

app.use(express.json());

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
    return res.json({
      text,
      config: {
        region: process.env.AWS_REGION,
        EndpointArn: process.env.ENDPOINT_ARN,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      },
    });
  }
  const entities = await comprehend
    .detectEntities({
      Text: text,
      LanguageCode: "en",
    })
    .promise();

  const classification = await comprehend
    .classifyDocument({
      EndpointArn: process.env.ENDPOINT_ARN /* required */,
      Text: text,
    })
    .promise();

  return res.json({ entities, classification });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
