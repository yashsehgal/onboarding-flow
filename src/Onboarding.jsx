import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');

export default function Onboarding() {

    const [onboardingRef, setOnboarding] = useState(false);
    const [currentOnboardingViewRef, setCurrentOnboardingView] = useState(0);
    const [contentForOnboardingRef, setContentForOnboarding] = useState(manageOnboardingContent_onSlide());

    const [onboardingProgressBarWidthRef, setOnboardingProgressBarWidth] = useState('0%');

    // button visibilty states
    const [previousButtonVisibilityRef, setPreviousButtonVisibility] = useState("none");
    const [nextButtonContentRef, setNextButtonContent] = useState("next");
    console.log(contentForOnboardingRef.totalSlideCount);
    
    useEffect(() => {
        // fetching content to show in the modal
        setContentForOnboarding(manageOnboardingContent_onSlide(currentOnboardingViewRef));
        
        // changing the width of the progress bar according to the 
        // slide count (by defining a percentage value with the 
        // help of contentForOnboardingRef.totalSlideCount)
        setOnboardingProgressBarWidth(
            currentOnboardingViewRef ? `${contentForOnboardingRef.totalSlideCount*(currentOnboardingViewRef/100)*1000}%` : `0%`
        )

        if (currentOnboardingViewRef === contentForOnboardingRef.totalSlideCount) {
            setOnboardingProgressBarWidth('100%');
        }

        console.log(onboardingProgressBarWidthRef);

        // managing visibility states for buttons
        
        // previous button will be set as none(in terms of display) 
        // when currentOnboardingViewRef === 0 (initial screen view)
        currentOnboardingViewRef !== 0 ? setPreviousButtonVisibility("block") : setPreviousButtonVisibility("none");
        
        // next button text content will be getting changed
        // once the user is on the ending slide (lastIndex slide)
        currentOnboardingViewRef === contentForOnboardingRef.totalSlideCount ? setNextButtonContent("get started 🚀") : setNextButtonContent("next");
    }, [currentOnboardingViewRef, contentForOnboardingRef.totalSlideCount, onboardingProgressBarWidthRef]);

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
                        // removing default padding from modal
                        padding: '0px'
                    }
                }}
            >
                {/* start: progress bar animation section wrapper */}
                <div className="progress-bar-animation-section-wrapper h-fit w-full bg-white">
                    <div className="p-1 bg-purple-500" 
                        style={{
                            width: onboardingProgressBarWidthRef
                        }}
                    />
                </div>
                {/* end: progress bar animation section wrapper */}

                <div className="onboarding-popup-internal-content-wrapper p-6">
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
                        <h1 className="leading-snug text-3xl font-medium text-white mt-2">{contentForOnboardingRef.content.featureTitle}</h1>
                        <p className="leading-snug text-white text-opacity-50 text-sm font-normal">{contentForOnboardingRef.content.featureDescription}</p>
                        
                        <div 
                            className="onboarding-feature-screenshots-wrapper 
                                mt-3 w-auto py-3 h-fit max-h-[400px] overflow-hidden
                                flex flex-row items-center justify-start gap-2
                            "
                        >
                            <img 
                                src={contentForOnboardingRef.content.featureScreenshot}
                                alt={contentForOnboardingRef.content.featureTitle.toString().toLowerCase()}
                                id={contentForOnboardingRef.content.featureTitle.toString().toLowerCase()}
                                className="mx-auto"
                            />
                        </div>
                        <div className="navigation-component-wrapper">
                            {/* 
                                Legacy implementation for showing navigation slider,
                                currently, it's not working but saving it for future references
                            */}

                            {/* 
                                <ShowSlideNavigation 
                                    totalSlideCount={contentForOnboardingRef.totalSlideCount} 
                                    activeSlideIndex={currentOnboardingViewRef+1}    
                                /> 
                            */}
                        </div>
                    </div>
                    <div className="button-slots-wrapper mt-4 flex flex-row items-center justify-between">
                        <div className="left-button-slot w-fit h-fit flex flex-row items-center justify-center">
                            <button
                                className="text-purple-500 font-medium px-3 py-1.5 rounded-sm bg-purple-700 bg-opacity-40 hover:bg-opacity-50 uppercase bg-cover" 
                                onClick={() => setOnboarding(false)}
                            >
                                Skip
                            </button>
                        </div>
                        <div className="right-button-slot-wrapper">
                            <div className="right-button-slot w-fit h-fit flex flex-row items-center justify-center gap-4">
                                <button
                                    className="text-white font-medium px-3 py-1.5 rounded-sm bg-white bg-opacity-40 hover:bg-opacity-50 uppercase" 
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
                                    className="text-white font-medium px-3 py-1.5 rounded-sm bg-purple-600 hover:bg-purple-700 uppercase"
                                    onClick={() => {
                                        if (currentOnboardingViewRef < contentForOnboardingRef.totalSlideCount) {
                                            setCurrentOnboardingView(currentOnboardingViewRef + 1);
                                        }
                                        if (nextButtonContentRef.toLowerCase() !== "next") {
                                            setOnboarding(false);
                                        }
                                    }}
                                >
                                    {nextButtonContentRef}
                                </button>
                            </div>
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
            featureScreenshot: "https://placekitten.com/700/240"
        },
        {
            newFeatureTag: true,
            featureTitle: "Visualiser",
            featureDescription: "Visualiser for your managing EDA Driven APIs, visually",
            featureScreenshot: "https://placekitten.com/700/240"
        },
        {
            newFeatureTag: true,
            featureTitle: "Visualiser",
            featureDescription: "Visualiser for your managing EDA Driven APIs, visually",
            featureScreenshot: "https://placekitten.com/700/240"
        },
        {
            newFeatureTag: true,
            featureTitle: "Visualiser",
            featureDescription: "Visualiser for your managing EDA Driven APIs, visually",
            featureScreenshot: "https://placekitten.com/700/240"
        }    
    ];

    return { content: onboardingContent[currentState], totalSlideCount: onboardingContent.length - 1};
}

// showSlideCount is a sub-component here
// getting used to render the active-slide navigation feature

// function ShowSlideNavigation({activeSlideIndex=0, totalSlideCount}) {
//     let dotsContainer = [];
//     useEffect(() => {
//         for (let dotCount = 0; dotCount <= totalSlideCount; dotCount++) {
//             dotsContainer.push(
//                 dotCount === activeSlideIndex
//                     ? <React.Fragment>
//                         <div className="p-1 w-1 h-1 rounded-full bg-white" />
//                       </React.Fragment>
//                     : <React.Fragment>
//                         <div className="p-1 w-1 h-1 rounded-full bg-white bg-opacity-30" />
//                       </React.Fragment>
//             )
//         }
//     });
    
//     if (!totalSlideCount) return <React.Fragment></React.Fragment>;

//     if (!activeSlideIndex) {
//         return (
//             <React.Fragment>
//                 <div className="navigation-dots-component-wrapper w-fit h-fit flex flex-row items-center justify-between mx-auto gap-2 mt-2">
//                     {dotsContainer.map((dot, dotIndex) => {
//                         return (
//                             <React.Fragment key={dotIndex}>{dot}</React.Fragment>
//                         )
//                     })}
//                 </div>
//             </React.Fragment>
//         )
//     } else {
//         return (
//             <React.Fragment>

//             </React.Fragment>
//         )
//     }
// }