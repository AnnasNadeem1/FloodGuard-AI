FloodGuard AI
FloodGuard AI is a full-stack disaster management application designed to assess flood severity using Artificial Intelligence. It integrates Computer Vision (ResNet18) and Natural Language Processing (DistilBERT) to analyze user-uploaded images and text descriptions, providing a severity assessment (Severe, Moderate, or None).

Features
AI Analysis: Multi-modal analysis using PyTorch models to detect flood presence and severity from images and text.

User Authentication: Secure Login and Registration system using JWT/Sessions (MongoDB).

Reporting System: Users can save analysis results, view report history, and track disaster locations.

Emergency Hub: Dedicated page for Pakistan's emergency services (NDMA, Rescue 1122) with direct call functionality.

Full-Stack Architecture: Decoupled architecture with a React frontend, NestJS backend, and Python AI microservice.

Tech Stack
Frontend: React.js (Vite), Tailwind CSS, Lucide React

Backend: NestJS, MongoDB (Mongoose), Multer (File Handling)

AI Service: Python, FastAPI, PyTorch, Transformers (Hugging Face)

Database: MongoDB

Project Structure
The repository is organized into three main services:

Plaintext

FloodGuard-AI/
├── disaster-relief-app/   # Frontend (React)
├── disaster-backend/      # Backend (NestJS)
└── ai_service/            # AI Microservice (Python/FastAPI)
Prerequisites
Before running the project, ensure you have the following installed:

Node.js (v16+)

Python (v3.8+)

MongoDB (Running locally on port 27017)

Installation & Setup
1. Clone the Repository
Bash

git clone https://github.com/AnnasNadeem1/FloodGuard-AI.git
cd FloodGuard-AI
2. Setup Backend (NestJS)
Navigate to the backend folder and install dependencies.

Bash

cd disaster-backend
npm install
3. Setup Frontend (React)
Open a new terminal, navigate to the frontend folder, and install dependencies.

Bash

cd disaster-relief-app
npm install
4. Setup AI Service (Python)
Navigate to the AI service folder. It is recommended to use a virtual environment.

Bash

cd ai_service

# Create virtual environment (Optional but recommended)
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install requirements
pip install fastapi uvicorn torch torchvision transformers pillow python-multipart
5. Setup AI Models (Important)
Large model files are excluded from this repository to save space. You must place your trained models in the ai_service/models/ directory manually.

Required File Structure:

Plaintext

ai_service/
└── models/
    ├── flood_binary_resnet18.pth
    ├── flood_severity_resnet18_weighted.pth
    └── flood_text_model/
        ├── config.json
        ├── model.safetensors
        ├── tokenizer.json
        └── vocab.txt
Running the Application
You need to run all three services simultaneously in separate terminals.

1. Start Database Ensure MongoDB is running locally.

2. Start AI Service (Port 8000)

Bash

cd ai_service
python app_api.py
3. Start Backend (Port 3000)

Bash

cd disaster-backend
npm run start:dev
4. Start Frontend (Port 5173)

Bash

cd disaster-relief-app
npm run dev
Usage
Open your browser and navigate to http://localhost:5173.

Register/Login to create an account.

Go to the Analyze page.

Upload a flood-related image and add a text description.

Click Analyze to view the AI prediction.

Click Save Result to add it to your history.

License
This project is created for educational and research purposes.
