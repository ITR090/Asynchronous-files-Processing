const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { Firestore } = require('@google-cloud/firestore');

const translationClient = new TranslationServiceClient();
const firestore = new Firestore();

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.

functions.cloudEvent('translateText', async cloudEvent => {
  
  // The Pub/Sub message is passed as the CloudEvent's data payload.
 

try {

   const { text } = JSON.parse(Buffer.from(cloudEvent.data.message.data, 'base64').toString());
   
   console.log(text)
   
   const targetLanguage = 'ar'; // You can pass this dynamically too

   const request = {
    parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/global`,
    contents: [text],
    mimeType: 'text/plain',
    targetLanguageCode: targetLanguage,
  };

  const [response] = await translationClient.translateText(request);
  const translatedText = response.translations[0].translatedText;

  console.log(`Translated text: ${translatedText}`);  

// Save result in Firestore
//   await firestore.collection('documents').doc(docId).set({
//     original: text,
//     translated: translatedText,
//     targetLanguage,
//     status: 'done',
//     updatedAt: new Date(),
//   });

//  console.log(`Document ${docId} translation saved to Firestore`);


} catch (error) {
    console.error('Error translating text:', error);
}


});
