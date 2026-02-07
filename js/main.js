// FormulaFourTech - Main JavaScript

// Navbar scroll effect
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
    }
});

// Scroll reveal animation using Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
    // Add fade-in-up class to animatable elements
    var animatableSelectors = [
        '.quality-card',
        '.industry-card',
        '.gartner-card',
        '.resource-card',
        '.value-card',
        '.service-detail-card',
        '.contact-info-card',
        '.job-card',
        '.perk-card',
        '.team-card',
        '.capability-row',
        '.testimonial-content'
    ];

    animatableSelectors.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.add('fade-in-up');
        });
    });

    // Intersection Observer for scroll animations
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in-up').forEach(function (el) {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Mobile mega menu toggle
    var megaDropdowns = document.querySelectorAll('.mega-dropdown > .nav-link');
    megaDropdowns.forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                var parent = this.parentElement;
                var isOpen = parent.classList.contains('mobile-open');
                // Close all other mega dropdowns
                document.querySelectorAll('.mega-dropdown.mobile-open').forEach(function (el) {
                    el.classList.remove('mobile-open');
                });
                if (!isOpen) {
                    parent.classList.add('mobile-open');
                }
            }
        });
    });

    // Close mobile navbar on link click
    var navCollapse = document.querySelector('.navbar-collapse');
    var navLinks = document.querySelectorAll('.mega-menu-item, .mega-link-arrow, .mega-tab');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navCollapse && navCollapse.classList.contains('show')) {
                var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // Search Overlay
    var searchOverlay = document.getElementById('searchOverlay');
    var searchInput = document.getElementById('searchInput');
    var searchClose = document.getElementById('searchClose');
    var searchSubmit = document.getElementById('searchSubmit');
    var searchBtn = document.querySelector('.btn-search');

    if (searchOverlay && searchBtn) {
        function openSearch() {
            searchOverlay.classList.add('active');
            setTimeout(function () {
                if (searchInput) searchInput.focus();
            }, 300);
        }

        function closeSearch() {
            searchOverlay.classList.remove('active');
            if (searchInput) searchInput.value = '';
        }

        searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (searchOverlay.classList.contains('active')) {
                closeSearch();
            } else {
                openSearch();
            }
        });

        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });

        // Handle search submit
        if (searchSubmit) {
            searchSubmit.addEventListener('click', function () {
                var query = searchInput ? searchInput.value.trim() : '';
                if (query) {
                    alert('Searching for: ' + query);
                    closeSearch();
                }
            });
        }

        // Handle Enter key in search input
        if (searchInput) {
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    var query = this.value.trim();
                    if (query) {
                        alert('Searching for: ' + query);
                        closeSearch();
                    }
                }
            });
        }
    }

    // Advocate Carousel
    var advocateSlides = document.querySelectorAll('.advocate-slide');
    var prevBtn = document.querySelector('.advocate-prev');
    var nextBtn = document.querySelector('.advocate-next');
    var advocateDots = document.querySelectorAll('.advocate-dot');
    var progressBar = document.querySelector('.advocate-progress-bar');
    var currentSlide = 0;
    var autoPlayInterval = null;
    var autoPlayDelay = 4000;

    function showSlide(index) {
        if (advocateSlides.length === 0) return;
        advocateSlides.forEach(function (slide) { slide.classList.remove('active'); });
        advocateDots.forEach(function (dot) { dot.classList.remove('active'); });
        currentSlide = (index + advocateSlides.length) % advocateSlides.length;
        advocateSlides[currentSlide].classList.add('active');
        if (advocateDots[currentSlide]) advocateDots[currentSlide].classList.add('active');
        resetProgress();
    }

    function resetProgress() {
        if (!progressBar) return;
        progressBar.style.animation = 'none';
        progressBar.offsetHeight; // trigger reflow
        progressBar.style.animation = 'advocateProgress ' + (autoPlayDelay / 1000) + 's linear forwards';
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(function () {
            showSlide(currentSlide + 1);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            showSlide(currentSlide - 1);
            startAutoPlay();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            showSlide(currentSlide + 1);
            startAutoPlay();
        });
    }

    advocateDots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            showSlide(parseInt(this.getAttribute('data-index')));
            startAutoPlay();
        });
    });

    if (advocateSlides.length > 1) {
        resetProgress();
        startAutoPlay();
    }

    // Counter animation for Gartner scores
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    var gartnerSection = document.querySelector('.gartner-section');
    if (gartnerSection) {
        counterObserver.observe(gartnerSection);
    }

    // Also animate metric numbers on about page
    var metricCards = document.querySelectorAll('.metric-number');
    metricCards.forEach(function (card) {
        counterObserver.observe(card.closest('.metric-card') || card);
    });
});

function animateCounters(section) {
    var counters = section.querySelectorAll('.gartner-score, .metric-number');
    counters.forEach(function (counter) {
        var text = counter.textContent.trim();
        var target, suffix, isDecimal;

        if (text.includes('/')) {
            target = parseFloat(text.split('/')[0]);
            suffix = ' / ' + text.split('/')[1].trim();
            isDecimal = true;
        } else if (text.includes('%')) {
            target = parseInt(text);
            suffix = '%';
            isDecimal = false;
        } else if (text.includes('+')) {
            target = parseInt(text);
            suffix = '+';
            isDecimal = false;
        } else {
            target = parseInt(text);
            suffix = '';
            isDecimal = false;
        }

        if (isNaN(target)) return;

        var current = 0;
        var increment = target / 50;
        var duration = 1200;
        var stepTime = duration / 50;

        var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (isDecimal) {
                counter.textContent = current.toFixed(1) + suffix;
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
}
