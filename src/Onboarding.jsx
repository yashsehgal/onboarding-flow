import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');

export default function Onboarding() {
    const [onboardingRef, setOnboarding] = useState(false);
    return (
        <React.Fragment>
            <ReactModal isOpen={onboardingRef} onRequestClose={() => setOnboarding(false)}>

            </ReactModal>
        </React.Fragment>
    )
}