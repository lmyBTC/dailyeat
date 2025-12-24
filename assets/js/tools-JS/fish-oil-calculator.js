/**
 * FishOilCalculator Component
 * 
 * 核心功能：計算魚油的真實成本（每 1000mg Omega-3 的價格）
 * 架構：原生 JavaScript Class + Shadow DOM 封裝
 */
(function (global) {
    'use strict';

    class FishOilCalculator {
        constructor(hostElement) {
            // 建立 Shadow DOM
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });

            // 初始化內部狀態
            this._config = {
                debug: false,
                theme: 'light'
            };

            // 預設輸入值
            this._state = {
                price: 0,
                totalCapsules: 0,
                servingSize: 1,
                omega3PerServing: 0,
                form: 'rTG' // rTG, EE, TG
            };

            // 結果顯示狀態 (預設隱藏)
            this._result = null;
        }

        /**
         * 初始化組件
         */
        initialize() {
            this.createStyles();
            this.createContent();
            this.loadState(); // 載入儲存的狀態
            this.attachEvents();
            this.log('debug', 'FishOilCalculator Initialized');
            return this;
        }

        /**
         * 載入狀態
         */
        loadState() {
            try {
                const saved = localStorage.getItem('caregiver_fishoil_calc_state');
                if (saved) {
                    const state = JSON.parse(saved);
                    if (state.price) this.inputPrice.value = state.price;
                    if (state.totalCapsules) this.inputCapsules.value = state.totalCapsules;
                    if (state.servingSize) this.inputServingSize.value = state.servingSize;
                    if (state.omega3PerServing) this.inputOmega3.value = state.omega3PerServing;
                    if (state.form) this.inputForm.value = state.form;
                    this.log('debug', 'State loaded from localStorage');

                    // 如果有舊數據，自動跑一次計算顯示結果
                    this.calculate(true);
                }
            } catch (e) {
                this.log('error', 'Failed to load state: ' + e.message);
            }
        }

        /**
         * 儲存狀態
         */
        saveState() {
            try {
                const state = {
                    price: this.inputPrice.value,
                    totalCapsules: this.inputCapsules.value,
                    servingSize: this.inputServingSize.value,
                    omega3PerServing: this.inputOmega3.value,
                    form: this.inputForm.value
                };
                localStorage.setItem('caregiver_fishoil_calc_state', JSON.stringify(state));
                this.log('debug', 'State saved to localStorage');
            } catch (e) {
                this.log('error', 'Failed to save state: ' + e.message);
            }
        }

        /**
         * 建立 Shadow DOM 樣式
         */
        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    --primary-color: #2563eb;
                    --primary-hover: #1d4ed8;
                    --bg-color: #ffffff;
                    --text-color: #1e293b;
                    --border-color: #e2e8f0;
                    --result-bg: #f8fafc;
                }

                .calculator-container {
                    background: var(--bg-color);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: 30px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .calc-header {
                    text-align: center;
                    margin-bottom: 25px;
                }

                .calc-title {
                    font-size: 1.5em;
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: 8px;
                }

                .calc-subtitle {
                    color: #64748b;
                    font-size: 0.9em;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 25px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-group.full-width {
                    grid-column: span 2;
                }

                label {
                    font-size: 0.9em;
                    font-weight: 600;
                    color: #475569;
                }

                input, select {
                    padding: 10px 12px;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    font-size: 1em;
                    transition: border-color 0.2s;
                }

                input:focus, select:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }

                .btn-calculate {
                    width: 100%;
                    padding: 12px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.1em;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .btn-calculate:hover {
                    background: var(--primary-hover);
                }

                .result-box {
                    margin-top: 30px;
                    padding: 25px;
                    background: var(--result-bg);
                    border-radius: 12px;
                    border: 1px dashed #cbd5e1;
                    display: none; /* Hidden by default */
                    animation: fadeIn 0.3s ease;
                }

                .result-box.show {
                    display: block;
                }

                .result-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #e2e8f0;
                }

                .result-row:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }

                .result-label {
                    color: #64748b;
                    font-size: 0.95em;
                }

                .result-value {
                    font-weight: 700;
                    color: var(--text-color);
                    font-size: 1.1em;
                }

                .final-score {
                    text-align: center;
                    padding-top: 10px;
                }

                .score-label {
                    display: block;
                    font-size: 0.9em;
                    color: #64748b;
                    margin-bottom: 5px;
                }

                .score-value {
                    font-size: 2.5em;
                    font-weight: 800;
                    color: var(--primary-color);
                    line-height: 1;
                }

                .score-badge {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.9em;
                    font-weight: 700;
                }

                /* Tier Colors */
                .tier-S { background: #dcfce7; color: #15803d; }
                .tier-A { background: #e0f2fe; color: #0369a1; }
                .tier-B { background: #fef9c3; color: #a16207; }
                .tier-C { background: #fee2e2; color: #b91c1c; }
                .tier-D { background: #f1f5f9; color: #64748b; }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 480px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .form-group.full-width { grid-column: auto; }
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        /**
         * 建立 HTML 內容
         */
        createContent() {
            const container = document.createElement('div');
            container.className = 'calculator-container';
            container.innerHTML = `
                <div class="calc-header">
                    <div class="calc-title">🔢 魚油真實成本計算機</div>
                    <div class="calc-subtitle">別被總價騙了，算出每 1000mg 的真實代價</div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label>購入價格 (TWD)</label>
                        <input type="number" id="input-price" placeholder="例如：1200" min="0">
                    </div>
                    <div class="form-group">
                        <label>總顆數 (粒)</label>
                        <input type="number" id="input-capsules" placeholder="例如：60" min="1">
                    </div>
                    <div class="form-group">
                        <label>每一份幾顆 (Serving Size)</label>
                        <input type="number" id="input-serving-size" placeholder="通常是 1 或 2" min="1" value="1">
                    </div>
                    <div class="form-group">
                        <label>每份含 Omega-3 (mg)</label>
                        <input type="number" id="input-omega3" placeholder="例如：1000" min="1">
                    </div>
                    <div class="form-group full-width">
                        <label>魚油型態 (影響吸收率評分)</label>
                        <select id="input-form">
                            <option value="rTG">rTG (吸收率高)</option>
                            <option value="EE">EE (需飯後吃)</option>
                            <option value="TG">TG (濃度通常較低)</option>
                        </select>
                    </div>
                </div>

                <button class="btn-calculate" id="btn-calc">開始計算</button>

                <div class="result-box" id="result-box">
                    <div class="result-row">
                        <span class="result-label">單顆濃度</span>
                        <span class="result-value" id="res-concentration">-- %</span>
                    </div>
                    <div class="result-row">
                        <span class="result-label">每日花費 (1000mg)</span>
                        <span class="result-value" id="res-daily-cost">-- 元</span>
                    </div>
                    <div class="div-line" style="border-top: 2px dashed #e2e8f0; margin: 15px 0;"></div>
                    <div class="final-score">
                        <span class="score-label">真實成本 (每 1000mg Omega-3)</span>
                        <div class="score-value" id="res-real-cost">--</div>
                        <div class="score-badge" id="res-badge">尚未計算</div>
                    </div>
                </div>
            `;
            this.shadowRoot.appendChild(container);

            // 綁定元素參考
            this.inputPrice = this.shadowRoot.getElementById('input-price');
            this.inputCapsules = this.shadowRoot.getElementById('input-capsules');
            this.inputServingSize = this.shadowRoot.getElementById('input-serving-size');
            this.inputOmega3 = this.shadowRoot.getElementById('input-omega3');
            this.inputForm = this.shadowRoot.getElementById('input-form');
            this.btnCalc = this.shadowRoot.getElementById('btn-calc');
            this.resultBox = this.shadowRoot.getElementById('result-box');
        }

        /**
         * 綁定事件
         */
        attachEvents() {
            this.btnCalc.addEventListener('click', () => {
                this.calculate();
                this.saveState();
            });

            // 自動儲存輸入
            const autoSave = () => this.saveState();
            this.inputPrice.addEventListener('input', autoSave);
            this.inputCapsules.addEventListener('input', autoSave);
            this.inputServingSize.addEventListener('input', autoSave);
            this.inputOmega3.addEventListener('input', autoSave);
            this.inputForm.addEventListener('change', autoSave);
        }

        /**
         * 執行計算邏輯
         */
        calculate(silent = false) {
            // 取得輸入值
            const price = parseFloat(this.inputPrice.value);
            const totalCapsules = parseFloat(this.inputCapsules.value);
            const servingSize = parseFloat(this.inputServingSize.value);
            const omega3PerServing = parseFloat(this.inputOmega3.value);
            const form = this.inputForm.value;

            // 驗證輸入 (靜默模式不彈窗)
            if (!price || !totalCapsules || !servingSize || !omega3PerServing) {
                if (!silent) alert('請完整填寫所有欄位！');
                return;
            }

            // 計算邏輯
            // 1. 單顆價格
            const pricePerCapsule = price / totalCapsules;

            // 2. 單顆 Omega-3 含量 (mg)
            const omega3PerCapsule = omega3PerServing / servingSize;

            // 真实成本 = 吃進 1000mg Omega-3 需要多少錢
            const capsulesNeededFor1000mg = 1000 / omega3PerCapsule;
            const costPer1000mg = pricePerCapsule * capsulesNeededFor1000mg;

            // 顯示結果
            this.showResult(costPer1000mg, omega3PerCapsule, silent);
            this.log('debug', `Calculation: Price=${price}, Caps=${totalCapsules}, Serv=${servingSize}, O3=${omega3PerServing} => Cost=${costPer1000mg.toFixed(2)}`);
        }

        /**
         * 顯示計算結果
         */
        showResult(cost, omega3PerCap, silent = false) {
            // 更新數值
            const elRealCost = this.shadowRoot.getElementById('res-real-cost');
            const elDailyCost = this.shadowRoot.getElementById('res-daily-cost');
            const elConc = this.shadowRoot.getElementById('res-concentration');
            const elBadge = this.shadowRoot.getElementById('res-badge');

            elRealCost.textContent = `$${cost.toFixed(1)}`;
            elDailyCost.textContent = `$${cost.toFixed(1)}`; // 每日建議攝取約 1000mg，故相同

            // 估算濃度
            elConc.textContent = Math.round(omega3PerCap) + ' mg/顆';

            // 評級邏輯 (Subjective Tier)
            let tier = '';
            let tierClass = '';

            if (cost <= 25) {
                tier = 'S級 (超神CP值)';
                tierClass = 'tier-S';
            } else if (cost <= 40) {
                tier = 'A級 (價格合理)';
                tierClass = 'tier-A';
            } else if (cost <= 60) {
                tier = 'B級 (稍貴但可接受)';
                tierClass = 'tier-B';
            } else {
                tier = 'C級 (或是智商稅)';
                tierClass = 'tier-C';
            }

            elBadge.className = `score-badge ${tierClass}`;
            elBadge.textContent = tier;

            // 顯示區塊
            if (!silent) {
                this.resultBox.classList.add('show');
            } else {
                this.resultBox.style.display = 'block';
            }
        }

        // =================
        // Getter/Setter Methods
        // =================

        setDebug(debug) {
            this._config.debug = Boolean(debug);
            return this;
        }

        getDebug() {
            return this._config.debug;
        }

        setTheme(theme) {
            this._config.theme = theme;
            return this;
        }

        /**
         * Console Logger
         */
        log(level, message) {
            if (!this._config.debug && level === 'debug') return;
            console.log(`[FishOilCalc:${level}] ${message}`);
        }

        /**
         * 清理資源
         */
        destroy() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = '';
            }
        }
    }

    // 掛載到全域
    global.FishOilCalculator = FishOilCalculator;

})(window);
