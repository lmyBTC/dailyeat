/**
 * Analytics 組件 - GA4 追蹤埋設
 * @class DeusAnalyticsComponent
 * @description 負責載入和配置 Google Analytics 4 追蹤代碼
 * @compatibility 支援 2022 年以來的瀏覽器版本
 */
(function (global) {
  "use strict";

  class DeusAnalyticsComponent {
    constructor() {
      // 初始化設定
      this._config = {
        debug: false,
        gaId: "G-MLXBKLVCQJ", // 您的 GA4 追蹤 ID
        enabled: true, // 是否啟用追蹤
        environment: "production", // 環境：development, production
        loadTimeout: 10000, // 載入超時時間 (ms)
      };

      // 初始化組件
      this.initialize();
    }

    initialize() {
      if (this._config.debug) {
        console.log("🚀 Analytics 組件開始初始化");
        console.log("📋 設定：", this.getConfig());
      }

      if (this._config.enabled && this._config.gaId) {
        this.loadGoogleAnalytics();
      } else {
        if (this._config.debug) {
          console.warn("⚠️ GA4 追蹤未啟用或缺少追蹤 ID");
        }
      }
    }

    /**
     * 載入 Google Analytics 4
     */
    loadGoogleAnalytics() {
      try {
        if (this._config.debug) {
          console.log("📊 開始載入 GA4 追蹤代碼...");
        }

        // 檢查是否已經載入過
        if (this.isGoogleAnalyticsLoaded()) {
          if (this._config.debug) {
            console.log("✅ GA4 已經載入過，跳過重複載入");
          }
          return this;
        }

        // 建立 gtag script 標籤
        const gtagScript = document.createElement("script");
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this._config.gaId}`;

        // 監聽載入事件
        gtagScript.onload = () => {
          if (this._config.debug) {
            console.log("📈 GA4 外部腳本載入完成");
          }
        };

        gtagScript.onerror = () => {
          console.error("❌ GA4 外部腳本載入失敗");
        };

        // 建立初始化腳本
        const initScript = document.createElement("script");
        initScript.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${this._config.gaId}');
        `;

        // 插入到 head 中
        document.head.appendChild(gtagScript);
        document.head.appendChild(initScript);

        // 設定全域 gtag 函數
        global.gtag = global.gtag || function() {
          global.dataLayer = global.dataLayer || [];
          global.dataLayer.push(arguments);
        };

        if (this._config.debug) {
          console.log("✅ GA4 追蹤代碼載入完成");
          console.log("📋 追蹤 ID：", this._config.gaId);
        }

        // 觸發頁面瀏覽事件
        this.trackPageView();

      } catch (error) {
        console.error("❌ GA4 載入失敗：", error);
      }

      return this;
    }

    /**
     * 檢查 Google Analytics 是否已載入
     */
    isGoogleAnalyticsLoaded() {
      return (
        global.gtag &&
        document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${this._config.gaId}"]`)
      );
    }

    /**
     * 追蹤頁面瀏覽
     */
    trackPageView(pagePath, pageTitle) {
      if (!this._config.enabled || !global.gtag) {
        return this;
      }

      const path = pagePath || global.location.pathname;
      const title = pageTitle || document.title;

      global.gtag('config', this._config.gaId, {
        page_path: path,
        page_title: title,
      });

      if (this._config.debug) {
        console.log("📊 追蹤頁面瀏覽：", { path, title });
      }

      return this;
    }

    /**
     * 追蹤自定義事件
     */
    trackEvent(eventName, parameters = {}) {
      if (!this._config.enabled || !global.gtag) {
        return this;
      }

      global.gtag('event', eventName, parameters);

      if (this._config.debug) {
        console.log("📊 追蹤事件：", eventName, parameters);
      }

      return this;
    }

    /**
     * 追蹤轉換事件
     */
    trackConversion(conversionId, parameters = {}) {
      if (!this._config.enabled || !global.gtag) {
        return this;
      }

      global.gtag('event', 'conversion', {
        'send_to': conversionId,
        ...parameters
      });

      if (this._config.debug) {
        console.log("📊 追蹤轉換：", conversionId, parameters);
      }

      return this;
    }

    // =================
    // Getter 方法
    // =================

    getDebug() {
      return this._config.debug;
    }

    getGaId() {
      return this._config.gaId;
    }

    getEnabled() {
      return this._config.enabled;
    }

    getEnvironment() {
      return this._config.environment;
    }

    getConfig() {
      return Object.assign({}, this._config);
    }

    // =================
    // Setter 方法 - 支援鏈式呼叫
    // =================

    setDebug(debug) {
      this._config.debug = Boolean(debug);
      return this;
    }

    setGaId(gaId) {
      if (typeof gaId !== "string" || !gaId.trim()) {
        throw new Error("GA ID 必須是非空字串");
      }
      this._config.gaId = gaId.trim();
      return this;
    }

    setEnabled(enabled) {
      this._config.enabled = Boolean(enabled);
      return this;
    }

    setEnvironment(environment) {
      const validEnvironments = ["development", "production"];
      if (!validEnvironments.includes(environment)) {
        throw new Error(`環境必須是: ${validEnvironments.join(", ")}`);
      }
      this._config.environment = environment;
      return this;
    }

    setConfig(configObject) {
      if (typeof configObject !== "object" || configObject === null) {
        throw new Error("Config 必須是物件");
      }

      Object.keys(configObject).forEach((key) => {
        const setterName = "set" + key.charAt(0).toUpperCase() + key.slice(1);
        if (typeof this[setterName] === "function") {
          this[setterName](configObject[key]);
        }
      });

      return this;
    }

    /**
     * 重新初始化 GA4
     */
    reinitialize() {
      if (this._config.debug) {
        console.log("🔄 重新初始化 GA4");
      }
      return this.initialize();
    }

    /**
     * 停用追蹤
     */
    disable() {
      this._config.enabled = false;
      if (global.gtag) {
        global.gtag('config', this._config.gaId, {
          'client_storage': 'none'
        });
      }
      if (this._config.debug) {
        console.log("⏹️ GA4 追蹤已停用");
      }
      return this;
    }

    /**
     * 啟用追蹤
     */
    enable() {
      this._config.enabled = true;
      if (this._config.debug) {
        console.log("▶️ GA4 追蹤已啟用");
      }
      return this;
    }
  }

  // 將類別掛載到全域物件
  global.DeusAnalyticsComponent = DeusAnalyticsComponent;

})(window);

// 使用範例
/*
// 基本使用 - 自動載入 GA4
const analytics = new DeusAnalyticsComponent()
  .setDebug(false) // 正式環境關閉除錯
  .setEnvironment('production');

// 開發環境設定
const devAnalytics = new DeusAnalyticsComponent()
  .setDebug(true)
  .setEnvironment('development')
  .setEnabled(false); // 開發時可以停用追蹤

// 追蹤自定義事件
analytics.trackEvent('button_click', {
  button_name: 'subscribe',
  page_location: window.location.href
});

// 追蹤頁面瀏覽（SPA 應用程式）
analytics.trackPageView('/new-page', '新頁面標題');

// 動態設定
analytics
  .setGaId('G-XXXXXXXXXX')
  .setDebug(true)
  .reinitialize();
*/