import AWS from "aws-sdk";
const comprehend = new AWS.Comprehend({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIATPFVELJRN6OJTG4E",
    secretAccessKey: "gLKIUFvGkhXHagat7p0Qz6057qhj5Fd/9xPVNlQB",
  },
});

const Text = "Put your text here";

comprehend
  .classifyDocument({
    EndpointArn:
      "arn:aws:comprehend:ap-south-1:238750554722:document-classifier-endpoint/test" /* required */,
    Text,
  })
  .promise()
  .then(console.log)
  .catch(console.error);

comprehend
  .detectEntities({
    Text,
    LanguageCode: "en" /* required */,
  })
  .promise()
  .then(console.log)
  .catch(console.error);
