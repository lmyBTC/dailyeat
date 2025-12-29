/**
 * Article: Fish Oil
 * Handles interactive elements for the fish oil article page.
 */

(function () {
    // ---------------------------------------------
    // Progress Bar
    // ---------------------------------------------
    function updateProgressBar() {
        const progressBar = document.getElementById("progressBar");
        if (!progressBar) return;

        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / documentHeight) * 100;
        progressBar.style.width = scrollPercentage + "%";
    }

    // ---------------------------------------------
    // Table of Contents Highlighting
    // ---------------------------------------------
    function highlightTOC() {
        // Only run if TOC links exist
        const navLinks = document.querySelectorAll(".toc-link");
        if (navLinks.length === 0) return;

        const sections = document.querySelectorAll("section[id]");
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    // ---------------------------------------------
    // FAQ Toggle Interaction
    // ---------------------------------------------
    function initFAQs() {
        document.querySelectorAll(".faq-question").forEach((question) => {
            question.addEventListener("click", () => {
                const item = question.parentElement;
                item.classList.toggle("active");

                // Close other FAQ items (Optional: can be removed if multiple open is allowed)
                document.querySelectorAll(".faq-item").forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                    }
                });
            });
        });
    }

    // ---------------------------------------------
    // Quick Test / Self-Check Interaction
    // ---------------------------------------------
    function initTestOptions() {
        document.querySelectorAll(".test-option").forEach((option) => {
            option.addEventListener("click", function () {
                const checkbox = this.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                this.classList.toggle("selected", checkbox.checked);

                // For fish oil type test (single selection) - if existing
                if (checkbox.name === "fish-oil-type") {
                    document
                        .querySelectorAll('input[name="fish-oil-type"]')
                        .forEach((cb) => {
                            if (cb !== checkbox) {
                                cb.checked = false;
                                cb.parentElement.classList.remove("selected");
                            }
                        });
                }

                // Count checked items for need test
                if (checkbox.name === "need-test") {
                    const checkedCount = document.querySelectorAll(
                        'input[name="need-test"]:checked'
                    ).length;
                    const resultText = document.querySelector(
                        ".quick-test p:last-child"
                    );
                    if (resultText && checkedCount >= 2) {
                        resultText.style.color = "#dc2626";
                        resultText.innerHTML = `您已符合 ${checkedCount} 個項目，補充高品質 Omega-3 可能對您有顯著幫助。`;
                    }
                }
            });
        });
    }

    // ---------------------------------------------
    // Initialization
    // ---------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
        // Init logic
        initFAQs();
        initTestOptions();

        // Components Initialization (Deus / Header / Footer)
        // These are typically globally available if their scripts are loaded

        // Initialize Analytics Component
        if (window.DeusAnalyticsComponent) {
            new window.DeusAnalyticsComponent().setDebug(false).setEnvironment("production");
        }

        // Initialize Header Component
        const headerContainer = document.getElementById("header-component");
        if (headerContainer && window.DeusHeaderComponent) {
            new window.DeusHeaderComponent(headerContainer).setDebug(false);
        }

        // Initialize Footer Component
        const footerContainer = document.getElementById("footer-component");
        if (footerContainer && window.DeusFooterComponent) {
            new window.DeusFooterComponent(footerContainer).setDebug(false);
        }

        // Initialize Related Articles Component
        const relatedContainer = document.getElementById("related-articles-container");
        const articleId = document.body.dataset.articleId;
        if (relatedContainer && window.RelatedArticlesComponent && typeof articlesData !== 'undefined' && typeof topicArticles !== 'undefined') {
            new window.RelatedArticlesComponent(relatedContainer, articleId, articlesData, topicArticles).initialize();
        }

        // Initialize Responsive TOC Component
        if (window.ResponsiveTocComponent) {
            new window.ResponsiveTocComponent().initialize();
        }

        // Initial call for TOC highlight
        highlightTOC();
    });

    // Scroll listeners
    window.addEventListener("scroll", () => {
        updateProgressBar();
        highlightTOC();
    });

})();
