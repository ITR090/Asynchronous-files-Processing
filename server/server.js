const express = require('express');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors')
const path = require('path')
const { Storage } = require('@google-cloud/storage');
const { PubSub } = require('@google-cloud/pubsub');

const app = express();
app.use(express.json())
app.use(cors())

// to server react frotent
// this required so BE can know where are FE files .
app.use(express.static(path.join(__dirname, 'dist')));


// project id
const p_id = process.env.PROJECT_ID
// cloud storage bucket
const BUCKET_NAME = process.env.BUCKET_NAME;
// cloud storage topic name
const TOPIC_NAME = process.env.TOPIC_NAME;

// Creates a client storage
const storage = new Storage();
// Creates a client pubsup
const pubsub = new PubSub({ projectId: p_id });


const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.single('file'), async (req, res) => {

  try {
    console.log(req)
    if (!req.file) {
      //console.log('No file uploaded');
      return res.status(400).json({ eer_message: 'No file uploaded' });
    }
    

    const blob = storage.bucket(BUCKET_NAME).file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    // if any error during streem 
    blobStream.on('error', err => {
      console.error('Upload error:', err);
      return res.status(500).json({ eer_message: 'Upload failed' });
    });

    // if no errors 
    blobStream.on('finish', async () => {
      const messageData = {
        filename: req.file.originalname,
        bucket: BUCKET_NAME,
        contentType: req.file.mimetype,
        action: 'resize',
        targetSizes: ['500x500'],
        timestamp: Date.now()
      };

      
      
      try {
        await pubsub.topic(TOPIC_NAME).publishMessage({ json: messageData });
        console.log('Message published to ', TOPIC_NAME)
        res.status(200).json({ eer_message: 'Upload complete and message published' });
      } catch (error) {
        console.error('Pub/Sub publish error:', error);
        res.status(500).json({ eer_message: 'Upload succeeded, but Pub/Sub failed' });
      }
    })

    blobStream.end(req.file.buffer);
    req.file.buffer = null;

  } catch (error) {
    console.log('No file uploaded catch');
    res.status(500).json({ message: 'Try again later' });
  }

});


app.listen(5000, () => console.log("Listening on port 5000"));
