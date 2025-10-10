# AI Clinical Trial Predictor

**AI Clinical Trial Predictor** is a web-based platform designed to assist researchers and clinicians in predicting the outcomes of clinical trials using advanced AI models. The system provides insights, success/failure predictions, and statistical analysis to facilitate better decision-making in clinical research.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

---

## Features

- **Dashboard Overview**: Displays total analyses, AI predictions, and success/failure statistics.
- **AI Insights**: Provides AI-generated insights about trial success probabilities.
- **Success vs Failure Chart**: Visual representation of prediction outcomes.
- **Recent Analyses**: Lists the latest clinical trials analyzed.
- **Quick Actions**: Export data and create new analyses easily.
- **Responsive Design**: Works on desktop, tablet, and mobile devices.

---

## Tech Stack

- **Frontend**: EJS, HTML, CSS, TailwindCSS, Font Awesome
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Module**: Node.js AI model integration (prediction engine)

---

## Installation

1. Clone the repository:
   ```bash
   https://github.com/shrikantmore123/AI-Clinical-Trial-Predictor.git 
   ```

2. Navigate to the project folder:
    ```bash
    cd ai-clinical-trial-predictor
    ```

3. Install dependencies::
    ```bash
    npm install
    ```

4. Create a .env file in the root directory and add:
    ```bash
    OPENAI_API_KEY="<api_key>"
    ```
5. Start the server:
    ```bash
    node app.js
    ```
    OR
    ```bash
    nodemon app.js
    ```
6. Open your browser and navigate to:
    ```bash
    http://localhost:3000
    ```