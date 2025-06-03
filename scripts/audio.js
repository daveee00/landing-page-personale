document.addEventListener('DOMContentLoaded', () => {
    const selectorAudio = document.querySelector('#selector-audio');
    const audioButton = document.querySelector('#audio-button');
    const mainElement = document.querySelector('main');
    let isRight = false;

    if (selectorAudio && audioButton) {
        // Add transition style
        audioButton.style.transition = 'justify-content 0.5s ease-out, opacity 0.3s ease-in-out';
        audioButton.style.opacity = '0';
        
        // Set initial background image
        selectorAudio.style.backgroundImage = 'url(https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/icons/off.svg)';
        selectorAudio.style.backgroundSize = '60%';
        selectorAudio.style.backgroundPosition = 'center';
        selectorAudio.style.backgroundRepeat = 'no-repeat';
        
        // Add hover effect for audio button
        audioButton.addEventListener('mouseenter', () => {
            audioButton.style.opacity = '1';
        });
        
        audioButton.addEventListener('mouseleave', () => {
            if (mainElement.getBoundingClientRect().bottom > 0) {
                audioButton.style.opacity = '0';
            }
        });
        
        selectorAudio.addEventListener('click', () => {
            isRight = !isRight;
            audioButton.style.justifyContent = isRight ? 'right' : 'left';
            // Update background image based on state
            selectorAudio.style.backgroundImage = isRight 
                ? 'url(https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/icons/on.svg)'
                : 'url(https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/icons/off.svg)';
        });

        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === mainElement) {
                    // When main is not visible, show audio button
                    if (!entry.isIntersecting) {
                        audioButton.style.opacity = '1';
                    } else {
                        // When main comes back into view, hide audio button
                        audioButton.style.opacity = '0';
                    }
                }
            });
        }, {
            threshold: 0 // Trigger when main is completely out of view
        });

        // Start observing main element
        observer.observe(mainElement);
    }
});
