import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import EmailList from './components/EmailList';
import EmailDetails from './components/EmailDetails';
import Chatbot from './components/Chatbot';
import './styles.css';
import axios from 'axios';

const App = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [emails, setEmails] = useState([]);
    const [timeRange, setTimeRange] = useState('last_hour');
     const [isAuthorized, setIsAuthorized] = useState(false);
    const [newEmails, setNewEmails] = useState([]);
    const [manualInput, setManualInput] = useState('');
    const [filteredEmails, setFilteredEmails] = useState([]);


    const fetchEmails = React.useCallback(async () => {
      try {
          const response = await axios.post('http://127.0.0.1:5000/api/emails', {
             time_range: timeRange,
         });
         setEmails(response.data);
      } catch (error) {
          console.error('Error fetching emails:', error);
          setEmails([])
      }
  },[timeRange]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthorized');
    if (storedAuth === 'true') {
       setIsAuthorized(true);
        fetchEmails();
   }
}, [fetchEmails]);
 useEffect(() => {
  if (isAuthorized) {
     fetchEmails();
  }
}, [timeRange, isAuthorized, fetchEmails]);

    const handleSelectEmail = (email) => {
        setSelectedEmail(email);
    };
    const handleTimeRangeChange = (e) => {
        setTimeRange(e.target.value);
    }
    const handleEmailAction = async (action) => {
        if (!selectedEmail) return;
      try{
         const response = await axios.post('http://127.0.0.1:5000/api/actions', {
           action: action,
           email: selectedEmail
         })
        console.log(response.data)
         fetchEmails();
        setSelectedEmail(null);
      }
        catch (error) {
           console.error('Error processing action: ', error);
        }
    }
      const handleAuthorization = () => {
        // Redirect to Google authorization
        window.location.href = "https://console.cloud.google.com/apis/credentials?project=<your-project-id>";
    };
    const handleEmailConnected = () => {
        localStorage.setItem('isAuthorized', 'true');
        setIsAuthorized(true);
    };
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
          reader.onload = (event) => {
            try {
                 const fileContent = event.target.result;
                  setNewEmails([...newEmails, {
                    subject: 'Uploaded File',
                    from_email: 'File Upload',
                    to_email: 'you@example.com',
                    page_content: fileContent,
                    id:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                }])
            } catch (error) {
               console.error('Error processing file:', error);
            }
        };
           reader.readAsText(file);
    };
   const handleManualInputChange = (e) => {
        setManualInput(e.target.value);
    };

    const handleAddManualEmail = () => {
        if (manualInput.trim()) {
            setNewEmails([...newEmails, {
                subject: 'Manual Input',
                from_email: 'Manual Entry',
                to_email: 'you@example.com',
                page_content: manualInput,
                 id:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }])
            setManualInput('');
        }
    };
    const handleSetFilteredEmails = (filtered) => {
        setFilteredEmails(filtered)
    }
    const handleResetEmails = () => {
        setFilteredEmails([])
    }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
   };

    return (
      <Router>
        <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
             <div className="toggle-container">
                <span className="toggle-label">Dark Mode</span>
                    <label className="toggle-switch">
                        <input type="checkbox" onChange={toggleDarkMode} />
                        <span className="toggle-slider"></span>
                    </label>
            </div>
           <Header onConnectEmail = {handleAuthorization} isAuthorized = {isAuthorized} onEmailConnected = {handleEmailConnected} />
          <div className="main-content">
               <div style={{display: "flex", flexDirection: "column", width: "200px"}}>
                   {!isAuthorized && (
                      <div className={`no-emails ${isDarkMode ? 'dark-mode' : ''}`}>
                            Please Connect Your Email
                      </div>
                   )}
                    {isAuthorized && (
                   <>
                     <select className={`dropdown ${isDarkMode ? 'dark-mode' : ''}`} value={timeRange} onChange={handleTimeRangeChange}>
                         <option value="last_hour">Last Hour</option>
                         <option value="last_2_hours">Last 2 Hours</option>
                         <option value="last_4_hours">Last 4 Hours</option>
                         <option value="last_16_hours">Last 16 Hours</option>
                         <option value="last_24_hours">Last 24 Hours</option>
                      </select>
                       <button onClick = {handleResetEmails} className = {`reset-button ${isDarkMode ? 'dark-mode' : ''}`}> Reset Emails </button>
                     <EmailList emails={filteredEmails.length > 0 ? filteredEmails : [...emails, ...newEmails]} onSelectEmail={handleSelectEmail} className={isDarkMode ? 'dark-mode' : ''}/>
                    <div className="upload-container" >
                         <input
                            type="file"
                            accept=".txt,.csv,.json,.eml"
                             onChange={handleFileUpload}
                        />
                     </div>
                    <div className="manual-input">
                        <textarea
                          placeholder="Enter emails manually..."
                         value={manualInput}
                          onChange={handleManualInputChange}
                         />
                     <button onClick={handleAddManualEmail}>Add Email</button>
                     </div>
                  </>
                 )}
             </div>
             <EmailDetails email={selectedEmail} className={isDarkMode ? 'dark-mode' : ''}  onAction={handleEmailAction}/>
           </div>
             <Chatbot isDarkMode = {isDarkMode} emails = {[...emails, ...newEmails]} setEmails = {handleSetFilteredEmails}/>
        </div>
        </Router>
    );
};

export default App;