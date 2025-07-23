/*
 * main.js
 * Handles all interactive elements of the portfolio.
 */

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Navbar scroll animation
     * Adds a 'scrolled' class to the header when the user scrolls down.
     */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /**
     * Intersection Observer for fade-in animations on scroll.
     * This is a performant way to handle scroll-triggered animations.
     */
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    });

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    /**
     * Project Modal Logic
     * Handles opening, closing, and populating the project detail modal.
     */
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('modal-close-btn');

    // Get modal content elements
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalRepoLink = document.getElementById('modal-repo-link');
    const modalLiveLink = document.getElementById('modal-live-link');

    // Function to open the modal and populate it with data
    const openModal = (card) => {
        // Get data from the clicked card's data-* attributes
        const title = card.dataset.title;
        const description = card.dataset.description;
        const image = card.dataset.image;
        const repoLink = card.dataset.linkRepo;
        const liveLink = card.dataset.linkLive;

        // Populate the modal
        modalImage.src = image;
        modalImage.alt = title; // Important for accessibility
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Handle links - show/hide based on if they exist
        if (repoLink) {
            modalRepoLink.href = repoLink;
            modalRepoLink.style.display = 'inline-block';
        } else {
            modalRepoLink.style.display = 'none';
        }

        if (liveLink) {
            modalLiveLink.href = liveLink;
            modalLiveLink.style.display = 'inline-block';
        } else {
            modalLiveLink.style.display = 'none';
        }

        // Show the modal
        modalOverlay.classList.add('active');
    };

    // Function to close the modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
    };

    // Add click event listeners to all project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    // Add event listeners for closing the modal
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        // Close only if the overlay itself is clicked, not the modal content
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Also close modal on 'Escape' key press for accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

});