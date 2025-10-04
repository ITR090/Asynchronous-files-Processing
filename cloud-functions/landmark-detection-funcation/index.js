const functions = require('@google-cloud/functions-framework');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

functions.http('analyzeImageForLandmarksHttp', async (req, res) => {
  
    try {

    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Stop preflight requests here
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        return res.status(204).send('');
    }

    const { gcsUri } = req.body;

    if (!gcsUri) {
        return res.status(400).send({ error: 'Missing gcsUri in request body.' });
    }

    // Run landmark detection
    const [result] = await client.landmarkDetection(gcsUri);
 
    const landmarks = result.landmarkAnnotations;
 
    if (landmarks.length > 0) {
        console.log("Landmarks found:");
 
        res.status(200).json({
            status: 'success',
            data: landmarks,
        });
        
    } else {
      console.log("No landmarks found in the image.");  // need to change
      res.status(400).json({
        message: 'No landmarks found in the image.'
      });
    }
  } catch (err) {
    console.error('Error during landmark detection:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }


});
