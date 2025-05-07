# Asynchronous Files Processing with React, Node.js, and Google Cloud

This project demonstrates an event-driven, asynchronous file processing pipeline using **React** for the frontend, **Node.js** for the backend, and several **Google Cloud Platform** (GCP) services to handle file upload, resizing, and filtering.

---

## ⚙️ Architecture Overview

1. **React Frontend**: Users upload files via a web interface.
2. **Node.js Backend (API)**: 
   - Receives the file from React.
   - Stores the file in a Google Cloud Storage (GCS) bucket.
   - Publishes a message to an existing **Cloud Pub/Sub topic**.
3. **Cloud Pub/Sub**: Relays the file processing task asynchronously.
4. **Cloud Function**:
   - Triggered by the Pub/Sub topic.
   - Downloads the file from GCS.
   - Applies resizing and filtering logic.
   - Saves the processed file to another GCS bucket.

---

## 🧱 Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Cloud Services**:
  - Google Cloud Storage (GCS)
  - Cloud Pub/Sub
  - Cloud Functions

---

<!-- ## 📁 Folder Structure -->


## 🚀 Setup & Deployment

1. Create GCP Account and Enable Billing

2. Deploy Cloud Function


3. Start React Frontend

```
cd client
npm install
npm start
```

4. Start Node.js Backend

```
cd server
npm install
node index.js
```

---

## ✅ Cloud Function Logic
* Resizes image to predefined dimensions (e.g., 800x600)
* Applies basic filters (e.g., grayscale, sharpen)
* Uses libraries like sharp or jimp inside the function

---

## 📌 Notes

* Ensure billing is enabled on GCP.
* Enable required APIs: Cloud Storage, Pub/Sub, and Cloud Functions.