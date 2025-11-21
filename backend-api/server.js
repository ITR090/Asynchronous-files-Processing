const express = require('express');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors')
const path = require('path')
const axios = require('axios');
const { Storage } = require('@google-cloud/storage');

const app = express();
app.use(express.json())
app.use(cors())

// Creates a client storage
const storage = new Storage();
// cloud storage bucket
const BUCKET_NAME = process.env.BUCKET_NAME;

// to server react frotent
// this required so BE can know where are FE files .
app.use(express.static(path.join(__dirname, 'dist')));
//console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);


const upload = multer({ storage: multer.memoryStorage() });

async function generateSignedUrl(bucketName, fileName) {

  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  return url;
}


app.post('/api/uploadLandmark', upload.single('file'), async (req, res) => {

  try {

    // if no file
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

     // if file type not image
    if (!['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG allowed.' });
    }

    const blob = storage.bucket(BUCKET_NAME).file(`landmarks/${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    // if any error during streem 
    blobStream.on('error', err => {
      console.error('Upload error:', err);
      return res.status(500).json({ message: 'Upload failed' });
    });

    // if no errors 
    blobStream.on('finish', async () => {

      try {
        const cloudFunctionUrl = process.env.LANDMARK_DETECTION_FUNCTION_HTTP;
        const uploadedGcsUri = `gs://${BUCKET_NAME}/landmarks/${req.file.originalname}`;
        const cfResponse = await fetch(cloudFunctionUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gcsUri: uploadedGcsUri }),
        });
        const data = await cfResponse.json();

        if (cfResponse.status == 200) {
          // signed url to access image
          const url = await generateSignedUrl(BUCKET_NAME, `landmarks/${req.file.originalname}`);
          res.status(200).json({ message: data, url: url });
        }

        if (cfResponse.status == 400) {
          return res.status(cfResponse.status).json({ message: data.message || 'Error processing image' });
        }


      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload failed' });
      }
    })

    blobStream.end(req.file.buffer);
    req.file.buffer = null;

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `${error} Try again later` })
  }
})


app.post('/api/documentTranslator', upload.single('file'), async (req, res) => {
  try {

    // if no file
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // if file type not image
    if (!['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG allowed.' });
    }

    const blob = storage.bucket(BUCKET_NAME).file(`documents/${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    // if any error during streem 
    blobStream.on('error', err => {
      console.error('Upload error:', err);
      return res.status(500).json({ message: 'Upload failed' });
    });
    // if no errors

    // if no errors 
    blobStream.on('finish', async () => {

      const messageData = {
        filename: req.file.originalname,
        gcsUri: `gs://${BUCKET_NAME}/documents/${req.file.originalname}`,
        contentType: req.file.mimetype,
        timestamp: Date.now()
      };

      try {

       const cloudFunctionUrl_1 = process.env.EXTRACT_TRANSLATE_TEXT_FUNCTION_HTTP;
       const gcsUri = `gs://${BUCKET_NAME}/documents/${req.file.originalname}`;

       const response  = await  axios.post(cloudFunctionUrl_1 ,{
        gcsUri: gcsUri,
        targetLanguage: 'ar' // can be dynamic
       }) 

       res.status(200).json({ message: response.data });
         
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload failed' });
      }
    })

    blobStream.end(req.file.buffer);
    req.file.buffer = null;

  } catch (error) {
    console.log(error.err)
    res.status(500).json({ message: `${error} Try again later` })
  }

})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
