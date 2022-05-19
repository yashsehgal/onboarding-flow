import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');

export default function Onboarding() {
    const [onboardingRef, setOnboarding] = useState(false);
    const [currentOnboardingViewRef, setCurrentOnboardingView] = useState(0);
    const [contentForOnboardingRef, setContentForOnboarding] = useState(manageOnboardingContent_onSlide());
    useEffect(() => {
        // fetching content to show in the modal
        setContentForOnboarding(manageOnboardingContent_onSlide(currentOnboardingViewRef));
    }, [currentOnboardingViewRef]);
    return (
        <React.Fragment>
            <button 
                className="text-white font-medium px-3 py-1.5 rounded-sm bg-purple-500" 
                onClick={() => setOnboarding(true)}
            >
                Start Onboarding
            </button>
            <ReactModal 
                isOpen={onboardingRef} 
                onRequestClose={() => setOnboarding(false)}
                style={{
                    overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.600)'
                    },
                    content: {
                        background: 'rgb(24, 0, 44)',
                        borderColor: 'transparent',
                        boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.360)',
                        width: 'fit-content',
                        height: 'fit-content',
                        // centering content
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginBottom: 'auto',
                        marginTop: 'auto',
                    }
                }}
            >
                <div 
                    className="text-white text-lg font-medium" 
                    style={{
                        width: '720px',
                        height: 'fit-content'
                    }}
                >
                    {contentForOnboardingRef.content}
                </div>
                <div className="button-slots-wrapper mt-4 flex flex-row items-center justify-between">
                    <div className="left-button-slot w-fit h-fit flex flex-row items-center justify-center">
                        <button
                            className="text-purple-500 font-medium px-3 py-1.5 rounded-sm bg-purple-700 bg-opacity-40 uppercase" 
                            onClick={() => setOnboarding(false)}
                        >
                            Skip
                        </button>
                    </div>
                    <div className="right-button-slot-wrapper">
                        <div className="right-button-slot w-fit h-fit flex flex-row items-center justify-center">
                            <button
                                className={" text-white font-medium px-3 py-1.5 rounded-sm bg-white bg-opacity-40 uppercase"} 
                                onClick={() => setCurrentOnboardingView(currentOnboardingViewRef - 1)}
                                style={{
                                    display: (currentOnboardingViewRef === 0 ? "none" : "block")
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className={currentOnboardingViewRef > contentForOnboardingRef.totalSlideCount ? "none" : "block" + " text-white font-medium px-3 py-1.5 rounded-sm bg-purple-500 uppercase"} 
                                onClick={() => setCurrentOnboardingView(currentOnboardingViewRef + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </React.Fragment>
    )
}

function manageOnboardingContent_onSlide(currentState=0) {
    let content;
    switch (currentState) {
        case 0:
            content = <p>slide 0</p>
        break;
        case 1:
            content = <p>slide 1</p>
        break;
        default: 
            content = <p>something went wrong</p>
        break;
    }
    return { content, totalSlideCount: 3};
}