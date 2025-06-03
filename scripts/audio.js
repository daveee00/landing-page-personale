document.addEventListener('DOMContentLoaded', () => {
    const selectorAudio = document.querySelector('#selector-audio');
    const audioButton = document.querySelector('#audio-button');
    const mainElement = document.querySelector('main');
    let isRight = false;

    if (selectorAudio && audioButton) {
        // Add transition style
        audioButton.style.transition = 'justify-content 0.5s ease-out, opacity 0.3s ease-in-out';
        audioButton.style.opacity = '0';
        
        selectorAudio.addEventListener('click', () => {
            isRight = !isRight;
            audioButton.style.justifyContent = isRight ? 'right' : 'left';
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
