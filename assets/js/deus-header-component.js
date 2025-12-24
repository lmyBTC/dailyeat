/**
 * Header 組件 - Shadow DOM 封裝
 * @class DeusHeaderComponent
 * @description 提供響應式網站 Header 導覽列
 * @compatibility 支援 2022 年以來的瀏覽器版本
 */
(function (global) {
  "use strict";

  class DeusHeaderComponent {
    constructor(hostElement) {
      // 建立 Shadow DOM
      this.hostElement = hostElement || document.body;
      this.shadowRoot = this.hostElement.attachShadow({ mode: "open" });

      // 初始化設定
      this._config = {
        debug: false,
        theme: "default",
        logo: "營養百科",
        logoUrl: "/index.html",
        showMobileMenu: false,
        navLinks: [
          { text: "營養素資料庫", href: "/category/nutrient-dashboard.html" },
          { text: "食物資料庫", href: "/category/foodWiki.html" },
          { text: "健康主題專區", href: "/category/health-topics.html" },
          { text: "健康工具箱", href: "/category/tools.html" },
          { text: "文章總覽", href: "/category/archive.html" },
          { text: "專屬優惠", href: "/brand/betterbio.html" }
        ],
        actionButtons: {
          login: { text: "登入", href: "#login", show: false },
          signup: { text: "註冊", href: "#signup", show: false },
          share: { text: "分享", show: false, callback: null },
        },
      };

      // 初始化組件
      this.initialize();
    }

    initialize() {
      this.createStyles();
      this.createContent();
      this.attachEvents();
      if (this._config.debug) {
        console.log("📋 Header 組件初始化完成");
        console.log(
          "📋 Shadow DOM 內容:",
          this.shadowRoot.innerHTML.substring(0, 200) + "..."
        );
      }
    }

    // 建立 Shadow DOM 內的樣式
    createStyles() {
      const style = document.createElement("style");
      style.textContent = `
                /* 所有樣式都在 Shadow DOM 內，完全隔離 */
                :host {
                    display: block;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    z-index: 1000;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                .header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    padding: 20px 0;
                    width: 100%;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                }
                
                .header.scrolled {
                    padding: 15px 0;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .nav-brand {
                    display: flex;
                    align-items: center;
                    gap: 40px;
                }
                
                .logo {
                    font-size: 1.8em;
                    font-weight: 800;
                    color: #ff6b35;
                    text-decoration: none;
                    transition: transform 0.3s ease;
                }
                
                .logo:hover {
                    transform: scale(1.05);
                }
                
                .nav-links {
                    display: flex;
                    gap: 40px;
                    align-items: center;
                    list-style: none;
                }
                
                .nav-links a {
                    color: #4a5568;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    position: relative;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #ff6b35;
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover {
                    color: #ff6b35;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .nav-actions {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }
                
                .login-btn {
                    color: #4a5568;
                    text-decoration: none;
                    font-weight: 500;
                    padding: 10px 16px;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                }
                
                .login-btn:hover {
                    color: #ff6b35;
                    background: rgba(255, 107, 53, 0.05);
                }
                
                .signup-btn {
                    background: #ff6b35;
                    color: white;
                    padding: 10px 18px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9em;
                    transition: all 0.2s ease;
                }
                
                .signup-btn:hover {
                    background: #e55a2b;
                    transform: translateY(-1px);
                    box-shadow: 0 3px 12px rgba(255, 107, 53, 0.25);
                }
                
                .share-btn {
                    background: transparent;
                    border: 1.5px solid #e2e8f0;
                    color: #4a5568;
                    padding: 10px 18px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 500;
                    font-size: 0.9em;
                    transition: all 0.2s ease;
                    position: relative;
                }
                
                .share-btn:hover {
                    border-color: #ff6b35;
                    color: #ff6b35;
                    background: rgba(255, 107, 53, 0.05);
                    transform: translateY(-1px);
                }
                
                .share-btn:active {
                    transform: translateY(0);
                }
                
                .share-btn svg {
                    width: 14px;
                    height: 14px;
                    opacity: 0.8;
                    transition: opacity 0.2s ease;
                }
                
                .share-btn:hover svg {
                    opacity: 1;
                }
                
                /* Mobile Menu Button */
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                }
                
                .menu-icon {
                    display: block;
                    width: 25px;
                    height: 3px;
                    background: #4a5568;
                    margin: 5px 0;
                    transition: all 0.3s ease;
                }
                
                .mobile-menu-btn.active .menu-icon:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-btn.active .menu-icon:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-btn.active .menu-icon:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
                
                /* Mobile Menu */
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                }
                
                .mobile-menu.active {
                    max-height: 500px;
                }
                
                .mobile-nav-links {
                    list-style: none;
                    padding: 20px;
                }
                
                .mobile-nav-links li {
                    padding: 15px 0;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }
                
                .mobile-nav-links a {
                    color: #4a5568;
                    text-decoration: none;
                    font-weight: 500;
                    display: block;
                }
                
                .mobile-nav-actions {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                
                .mobile-nav-actions a,
                .mobile-nav-actions button {
                    text-align: center;
                    width: 100%;
                    justify-content: center;
                }
                
                .mobile-nav-actions .share-btn {
                    margin-bottom: 10px;
                    border-color: #d1d5db;
                }
                
                .mobile-nav-actions .share-btn:hover {
                    border-color: #ff6b35;
                    background: rgba(255, 107, 53, 0.08);
                }
                
                /* Dark theme */
                :host([theme="dark"]) .header {
                    background: rgba(31, 41, 55, 0.95);
                    border-bottom-color: rgba(255,255,255,0.1);
                }
                
                :host([theme="dark"]) .nav-links a,
                :host([theme="dark"]) .login-btn,
                :host([theme="dark"]) .menu-icon {
                    color: #e2e8f0;
                }
                
                :host([theme="dark"]) .mobile-menu {
                    background: #1f2937;
                }
                
                /* Debug info */
                .debug-info {
                    position: absolute;
                    top: 100%;
                    right: 20px;
                    background: rgba(255, 107, 53, 0.9);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 0 0 5px 5px;
                    font-size: 0.8em;
                    display: none;
                }
                
                .debug-info.visible {
                    display: block;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .nav-actions {
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .mobile-menu {
                        display: block;
                    }
                    
                    .nav-container {
                        padding: 0 15px;
                    }
                    
                    .logo {
                        font-size: 1.5em;
                    }
                }
            `;
      this.shadowRoot.appendChild(style);
    }

    // 建立 Shadow DOM 內的內容
    createContent() {
      const header = document.createElement("header");
      header.className = "header";

      // 建立導覽連結 HTML
      const navLinksHTML = this._config.navLinks
        .map((link) => `<li><a href="${link.href}">${link.text}</a></li>`)
        .join("");

      // 建立行動按鈕 HTML
      const loginBtnHTML = this._config.actionButtons.login.show
        ? `<a href="${this._config.actionButtons.login.href}" class="login-btn">${this._config.actionButtons.login.text}</a>`
        : "";

      const signupBtnHTML = this._config.actionButtons.signup.show
        ? `<a href="${this._config.actionButtons.signup.href}" class="signup-btn">${this._config.actionButtons.signup.text}</a>`
        : "";

      const shareBtnHTML = this._config.actionButtons.share.show
        ? `<button class="share-btn" id="shareBtn">
                     <span>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                         <circle cx="18" cy="5" r="3"/>
                         <circle cx="6" cy="12" r="3"/>
                         <circle cx="18" cy="19" r="3"/>
                         <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                         <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                       </svg>
                     </span>
                     <span>${this._config.actionButtons.share.text}</span>
                   </button>`
        : "";

      header.innerHTML = `
                <div class="nav-container">
                    <div class="nav-brand">
                        <a href="${this._config.logoUrl}" class="logo">${this._config.logo}</a>
                        <ul class="nav-links">
                            ${navLinksHTML}
                        </ul>
                    </div>
                    
                    <div class="nav-actions">
                        ${shareBtnHTML}
                        ${loginBtnHTML}
                        ${signupBtnHTML}
                    </div>
                    
                    <button class="mobile-menu-btn" aria-label="Toggle menu">
                        <span class="menu-icon"></span>
                        <span class="menu-icon"></span>
                        <span class="menu-icon"></span>
                    </button>
                </div>
                
                <div class="mobile-menu">
                    <ul class="mobile-nav-links">
                        ${navLinksHTML}
                    </ul>
                    <div class="mobile-nav-actions">
                        ${shareBtnHTML}
                        ${loginBtnHTML}
                        ${signupBtnHTML}
                    </div>
                </div>
                
                <div class="debug-info">
                    Debug: ON | Scroll: <span class="scroll-value">0</span>px
                </div>
            `;

      this.shadowRoot.appendChild(header);

      // 儲存元素引用
      this.elements = {
        header,
        mobileMenuBtn: header.querySelector(".mobile-menu-btn"),
        mobileMenu: header.querySelector(".mobile-menu"),
        debugInfo: header.querySelector(".debug-info"),
        scrollValue: header.querySelector(".scroll-value"),
      };
    }

    // Shadow DOM 內的事件處理
    attachEvents() {
      // Mobile menu toggle
      this.elements.mobileMenuBtn.addEventListener("click", () => {
        const isActive =
          this.elements.mobileMenuBtn.classList.contains("active");
        this.elements.mobileMenuBtn.classList.toggle("active");
        this.elements.mobileMenu.classList.toggle("active");

        if (this._config.debug) {
          console.log("📱 Mobile menu:", isActive ? "closed" : "opened");
        }
      });

      // Scroll event for header shrink
      let lastScroll = 0;
      const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
          this.elements.header.classList.add("scrolled");
        } else {
          this.elements.header.classList.remove("scrolled");
        }

        if (this._config.debug && this.elements.scrollValue) {
          this.elements.scrollValue.textContent = currentScroll;
        }

        lastScroll = currentScroll;
      };

      // Throttle scroll event
      let scrollTimer;
      window.addEventListener("scroll", () => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
          handleScroll();
          scrollTimer = null;
        }, 50);
      });

      // Close mobile menu when clicking links
      this.shadowRoot.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (this.elements.mobileMenu.classList.contains("active")) {
            this.elements.mobileMenuBtn.classList.remove("active");
            this.elements.mobileMenu.classList.remove("active");
          }

          if (this._config.debug) {
            console.log("🔗 Navigation link clicked:", link.href);
          }
        });
      });

      // Handle share button click
      const shareBtn = this.shadowRoot.querySelector("#shareBtn");
      if (shareBtn && this._config.actionButtons.share.callback) {
        shareBtn.addEventListener(
          "click",
          this._config.actionButtons.share.callback
        );
      }
    }

    // Getter/Setter 方法（維持 chainable 模式）
    getDebug() {
      return this._config.debug;
    }

    setDebug(debug) {
      this._config.debug = Boolean(debug);

      if (this.elements.debugInfo) {
        this.elements.debugInfo.classList.toggle("visible", this._config.debug);
      }

      return this;
    }

    getTheme() {
      return this._config.theme;
    }

    setTheme(theme) {
      this._config.theme = theme;
      this.hostElement.setAttribute("theme", theme);
      return this;
    }

    getLogo() {
      return this._config.logo;
    }

    setLogo(logo) {
      this._config.logo = logo;
      const logoElement = this.shadowRoot.querySelector(".logo");
      if (logoElement) {
        logoElement.textContent = logo;
      }
      return this;
    }

    getLogoUrl() {
      return this._config.logoUrl;
    }

    setLogoUrl(url) {
      this._config.logoUrl = url;
      const logoElement = this.shadowRoot.querySelector(".logo");
      if (logoElement) {
        logoElement.href = url;
      }
      return this;
    }

    getNavLinks() {
      return [...this._config.navLinks];
    }

    setNavLinks(links) {
      this._config.navLinks = [...links];
      // 需要重新渲染導覽連結
      this.updateNavLinks();
      return this;
    }

    getActionButtons() {
      return Object.assign({}, this._config.actionButtons);
    }

    setActionButtons(buttons) {
      this._config.actionButtons = Object.assign(
        {},
        this._config.actionButtons,
        buttons
      );
      // 需要重新渲染按鈕
      this.updateActionButtons();
      return this;
    }

    // 更新導覽連結
    updateNavLinks() {
      const navLinksHTML = this._config.navLinks
        .map((link) => `<li><a href="${link.href}">${link.text}</a></li>`)
        .join("");

      const desktopLinks = this.shadowRoot.querySelector(".nav-links");
      const mobileLinks = this.shadowRoot.querySelector(".mobile-nav-links");

      if (desktopLinks) desktopLinks.innerHTML = navLinksHTML;
      if (mobileLinks) mobileLinks.innerHTML = navLinksHTML;

      // 重新綁定事件
      this.attachLinkEvents();
    }

    // 更新行動按鈕
    updateActionButtons() {
      const loginBtnHTML = this._config.actionButtons.login.show
        ? `<a href="${this._config.actionButtons.login.href}" class="login-btn">${this._config.actionButtons.login.text}</a>`
        : "";

      const signupBtnHTML = this._config.actionButtons.signup.show
        ? `<a href="${this._config.actionButtons.signup.href}" class="signup-btn">${this._config.actionButtons.signup.text}</a>`
        : "";

      const shareBtnHTML = this._config.actionButtons.share.show
        ? `<button class="share-btn" id="shareBtn">
                     <span>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                         <circle cx="18" cy="5" r="3"/>
                         <circle cx="6" cy="12" r="3"/>
                         <circle cx="18" cy="19" r="3"/>
                         <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                         <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                       </svg>
                     </span>
                     <span>${this._config.actionButtons.share.text}</span>
                   </button>`
        : "";

      const desktopActions = this.shadowRoot.querySelector(".nav-actions");
      const mobileActions = this.shadowRoot.querySelector(
        ".mobile-nav-actions"
      );

      if (desktopActions)
        desktopActions.innerHTML = shareBtnHTML + loginBtnHTML + signupBtnHTML;
      if (mobileActions)
        mobileActions.innerHTML = shareBtnHTML + loginBtnHTML + signupBtnHTML;

      // 重新綁定分享按鈕事件
      const shareBtn = this.shadowRoot.querySelector("#shareBtn");
      if (shareBtn && this._config.actionButtons.share.callback) {
        shareBtn.addEventListener(
          "click",
          this._config.actionButtons.share.callback
        );
      }
    }

    // 重新綁定連結事件
    attachLinkEvents() {
      this.shadowRoot.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (this.elements.mobileMenu.classList.contains("active")) {
            this.elements.mobileMenuBtn.classList.remove("active");
            this.elements.mobileMenu.classList.remove("active");
          }
        });
      });
    }

    // 批次設定
    setConfig(config) {
      Object.keys(config).forEach((key) => {
        const setterName = "set" + key.charAt(0).toUpperCase() + key.slice(1);
        if (typeof this[setterName] === "function") {
          this[setterName](config[key]);
        }
      });
      return this;
    }

    getConfig() {
      return Object.assign({}, this._config);
    }

    // 銷毀組件
    destroy() {
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = "";
      }
    }
  }

  // 將類別掛載到全域物件
  global.DeusHeaderComponent = DeusHeaderComponent;
})(window);

// 使用範例
/*
// 基本使用
const headerElement = document.createElement('div');
document.body.insertBefore(headerElement, document.body.firstChild);

const header = new DeusHeaderComponent(headerElement)
    .setDebug(true)
    .setTheme('default');

// 自訂設定
const customHeader = new DeusHeaderComponent(document.getElementById('header-container'))
    .setConfig({
        logo: '我的網站',
        logoUrl: '/home',
        debug: false
    })
    .setNavLinks([
        { text: '首頁', href: '/' },
        { text: '產品', href: '/products' },
        { text: '關於', href: '/about' },
        { text: '聯絡', href: '/contact' }
    ])
    .setActionButtons({
        login: { text: '會員登入', href: '/login', show: true },
        signup: { text: '立即註冊', href: '/register', show: true }
    });
*/
