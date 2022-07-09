import React, { useState } from "react";
import Onboarding from "./Onboarding";

import 'animate.css';

export default function App() {
  const [userStatusRef] = useState(true);

  return (
    <React.Fragment>
      <div className="app-wrapper m-24">
        { userStatusRef ? <Onboarding /> : <p>existing user</p> }
      </div>
    </React.Fragment>
  )
}