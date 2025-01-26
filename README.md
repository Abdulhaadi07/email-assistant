
# Intelligent Email Assistant with Interactive Chatbot 🤖✉️

This project is a sophisticated web application designed to enhance email management through an intelligent AI assistant. It combines advanced natural language processing with Google API integration, providing a seamless and efficient email handling experience. The system is built using a React frontend and a Python Flask backend, offering robust performance and flexibility.

## Key Features

*   **Intelligent Email Handling:** The application leverages AI to categorize, prioritize, and draft responses to emails. 📧
*   **Seamless Google Integration:** Direct connection with Gmail and Google Calendar through API integration facilitates email retrieval, calendar event scheduling, and general organization. 🗓️
*   **Interactive Chatbot:** An integrated chatbot provides:
    *   **Contextual Assistance:** Guidance on using the application, especially for tasks like email authorization. 🙋‍♀️
    *   **Intelligent Email Filtering:** Users can filter displayed emails based on natural language queries. 🔍
    *   **Dual-Mode Responses:** Responses in both text and speech formats. 💬🎤
*   **Flexible Input Methods:** Load emails by uploading files or through manual input. 📝
*   **Customizable Experience:** Features like dark mode 🌙 and a time range selector ⏱️.
*   **Human-in-the-Loop Design:** The system works with the user, allowing them to review drafts, calendar invites, and respond to queries. 🔄

## Technology Stack

*   **Frontend:** React.js, styled with CSS.
*   **Backend:** Python Flask, with libraries like Langchain, OpenAI, Anthropic, and Google API libraries.
*   **API Provider:** Utilizes `aimlapi` for LLM and speech-to-text functionality.
*   **Deployment:** Designed for easy deployment using Vercel.

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed
*   Python 3.11 or higher installed
*   A Google Cloud Platform project with the Gmail and Calendar APIs enabled
*   An `aimlapi` account with API key
* A Vercel account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd email-assistant-app
    ```
2.  **Install backend dependencies:**
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
3.  **Install frontend dependencies:**
    ```bash
    cd ..
    npm install
    ```

### Configuration

1.  **Create a `.env` file** in the `backend` directory and add the following, and make sure to replace `<your-values>` with your values.
    ```
    EMAIL=<your-email-address>
    AIMLAPI_KEY=<your-aimlapi-key>
    ```
2.  **Google Credentials:**
    *   Download the `secrets.json` file from the Google Cloud Console page, and place it in the `eaia/.secrets` directory.
    *   Make sure that the `token.json` is present in the `eaia/.secrets` directory. This file is generated the first time you try to access the Google API.
    *   Update the Google Cloud Console to use the redirect url from the vercel deployment.
3.  **Create `config.yaml`:**
   *   Make sure that the `config.yaml` file inside the `eaia/main` directory has a valid configuration with your details.

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    flask --app backend/app.py --debug run
    ```
2.  **Start the frontend server:**
    ```bash
    cd ..
    npm start
    ```
    The application will be available at `http://localhost:3000` in your web browser.

## Deployment to Vercel

1.  **Install Vercel CLI:**
    ```bash
    npm install -g vercel
    ```
2.  **Login to Vercel:**
    ```bash
    vercel login
    ```
3.  **Deploy to Vercel:**
    ```bash
    vercel --prod
    ```
4.  **Set up Environment Variables in Vercel:**
    *  In Vercel project settings, add `EMAIL`, `AIMLAPI_KEY`, `GMAIL_TOKEN`, and `GMAIL_SECRET` environment variables.
5. **Update Google Cloud Console:**
   * Update the redirect URI of your Google Cloud Console API credentials with the Vercel deployed URL, and download the new `secrets.json` file and update the `GMAIL_TOKEN`, and `GMAIL_SECRET` environment variables in Vercel.
6. **Test Your Application:** Access the deployed URL to make sure everything is working fine.

## Additional Information

*   **`.env` File:**
    *   Make sure to create a `.env` file in the `backend` folder, and set your email address, and the `aimlapi` key there. Also make sure that you are keeping your `gmail_token` and `gmail_secret` also in this file, or in the Vercel environment variables.
*   **API Keys:**
    *   Make sure to keep your API keys secret and not commit them to your repository.
*   **Langchain API keys**: The OPENAI\_API\_KEY and ANTHROPIC\_API\_KEY environment variables are not needed, as they are not used.
