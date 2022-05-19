import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');

export default function Onboarding() {

    const [onboardingRef, setOnboarding] = useState(false);
    const [currentOnboardingViewRef, setCurrentOnboardingView] = useState(0);
    const [contentForOnboardingRef, setContentForOnboarding] = useState(manageOnboardingContent_onSlide());

    // button visibilty states
    const [previousButtonVisibilityRef, setPreviousButtonVisibility] = useState("none");
    const [nextButtonContentRef, setNextButtonContent] = useState("next");
    console.log(contentForOnboardingRef.totalSlideCount);
    
    useEffect(() => {
        // fetching content to show in the modal
        setContentForOnboarding(manageOnboardingContent_onSlide(currentOnboardingViewRef));
        
        // managing visibility states for buttons
        
        // previous button will be set as none(in terms of display) 
        // when currentOnboardingViewRef === 0 (initial screen view)
        currentOnboardingViewRef !== 0 ? setPreviousButtonVisibility("block") : setPreviousButtonVisibility("none");
        
        // next button text content will be getting changed
        // once the user is on the ending slide (lastIndex slide)
        currentOnboardingViewRef === contentForOnboardingRef.totalSlideCount ? setNextButtonContent("get started 🚀") : setNextButtonContent("next");
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
                isOpen={onboardingRef && contentForOnboardingRef.totalSlideCount !== -1 ? true : false} 
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
                    <span className="new-feature-tag-slot w-fit h-fit">
                        {contentForOnboardingRef.content.newFeatureTag ? <p className="w-fit h-fit text-xs font-bold text-purple-500">NEW FEATURE</p> : <React.Fragment></React.Fragment>}
                    </span>
                    <h1 className="leading-snug text-2xl font-medium text-white mt-2">{contentForOnboardingRef.content.featureTitle}</h1>
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
                                className="text-white font-medium px-3 py-1.5 rounded-sm bg-white bg-opacity-40 uppercase" 
                                onClick={() => {
                                    setCurrentOnboardingView(currentOnboardingViewRef - 1);
                                }}
                                style={{
                                    display: previousButtonVisibilityRef
                                }}
                            >
                                Previous
                            </button>
                            <button
                                className="text-white font-medium px-3 py-1.5 rounded-sm bg-purple-500 uppercase"
                                onClick={() => {
                                    if (currentOnboardingViewRef < contentForOnboardingRef.totalSlideCount) {
                                        setCurrentOnboardingView(currentOnboardingViewRef + 1);
                                    }
                                }}
                            >
                                {nextButtonContentRef}
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </React.Fragment>
    )
}

function manageOnboardingContent_onSlide(currentState=0) {
    let onboardingContent = [
        {
            newFeatureTag: true,
            featureTitle: "Visualiser",
            featureDescription: "Visualiser for your managing EDA Driven APIs, visually",
            featureScreenshots: [

            ]
        }    
    ];

    return { content: onboardingContent[currentState], totalSlideCount: onboardingContent.length - 1};
}