import React, { useState } from "react";
import Onboarding from "./Onboarding";

import 'animate.css';
import ReactResponsiveCarouselOnboarding from "./ReactResponsiveCarouselOnboarding";

export default function App() {
  const [userStatusRef] = useState(true);

  return (
    <React.Fragment>
      <div className="app-wrapper mt-8 grid gap-3 w-fit h-fit">
        { userStatusRef ? <Onboarding /> : <p>existing user says onboarding-manual</p> }
        { userStatusRef ? <ReactResponsiveCarouselOnboarding /> : <p>existing user says react-responsive-carousel-onboarding</p> }
      </div>
    </React.Fragment>
  )
}