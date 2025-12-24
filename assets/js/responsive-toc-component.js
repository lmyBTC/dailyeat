(function(global) {
    'use strict';

    class ResponsiveTocComponent {
        constructor() {
            this.sidebar = document.getElementById('sidebar');
            this.tocElement = document.querySelector('.toc');
            this.tocTitle = document.querySelector('.toc-title');
            this.mobileTarget = document.getElementById('toc-mobile-target');
            this.breakpoint = 1024;
            this.debouncedMove = this._debounce(this.moveToc.bind(this), 100);
        }

        initialize() {
            if (!this.sidebar || !this.tocElement || !this.mobileTarget || !this.tocTitle) {
                console.warn('Responsive TOC Component: Required elements not found. Aborting.');
                return;
            }

            this.tocTitle.addEventListener('click', this.toggleAccordion.bind(this));
            window.addEventListener('resize', this.debouncedMove);
            this.moveToc();
        }

        moveToc() {
            const isMobile = window.innerWidth <= this.breakpoint;

            if (isMobile) {
                if (!this.tocElement.classList.contains('toc-is-mobile')) {
                    this.tocElement.classList.add('toc-is-mobile');
                    this.tocElement.classList.add('open'); // Default to open on mobile
                    this.mobileTarget.appendChild(this.tocElement);
                }
            } else {
                if (this.tocElement.classList.contains('toc-is-mobile')) {
                    this.tocElement.classList.remove('toc-is-mobile');
                    this.tocElement.classList.remove('open'); // Ensure it's closed when moving back
                    this.sidebar.appendChild(this.tocElement);
                }
            }
        }

        toggleAccordion() {
            if (this.tocElement.classList.contains('toc-is-mobile')) {
                this.tocElement.classList.toggle('open');
            }
        }

        _debounce(func, wait) {
            let timeout;
            return function(...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }
    }

    global.ResponsiveTocComponent = ResponsiveTocComponent;

})(window);