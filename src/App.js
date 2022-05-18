import React, { useEffect, useState } from "react";
import Onboarding from "./Onboarding";

export default function App() {
  const [userStatusRef, setUserStatus] = useState(true);

  return (
    <React.Fragment>
      <div className="app-wrapper">
        { userStatusRef ? <Onboarding /> : <p>existing user</p> }
      </div>
    </React.Fragment>
  )
}