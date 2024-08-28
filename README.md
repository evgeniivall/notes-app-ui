# Notes Application

## Project Description

**Notes App** (working title) is a note-taking application developed as a practical project to sharpen full-stack development skills. It leverages modern web technologies and follows a microservices architecture to ensure modularity and scalability. While the current version includes core note-taking features, future phases aim to introduce AI-powered enhancements to improve note organization and user experience.

You can try the app via [this link](https://main.d32f0o7twntssy.amplifyapp.com/).

I’d also love to hear your feedback! Please share your thoughts using [this feedback form](https://easyretro.io/publicboard/L4GzSrtV29OyrKGaCrBKZ0GBgiJ3/2065fb31-fedc-4093-8ad8-a43f601cf6be).

![App screenshot](https://github.com/evgeniivall/notes-app-ui/blob/development/app-screenshot.png)

### Current State
The project is currently in its early stages, featuring basic functionality without backend integration. All data is stored locally in the browser. Check the roadmap section to see upcoming features.

#### Features:
- **Dark Mode**: A visually appealing dark-themed design.
- **Responsive Design**: Fully adapted for both mobile and desktop devices.
- **Folders**: Organize your notes into custom folders, with the option to choose folder colors for better categorization.
- **Tags**: Create and assign tags to notes, and easily filter them based on tags.
- **Starred Notes**: Mark important notes as starred for quick access.
- **Archive**: Deleted notes are moved to an archive where you can permanently delete or restore them.

### Roadmap

| **Iteration** | **Features** | **Description** | **Goals** | **Status** |
|---|---|---|---|---|
| **Iteration #1** | Basic Functionality | Core notes functionality including folders, tags, and search features. Notes are stored in browser storage. | Validate design decisions. | Released |
| **Iteration #2** | MVP | Backend integration with authentication. Users can create accounts to access notes from different devices. | Establish user accounts and multi-device access. | Development |
| **Iteration #3** | Rich Text Editor Support | Implement rich text editing, allowing users to format notes with text styles, lists, etc. | Enhance user experience and note formatting options. | Planned |
| **Iteration #4** | AI-Powered Enhancements | Integrate AI to assist users in enhancing and organizing their notes. | Add value with AI-driven features for smarter note-taking. | Planned |


### Technologies Used

- **Frontend**: React, React Router, Redux, CSS Modules
- **Containerization**: Docker
- **Build Tool**: Vite


## Getting Started
### Prerequisites
Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/) (optional, if you want to run the app in a container)

### Run the Application (Local Development)
1. Install dependecies
```
npm install
```
2. Run the App in Development Mode
```
npm run dev
```

### Build for Production
To build the app for production, use the following command. The build output will be placed in the `dist/` folder:
```
npm run build
```

### Running the App with Docker
If you prefer to run the app in a Docker container, follow these steps:
1. Build the Docker Image
From the root directory of the project, run:
```
docker build -t notes-app .
```
2. Run the Docker Container
After the image is built, you can run it using:
```
docker run -p 8080:80 notes-app
```
