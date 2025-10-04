# GCP Serverless Playground
---
## Used GCP Services:
   - Google Cloud Storage Buckets
   - Cloud Pub/Sub
   - Cloud Run Functions
   - Cloud Run
   - Cloud Logging
   - APIs & Services Cloud vison API
   - Cloud Firestore Databases
   - IAM and Serviceaccounts

---
## 📁 Folder Structure

- **frontend**: React files
- **backend-api**: server.js + node_modules + .env + package-lock.json + package.json + ServiceAccount json file 
- **cloud-functions**: 
  - extract-text-function
  - translate-text-function
  - landmark-detection-funcation
  - resize-image-funcation
---

## 🚀 Setup

1. Create GCP Account and Enable Billing.
2. Start React Frontend:
```
cd client
npm install
npm run dev
```
3. Start Node.js Backend:
```
cd server
npm install
npm run start
```
4. Create .env file backend-api:
```
# GCP project id
PROJECT_ID= your gcp project id
# gcs buckets
BUCKET_NAME= your cloud Storage bucket name 
# pubsup topics
TOPIC_NAME= 
DOCUMENT_UPLOADED_TOPIC= pubsup topic for document upload
There are other topics created based on events you can check them in /cloud-funcation folder
# function urls
PROCESS_MEATDATA_FUNCTION_HTTP=
There are other functions created based on events you can check them in /cloud-funcation folder
```

5. Generate a new Serviceaccounts with a key for generateSignedUrl funcation in backend-api folder server.js file.

---

## 📌 Notes
* Ensure billing is enabled on GCP.
* Enable required APIs such as: Cloud Storage, Pub/Sub, and Cloud Run Functions.