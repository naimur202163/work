# Isutra Core packages

## Backend

1. Express / Node.js
2. Sequelize - ORM for sql dialects
3. jsonwebtoken - authentication
4. bcryptjs - password hashing

## Frontend

1. Redux - State Management
2. React Router - Routing
3. Styling - Styled Components
4. Toast Notifications - React Toastify
5. Network calls - Axios
6. Video player - Videojs

## Features Implemented so far

1. Login/Signup
2. Upload video
3. Search video by channel name
4. Search video by title, description
5. Like/Dislike video
6. Subscribe/Unsubscribe from channels
7. Add comment
8. Edit profile (avatar, cover)
9. Liked videos
10. History

# Backend setup

1. Clone the isutra repo (contains express backend files in /isutra/src directory) package.json in root is for backend/express dependencies/scripts

```bash
# navigate to the root directory
cd isutra
```

2. Database connection using ElephantSQL

- ElephantSQL is a PostgreSQL database hosting service
- Signup for ElephantSQL using this [link](https://customer.elephantsql.com/signup)
- Create a new instance, US East AWS, Give it a name and any tags etc, once created click on the name, copy the database URL and enter in .env in step 3

3. Create a .env file at the root directory with the following contents

```bash
JWT_SECRET=pewdiepie # opt for more secure secret, enter any secret key here
JWT_EXPIRE=30d
DATABASE_URL=[YOUR_DB_CONNECTION_URL]

CLOUDINARY_API_KEY=somekey
CLOUDINARY_API_SECRET=somesecret
CLOUDINARY_CLOUD_NAME=isutra

STRIPE_SECRET_KEY=sk_test_GvsuLRTscISldesxtmdOXU4b00ytPGcc6Z
SUBSCRIPTION_PLAN_5=price_1IcnFAFrBwhwu8k51wwPWtop
SUBSCRIPTION_PLAN_10=price_1IcnIIFrBwhwu8k5ccDbCvvM
```

4. Instal the dependencies from the root directory

```bash
npm i
```

5. Run the backend server.

```bash
npm run dev
```

The Backend server is configured to run on port http://localhost:5000/ locally. This can be changed if desired in the src/server.js file.

NOTE: The most typical setup when running locally is to run the Backend and Frontend servers each in their own separate terminals. In Production, the Frontend files are served static from the src/client/build folder and runs on only 1 server. The plus of having both the Frontend and Backend running at the same time while doing development locally is you can update files in React/Redux (anything in Client) without having to run a "npm run build" after each change.

# Frontend setup

NOTE: The Frontend React files are located in /isutra/src/client and the server runs on port 3000:

1. Cloudinary setup and adding upload preset:

- Cloudinary is a cloud-based image and video hosting service
- Signup for cloudinary using this [link](https://cloudinary.com/signup)
- Once account is created, from your dashboard goto "settings" (gear icon), click the "upload" tab, scroll down to the "upload presets" section, Choose "Add upload preset", Give the preset a name, set Signing mode = "unsigned", give a folder name (e.g. media) where the isutra upload files will be stored, leave everything else as default and save.
- Copy/Paste the cloud preset name you just created
- In the isutra/src/client/src/utils/index.js file, paste your preset name that was copied above:

```bash
formData.append("upload_preset", "<YOUR_PRESET_NAME>"); // paste your preset name from Cloudinary here
```

- Go back to the Cloudinary dashboard, copy your "Cloud Name" and paste that in the <YOUR_CLOUD_NAME> of the .env (steps below)
- Also copy your <YOUR_PRESET_NAME>" into the REACT_APP_CLOUDINARY_PRESET_NAME section of the .env (steps below)

```bash
# navigate to the client (frontend files) directory
cd /isutra/src/client
```

2. Create a .env file at the root directory of the client folder: /isutra/src/client/.env

3. Copy/Paste the following into the .env:

```bash
REACT_APP_BACKEND_URL=http://localhost:5000/api/v1/
REACT_APP_CLOUDINARY_ENDPOINT=https://api.cloudinary.com/v1_1/<YOUR_CLOUD_NAME>
REACT_APP_CLOUDINARY_PRESET_NAME=<YOUR_PRESET_NAME>
```

4. The Frontend React files are located at: /isutra/src/client and the server runs on port 3000:

5. Instal package.json dependencies in the /client directory

```bash
npm i
```

6. Start the Frontend client Server:

```bash
npm start
```

7. Congrats! If all steps were completed properly you should have Isutra running locally on your machine via http://localhost:3000

- This will be the entry point to the App's main UI
- The Express backend will still need to be running from another terminal as laid out in the Backend setup above.
