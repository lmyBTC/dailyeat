/**
 * Footer 組件 - Shadow DOM 封裝
 * @class DeusFooterComponent
 * @description 提供完整的網站 Footer，包含連結、聯絡資訊和版權聲明
 * @compatibility 支援 2022 年以來的瀏覽器版本
 */
(function (global) {
  "use strict";

  class DeusFooterComponent {
    constructor(hostElement) {
      // 建立 Shadow DOM
      this.hostElement = hostElement || document.body;
      this.shadowRoot = this.hostElement.attachShadow({ mode: "closed" });

      // 初始化設定
      this._config = {
        debug: false,
        theme: "default",
        companyName: "營養百科",
        companyDescription:
          "專業營養團隊打造的營養素百科，提供專業、易懂的健康資訊",
        copyright: "© 2025 營養百科 版權所有",
        email: "contact@nutrition-wiki.com",
        phone: "0800-123-456",
        socialLinks: {
          facebook: "https://www.facebook.com/people/%E7%87%9F%E9%A4%8A%E7%99%BE%E7%A7%91/61580668362044/",
          instagram: "#",
          youtube: "#",
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
        console.log("📋 Footer 組件初始化完成");
      }
    }

    // 建立 Shadow DOM 內的樣式
    createStyles() {
      const style = document.createElement("style");
      style.textContent = `
                /* 所有樣式都在 Shadow DOM 內，完全隔離 */
                :host {
                    display: block;
                    contain: layout style paint;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                .footer-container {
                    background: #2d3748;
                    color: #e2e8f0;
                    padding: 80px 20px 40px;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .footer-top {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                    gap: 60px;
                    margin-bottom: 60px;
                }
                
                .footer-brand {
                    max-width: 350px;
                }
                
                .footer-logo {
                    font-size: 2em;
                    font-weight: 800;
                    color: #ff6b35;
                    margin-bottom: 20px;
                    display: inline-block;
                }
                
                .footer-description {
                    color: #a0aec0;
                    line-height: 1.8;
                    margin-bottom: 30px;
                }
                
                .social-links {
                    display: flex;
                    gap: 15px;
                }
                
                .social-link {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    color: #e2e8f0;
                    transition: all 0.3s ease;
                }
                
                .social-link:hover {
                    background: #ff6b35;
                    transform: translateY(-2px);
                }
                
                .footer-section h3 {
                    font-size: 1.2em;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 25px;
                }
                
                .footer-links {
                    list-style: none;
                }
                
                .footer-links li {
                    margin-bottom: 15px;
                }
                
                .footer-links a {
                    color: #a0aec0;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    display: inline-block;
                }
                
                .footer-links a:hover {
                    color: #ff6b35;
                    transform: translateX(5px);
                }
                
                .contact-info {
                    color: #a0aec0;
                    line-height: 1.8;
                }
                
                .contact-item {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .contact-icon {
                    color: #ff6b35;
                    font-size: 1.2em;
                }
                
                .footer-bottom {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                
                .copyright {
                    color: #718096;
                }
                
                .footer-bottom-links {
                    display: flex;
                    gap: 30px;
                    list-style: none;
                }
                
                .footer-bottom-links a {
                    color: #718096;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .footer-bottom-links a:hover {
                    color: #ff6b35;
                }
                
                /* Dark theme */
                :host([theme="dark"]) .footer-container {
                    background: #1a202c;
                }
                
                /* Debug info */
                .debug-info {
                    background: rgba(255, 107, 53, 0.1);
                    border: 1px solid #ff6b35;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #ff6b35;
                    display: none;
                }
                
                .debug-info.visible {
                    display: block;
                }
                
                /* Responsive */
                @media (max-width: 968px) {
                    .footer-top {
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                    }
                    
                    .footer-brand {
                        grid-column: 1 / -1;
                        max-width: 100%;
                    }
                }
                
                @media (max-width: 640px) {
                    .footer-top {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    
                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .footer-bottom-links {
                        flex-direction: column;
                        gap: 15px;
                    }
                }
            `;
      this.shadowRoot.appendChild(style);
    }

    // 建立 Shadow DOM 內的內容
    createContent() {
      const container = document.createElement("footer");
      container.className = "footer-container";

      container.innerHTML = `
                <!-- Footer Content -->
                <div class="footer-content">
                    <div class="footer-top">
                        <!-- Brand Section -->
                        <div class="footer-brand">
                            <div class="footer-logo">${this._config.companyName}</div>
                            <p class="footer-description">${this._config.companyDescription}</p>
                            <div class="social-links">
                                <a href="${this._config.socialLinks.facebook}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook" id="facebook-link">
                                    <span>f</span>
                                </a>
                                <a href="${this._config.socialLinks.instagram}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <span>IG</span>
                                </a>
                                <a href="${this._config.socialLinks.youtube}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <span>▶</span>
                                </a>
                            </div>
                        </div>

                        <!-- Topic Navigation -->
                        <div class="footer-section">
                            <h3>主題導覽</h3>
                            <ul class="footer-links">
                                <li><a href="/post/topic-cardiovascular-health.html">心血管健康</a></li>
                                <li><a href="/post/topic-immune-boosting-nutrients.html">免疫強化</a></li>
                                <li><a href="/post/lutein.html">視力維護</a></li>
                                <li><a href="/post/glucosamine.html">關節與軟骨</a></li>
                                <li><a href="/post/probiotics.html">腸道菌群平衡</a></li>
                            </ul>
                        </div>

                        <!-- Explore More -->
                        <div class="footer-section">
                            <h3>探索更多</h3>
                            <ul class="footer-links">
                                <li><a href="/category/archive.html">文章總覽</a></li>
                                <li><a href="/category/nutrient-dashboard.html">互動式儀表板</a></li>
                                <li><a href="/category/foodWiki.html">食物營養百科</a></li>
                                <li><a href="/post/official-health-sites.html">官方資料</a></li>
                            </ul>
                        </div>

                        <!-- About This Site -->
                        <div class="footer-section">
                            <h3>關於本站</h3>
                             <ul class="footer-links">
                                <li><a href="/about.html">關於我們</a></li>
                                <li><a href="mailto:${this._config.email}">聯絡我們</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Footer Bottom -->
                    <div class="footer-bottom">
                        <div class="copyright">${this._config.copyright}</div>
                        <ul class="footer-bottom-links">
                            <li><a href="/privacy.html">隱私權政策</a></li>
                            <li><a href="/disclaimer.html">免責聲明</a></li>
                            <li><a href="/sitemap.xml">網站地圖</a></li>
                        </ul>
                    </div>

                    <!-- Debug Info -->
                    <div class="debug-info">
                        Debug Mode: ON | Theme: ${this._config.theme}
                    </div>
                </div>
            `;

      this.shadowRoot.appendChild(container);

      // 儲存元素引用
      this.elements = {
        container,
        debugInfo: container.querySelector(".debug-info"),
      };
    }

    // Shadow DOM 內的事件處理
    attachEvents() {
      // 所有連結點擊事件
      this.shadowRoot.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          if (this._config.debug) {
            console.log("🔗 Footer 連結點擊：", link.href);
          }
        });
      });
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

    getCompanyName() {
      return this._config.companyName;
    }

    setCompanyName(name) {
      this._config.companyName = name;
      const logo = this.shadowRoot.querySelector(".footer-logo");
      if (logo) {
        logo.textContent = name;
      }
      return this;
    }

    getCompanyDescription() {
      return this._config.companyDescription;
    }

    setCompanyDescription(description) {
      this._config.companyDescription = description;
      const desc = this.shadowRoot.querySelector(".footer-description");
      if (desc) {
        desc.textContent = description;
      }
      return this;
    }

    getCopyright() {
      return this._config.copyright;
    }

    setCopyright(copyright) {
      this._config.copyright = copyright;
      const copy = this.shadowRoot.querySelector(".copyright");
      if (copy) {
        copy.textContent = copyright;
      }
      return this;
    }

    getEmail() {
      return this._config.email;
    }

    setEmail(email) {
      this._config.email = email;
      const emailElements = this.shadowRoot.querySelectorAll(".contact-item");
      if (emailElements[0]) {
        emailElements[0].querySelector("span:last-child").textContent = email;
      }
      return this;
    }

    getPhone() {
      return this._config.phone;
    }

    setPhone(phone) {
      this._config.phone = phone;
      const phoneElements = this.shadowRoot.querySelectorAll(".contact-item");
      if (phoneElements[1]) {
        phoneElements[1].querySelector("span:last-child").textContent = phone;
      }
      return this;
    }

    getSocialLinks() {
      return Object.assign({}, this._config.socialLinks);
    }

    setSocialLinks(links) {
      this._config.socialLinks = Object.assign(
        {},
        this._config.socialLinks,
        links
      );
      // 更新社群連結
      const socialLinks = this.shadowRoot.querySelectorAll(".social-link");
      if (links.facebook && socialLinks[0])
        socialLinks[0].href = links.facebook;
      if (links.instagram && socialLinks[1])
        socialLinks[1].href = links.instagram;
      if (links.youtube && socialLinks[2]) socialLinks[2].href = links.youtube;
      return this;
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
  global.DeusFooterComponent = DeusFooterComponent;
})(window);

// 使用範例
/*
// 基本使用
const footerElement = document.createElement('div');
document.body.appendChild(footerElement);

const footer = new DeusFooterComponent(footerElement)
    .setDebug(true)
    .setTheme('default');

// 自訂設定
const customFooter = new DeusFooterComponent(document.getElementById('footer-container'))
    .setConfig({
        companyName: '我的營養網站',
        companyDescription: '提供最專業的營養資訊',
        copyright: '© 2025 我的公司 版權所有',
        email: 'info@mysite.com',
        phone: '02-1234-5678',
        debug: false
    })
    .setSocialLinks({
        facebook: 'https://facebook.com/mypage',
        instagram: 'https://instagram.com/mypage',
        youtube: 'https://youtube.com/mychannel'
    });
*/
