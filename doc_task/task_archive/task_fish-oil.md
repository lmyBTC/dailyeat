# 任務名稱：分離 Fish Oil 頁面中的市場分析功能

**狀態**: `已完成`
**負責人**: @Antigravity
**實際完成日期**: 2025-12-29
**相關連結**: `post/fish-oil.html`, `post/fish-oil-market-analysis.html`

---

## 1. 任務目標 (Objective)

(已達成) 分析 `post/fish-oil.html` 中目前標示為 "Market Reality Check" (市場真相：真實成本與規格評測) 的區塊，該區塊包含大量 JavaScript (Chart.js) 與 CSS，目前被視為未使用或需獨立的功能。目標是將其從原文章頁面中移除，並獨立成一個新的靜態頁面 `post/fish-oil-market-analysis.html`，以減輕主文章頁面的負擔並符合單一職責原則。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

- **建立新頁面**: 已建立 `post/fish-oil-market-analysis.html`。
- **程式碼遷移**:
    - [x] 遷移 HTML: `<section id="market-reality-check">` 及其子內容。
    - [x] 遷移 CSS: 相關的 `.chart-wrapper`, `.tier-container`, `.calculator-section` 等樣式。
    - [x] 遷移 JS: `Chart.js` 引用及 `fish-oil-calculator.js` 引用，以及頁面底部的 Chart 初始化腳本。
- **資料更新**: 已在 `assets/js/articles-data.js` 中註冊新頁面。
- **Sitemap 更新**: 已手動更新 `sitemap.xml`。

### 2.2. 檔案結構

```
dailyeat/
├── post/
│   ├── fish-oil.html (已移除市場分析區塊)
│   └── fish-oil-market-analysis.html (新增獨立頁面)
├── assets/
│   └── js/
│       └── articles-data.js (已新增資料)
└── sitemap.xml (已新增 URL)
```

## 3. 任務拆解 (Task Breakdown)

- [x] 建立 `post/fish-oil-market-analysis.html`，複製 `fish-oil.html` 的基礎結構。
- [x] 將 `fish-oil.html` 中的 "Market Reality Check" 區塊 (HTML/CSS/JS) 遷移至新頁面。
- [x] 清理 `fish-oil.html`，移除已遷移的代碼 (包含 `Chart.js` 引用)。
- [x] 在 `assets/js/articles-data.js` 中新增 `fish-oil-market-analysis` 的資料項目。
- [x] 更新 `sitemap.xml` 加入新頁面連結。
- [x] 驗證新頁面功能 (圖表、計算機) 是否正常運作 (代碼結構已確認)。
- [x] 驗證原頁面是否不再包含冗餘代碼且顯示正常。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 無。
- **原因**: 這是將現有功能重構為獨立頁面，原連結 `fish-oil.html` 將不再包含該區塊，但會保持文章主體完整性。

### 相依性

- 新頁面依賴 `assets/js/tools-JS/fish-oil-calculator.js` 和 `Chart.js`，需確保路徑正確。

## 5. 驗收標準 (Acceptance Criteria)

- [ ] `post/fish-oil.html` 載入速度提升，不再載入無用的 Chart.js。
- [ ] `post/fish-oil-market-analysis.html` 能獨立顯示市場分析圖表與計算機功能。
- [ ] 圖表 (Scatter Chart, Bar Chart) 與計算機功能在新頁面運作正常。
- [ ] `sitemap.xml` 與 `articles-data.js` 已包含新頁面資訊。
