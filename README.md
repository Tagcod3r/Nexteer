# Nexteer
# Map It Right – Smart Parking Spot Finder  
### Developed by Team GEAR 5 | Hackathon 1.0  

**Map It Right** is a smart, AI-driven parking management web application designed to simplify the urban parking experience.  
It enables users to find, book, and navigate to nearby parking spaces in real time, powered by computer vision and geolocation technologies.

---

## Problem Statement

The project aims to address two major challenges in parking management:

1. Manual check-in and check-out processes for parking spaces.  
2. Excessive time spent by users searching for available parking slots.

---

## Proposed Software Solution

**Map It Right** integrates artificial intelligence, cloud computing, and web technologies to automate and optimize parking operations.

- The system receives 30-second CCTV footage every 15 minutes.  
- The AI model, built using **OpenCV** and **Support Vector Machine (SVM)**, processes video frames to classify parking slots as *occupied* or *available*.  
- Processed data is stored in the database, including:
  - Total number of slots  
  - Available slots  
  - Slot occupancy array (boolean values)  
  - Timestamp of the last update  
- The frontend application fetches live updates from the database and displays them on an interactive map.  
- When a user selects a destination, nearby parking areas with real-time availability indicators are shown.  
- A **priority queue** mechanism ensures fair allocation and prevents duplicate slot access.  
- Upon exit, the system automatically calculates the total parking duration and generates the final cost.

---

## Features

### User-Oriented
- Destination-based search for nearby parking spots.  
- Interactive map displaying real-time slot availability.  
- Responsive and intuitive UI built using **React.js** and **Bootstrap 5**.  
- Secure authentication and session management.  

### System-Oriented
- Real-time AI-driven detection of parking occupancy.  
- Cloud-based database integration for live updates.  
- Automatic slot blocking and unblocking during bookings.  
- Dynamic cost estimation based on duration.  
- Scalable architecture supporting IoT and CCTV camera networks.

---

## Machine Learning Model

- **Algorithm:** Support Vector Machine (SVM)  
- **Type:** Supervised Machine Learning (Geometric Classifier)  
- **Concept:** The dataset is **linearly separable**, allowing SVM to determine an optimal hyperplane that differentiates between occupied and empty slots.  
- **Technology Stack:** OpenCV, NumPy, scikit-learn  
- **Workflow:**
  1. The system captures 30-second CCTV footage every 15 minutes.  
  2. The 30th frame is extracted and processed.  
  3. Each slot is classified as *occupied* or *available*.  
  4. Processed data is updated in the database for real-time access by the frontend.

---

---

## Tech Stack

**Frontend:** React.js, Bootstrap 5, React Router, Lottie Animations, OpenStreet Map API
**Backend:** Node.js, Express.js, bcrypt, JWT, dotenv, body-parser, cors  
**Database:** FireBase 
**AI Model:** Python, OpenCV, scikit-learn (SVM Classifier)  

---
## Preview  

### Architecture  
<p align="center">
  <img src="https://github.com/user-attachments/assets/b6f72b0a-01e4-44f7-9cdb-847f6e6d872b"
       alt="Architecture Diagram"
       width="500" height="500"
       style="border: 2px solid #cccccc; border-radius: 10px; padding: 4px;" />
</p>

---

### Data Flow: Model → Database  
<p align="center">
  <img src="https://github.com/user-attachments/assets/0f9925d2-69dc-4663-aa62-cef6cfe6fb85"
       alt="Data Flow"
       width="710" height="217"
       style="border: 2px solid #cccccc; border-radius: 10px; padding: 4px;" />
</p>

---

### User Interface  
<p align="center">
  <img src="https://github.com/user-attachments/assets/72745f41-0833-4858-a963-2400794c6d1b"
       alt="UI Screenshot 1"
       width="600"
       style="border: 2px solid #cccccc; border-radius: 10px; padding: 4px;" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d856c974-4c25-4b92-8de5-c92403026da0"
       alt="Processing Pipeline"
       width="500" height="700"
       style="border: 2px solid #cccccc; border-radius: 10px; padding: 4px;" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/3d0134c5-a6cc-47cd-846b-1fc87b5cf7ac"
       alt="UI Screenshot 2"
       width="600"
       style="border: 2px solid #cccccc; border-radius: 10px; padding: 4px;" />
</p>

---

Developed_By:
  Team: "Nexteer – Hackathon 1.0"
  Members:
    - "Cholaraju Adithya"
    - "Akshith V"
    - "Chandan U"
    - "Arya Pai"
