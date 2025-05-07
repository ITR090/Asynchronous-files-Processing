const express = require('express');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors')
const { Storage } = require('@google-cloud/storage');
const { PubSub } = require('@google-cloud/pubsub');

const app = express();
app.use(express.json())
app.use(cors())

const p_id =process.env.PROJECT_ID

const upload = multer({ storage: multer.memoryStorage() });

const storage = new Storage();
const pubsub = new PubSub({p_id});

const BUCKET_NAME = process.env.BUCKET_NAME;
const TOPIC_NAME = process.env.TOPIC_NAME;

app.post('/upload', upload.single('image'), async (req, res) => {

  const blob = storage.bucket(BUCKET_NAME).file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', err => {
    console.error('Upload error:', err);
    return res.status(500).json({ message: 'Upload failed' });
  });

  blobStream.on('finish', async ()=>{
    const messageData = {
        filename: req.file.originalname,
        bucket: BUCKET_NAME,
        contentType: req.file.mimetype,
        action: 'resize',
        targetSizes: ['100x100', '500x500'],
        timestamp: Date.now()
      };

      try {
        await pubsub.topic(TOPIC_NAME).publishMessage({json: messageData});
          console.log('Message published to ', TOPIC_NAME)
          res.json({ message: 'Upload complete and message published' });
      } catch (error) {
        console.error('Pub/Sub publish error:', error);
        res.status(500).json({ message: 'Upload succeeded, but Pub/Sub failed' });
    }
  })

  blobStream.end(req.file.buffer);
});

app.listen(8080, () => console.log("Listening on port 8080"));
