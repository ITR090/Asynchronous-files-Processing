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
  - extract-translate-text-function
  - landmark-detection-funcation
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
# Port for backend server
PORT=8080   
# GCP project id
PROJECT_ID=
# gcs buckets
BUCKET_NAME=
# function http urls
# landmark detection function
LANDMARK_DETECTION_FUNCTION_HTTP=
# document translation function
EXTRACT_TRANSLATE_TEXT_FUNCTION_HTTP=
```

5. Generate a new Serviceaccounts with a key for generateSignedUrl funcation in backend-api folder server.js file.

---

## 📌 Notes
* Ensure billing is enabled on GCP.
* Enable required APIs such as: Cloud Storage, Pub/Sub, Cloud Translation API and Cloud Run Functions.

Vite Website : https://fullstack-app-afp-69338693715.europe-west1.run.app/