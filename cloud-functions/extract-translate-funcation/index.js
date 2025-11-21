const functions = require('@google-cloud/functions-framework');
const vision = require('@google-cloud/vision');
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
const { Firestore } = require('@google-cloud/firestore');

const client = new vision.ImageAnnotatorClient();
const translationClient = new TranslationServiceClient();
const firestore = new Firestore();

functions.http('extract-translate-funcation-http', async (req, res) => {
   
try{


    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Stop preflight requests here
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        return res.status(204).send('');
    }

    const { gcsUri,targetLanguage } = req.body;

    if (!gcsUri && !targetLanguage ) {
        return res.status(400).send({ error: 'Missing gcsUri and targetLanguagen in request body.' });
    }

    const [result] = await client.documentTextDetection({
      image: { source: { imageUri: gcsUri } },
    });

    //const [result] = await client.documentTextDetection(gcsUri);
    const text = result.fullTextAnnotation ? result.fullTextAnnotation.text : '';

    // console.log("result")
    // console.log([result])
    // console.log("text")
    // console.log(text)

    const request = {
    parent: `projects/asynchronous-image-processing`,
    contents: [text],
    mimeType: 'text/plain',
    targetLanguageCode: targetLanguage,
  };

    
    const [response] = await translationClient.translateText(request);
    
    console.log(response);  
    
    const translatedText = response.translations[0].translatedText;
    
    console.log(`Translated text: ${translatedText}`);  
    
    res.status(200).json({  data : request , translatedText : translatedText });

}catch(error){

    console.error('Error:', error);
    res.status(500).json({ error: error });
}

});
