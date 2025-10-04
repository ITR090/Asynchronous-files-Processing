const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

const storage = new Storage();

functions.cloudEvent('helloPubSub', async cloudEvent => {
  try {
    const message = cloudEvent.data.message.data;
    const decoded = JSON.parse(Buffer.from(message, 'base64').toString());

    const {
      filename,
      bucket,
      action,
      targetSizes = [],
      width,
      height,
    } = decoded;

    console.log('Received Pub/Sub message for:', filename);

    if (action !== 'resize') {
      console.log('Skipping non-resize action:', action);
      return;
    }

    const bucketRef = storage.bucket(bucket);
    const fileRef = bucketRef.file(filename);

    // Download original image
    const [fileBuffer] = await fileRef.download();
    console.log('Image downloaded from Cloud Storage.');

    // Process each target size
    //for (const size of targetSizes) {
    //  const [width, height] = size.split('x').map(Number);
    const resizedBuffer = await sharp(fileBuffer)
      .resize(width, height)
      .toFormat('png') // or 'jpg', based on requirement
      .toBuffer();

    const resizedFilename = `${filename.split('.')[0]}_.png`;
    const resizedFileRef = bucketRef.file(`resized/${resizedFilename}`);

    await resizedFileRef.save(resizedBuffer, {
      metadata: {
        contentType: 'image/png',
      },
    });

    console.log(`Uploaded resized image: resized/${resizedFilename}`);
    //}

    console.log('All resizing completed.');
    //  triggter a pubsup for further processing
    console.log('filename: ' + filename)

    // try {
    //   const messageData = {
    //     filePath: filename,
    //     timestamp: Date.now()
    //   };

    //   await pubsub.topic(process.env.PROCESS_MEATDATA_FUNCTION_TOPIC).publishMessage({ json: messageData });
    //   console.log('Message published to ', PROCESS_MEATDATA_FUNCTION_TOPIC)
      
    // } catch (error) {
    //   console.error('Pub/Sub publish error:', error);
    // }

  } catch (err) {
    console.error('Error in image processing:', err);
  }
  
});
