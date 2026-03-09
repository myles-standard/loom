# Media Magic Roadmap
This roadmap provides a list of activities necessary to achieve app functionality.

## Phase 1: FFmpeg Engine Setup
**Goal: Enable Node.js backend to talk to the system's media processor.**

### Prerequisites:
* [x] Install FFmpeg: Download it from ffmpeg.org. Ensure the bin folder is in the System PATH.
* [x] Verify: Open the terminal and run ffmpeg -version.

### Implementation Steps
1. Run npm install fluent-ffmpeg in your /backend folder.
2. Create a utility file backend/utils/converter.js to handle the logic.

### Checklist
* [x] Install fluent-ffmpeg.
* [ ] Create a test script to convert a local video.
* [ ] Log "Conversion Complete" to the console.

## Phase 2: Secure File Uploads
**Goal:** Allow the React frontend to send video files to the Express server.

### Dependencies
**Multer:** npm install multer (Middleware for handling multipart/form-data).

### Backend Strategy
* Storage Engine: Configure Multer to store files in a uploads/ directory.
* Validation: Restrict file types to .mp4, .mov, and .avi.
* Unique Naming: Use Date.now() to prevent filename collisions.

### Checklist
* [ ] Create backend/uploads folder.
* [ ] Add uploads/ to your .gitignore.
* [ ] Test POST /api/upload using Postman or Insomnia.

## Phase 3: The React "Media Drop" UI
**Goal:** Build a user-friendly interface to trigger the conversion.

### Dependencies
**Axios:** npm install axios (For the API calls).

**Lucide React:** npm install lucide-react (For clean icons).

### Frontend Components
* Dropzone: Use a state to hold the selected file.
* Progress Bar: Create a visual indicator that fills as the upload completes.
* Preview Window: Use a standard \<video\> tag with a URL.createObjectURL(file) to show the user what they uploaded before processing.

### Checklist
* [ ] Build a "Choose File" button in React.
* [ ] Connect the button to your Backend upload endpoint.
* [ ] Display the "Success" message from the server on the UI.