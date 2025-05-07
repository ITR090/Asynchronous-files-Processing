# Asynchronous Image Processing with React, Node.js, and Google Cloud

This project demonstrates an event-driven, asynchronous image processing pipeline using **React** for the frontend, **Node.js** for the backend, and several **Google Cloud Platform** (GCP) services to handle image upload, resizing, and filtering.

---

## ⚙️ Architecture Overview

1. **React Frontend**: Users upload image files via a web interface.
2. **Node.js Backend (API)**: 
   - Receives the file from React.
   - Stores the image in a Google Cloud Storage (GCS) bucket.
   - Publishes a message to an existing **Cloud Pub/Sub topic**.
3. **Cloud Pub/Sub**: Relays the image processing task asynchronously.
4. **Cloud Function**:
   - Triggered by the Pub/Sub topic.
   - Downloads the image from GCS.
   - Applies resizing and filtering logic.
   - Saves the processed image to another GCS bucket.

---

## 🧱 Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Cloud Services**:
  - Google Cloud Storage (GCS)
  - Cloud Pub/Sub
  - Cloud Functions

---

## 📁 Folder Structure

