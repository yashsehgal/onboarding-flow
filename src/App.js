import React, { useEffect, useState } from "react";
import Onboarding from "./Onboarding";

import 'animate.css';

export default function App() {
  const [userStatusRef, setUserStatus] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('is-user-new') 
          || localStorage.getItem('is-user-new') === null 
          || localStorage.getItem('is-user-new') === 'pending') {
      localStorage.setItem('is-user-new', 'pending');
    } else {
      setUserStatus(false);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="app-wrapper m-24">
        { userStatusRef ? <Onboarding handleNewUserMethod={setUserStatus} /> : <WelcomeMessage /> }
      </div>
    </React.Fragment>
  )
}

function WelcomeMessage() {
  return (
    <React.Fragment>
      <div className="welcome-message-wrapper flex flex-col items-start gap-2 p-3 rounded-md bg-white bg-opacity-10 shadow-lg">
        <span className="welcome-title leading-snug text-lg font-semibold text-white">Welcome Developer</span>
        <span className="welcome-description leading-snug text-sm font-normal text-white text-opacity-60">
          Thanks for using studio.asyncapi.com
        </span>
        <span className="welcome-description leading-snug text-sm font-normal text-white text-opacity-60">
          To get started, Read the 
            <a 
              href="https://www.asyncapi.com/docs" 
              target="_blank" 
              rel="noreferrer"
              className="text-purple-500 hover:text-purple-400 ml-1"
            >
                docs
            </a>
        </span>
      </div>
    </React.Fragment>
  )
}