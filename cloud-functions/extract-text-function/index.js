const functions = require('@google-cloud/functions-framework');
const vision = require('@google-cloud/vision');
const { PubSub } = require('@google-cloud/pubsub');

// Creates a client
const pubsub = new PubSub();
const client = new vision.ImageAnnotatorClient();

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent('extractText', async cloudEvent => {


try{

  // The Pub/Sub message is passed as the CloudEvent's data payload.
  const base64name = cloudEvent.data.message.data;
  console.log("base64name")
  console.log(base64name)
  const decoded = JSON.parse(Buffer.from(base64name, 'base64').toString());
  console.log("decoded")
  console.log(decoded)

  const {
    filename,
    gcsUri,
    contentType,
    timestamp,
  } = decoded

  console.log("gcsUri")
  console.log(gcsUri)
  
  const [result] = await client.documentTextDetection({
      image: { source: { imageUri: gcsUri } },
    });
  
  //const [result] = await client.documentTextDetection(gcsUri);
  const text = result.fullTextAnnotation ? result.fullTextAnnotation.text : '';

  console.log("result")
  console.log([result])
  console.log("text")
  console.log(text)

  await pubsub.topic('document-translate-topic').publishMessage({ json: { text } });

}catch(error){
    console.log(error)
}

});
