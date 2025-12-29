# 任務名稱：Fish Oil 頁面結構重構 (CSS/JS 分離)

**狀態**: `規劃中`
**負責人**: @Antigravity
**預計完成日期**: 2025-12-29
**相關連結**: `post/fish-oil.html`

---

## 1. 任務目標 (Objective)

本任務目標是優化 `post/fish-oil.html` 的代碼結構：
1.  **整合樣式**：將頁面目前使用的 CSS 整合進全域共用的 `assets/css/article.css`，確保樣式統一。
2.  **JS 提取**：將頁面專屬的 JavaScript 提取至獨立檔案 `assets/js/article-fish-oil.js`。
3.  **歸納冗餘**：將**未使用**的 CSS 樣式提取至歸檔文件 `assets/css/unused.css` (作為備份歸納)，而非直接刪除。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

-   **CSS 理與整合**:
    -   **分析**: 逐一檢查 `fish-oil.html` 內 `<style>` 中的規則。
    -   **整合**: 將與現有 `assets/css/article.css` 不重複且**被頁面使用**的規則，追加到 `assets/css/article.css` 中 (需注意避免污染其他頁面，建議加上 `.fish-oil-page` 限定或是確認為通用樣式)。
    -   **歸檔**: 將**未使用**或**已廢棄** (如 Market Check 相關) 的樣式，移動到 `assets/css/unused.css` 中保存。
-   **JS 提取**:
    -   建立 `assets/js/article-fish-oil.js`。
    -   將頁尾的腳本 (TOC, FAQ, 檢測邏輯) 遷移至此檔案。
    -   在 HTML 中以 `<script src="...">` 引入。

### 2.2. 檔案結構變更

```
dailyeat/
├── post/
│   └── fish-oil.html (修改：引入外部 CSS/JS)
├── assets/
│   ├── css/
│   │   ├── article.css (修改：整合使用的樣式)
│   │   └── unused.css (新增：歸納未使用的樣式)
│   └── js/
│       └── article-fish-oil.js (新增)
```

## 3. 任務拆解 (Task Breakdown)

- [x] 分析 CSS：區分 `fish-oil.html` 中「使用中」與「未使用」的樣式規則。
- [x] 整合 CSS：將使用中的樣式合併至 `assets/css/article.css`。
- [x] 歸檔 CSS：將未使用的樣式移動至 `assets/css/unused.css`。
- [x] 提取 JS：將 `<script>` 內容遷移至 `assets/js/article-fish-oil.js`。
- [x] 修改 `post/fish-oil.html`：
    -   移除原 `<style>` 與 `<script>`。
    -   確認 `<head>` 引用 `assets/css/article.css`。
    -   body 底部引用 `assets/js/article-fish-oil.js`。
- [x] 驗證：
    -   檢查 `fish-oil.html` 顯示是否正常。
    -   檢查原有的互動功能 (FAQ, TOC) 是否正常。

## 4. 影響評估 (Impact Assessment)

### 相容性風險
-   **CSS 權重**: 遷移後需注意 CSS 載入順序，確保不會被全域樣式 unintended 覆蓋。
-   **JS 執行時機**: 外部 JS 預設可能非阻塞，需確保 DOM 元素已載入後再執行 (已使用 `DOMContentLoaded`，應無風險)。

## 5. 驗收標準 (Acceptance Criteria)

-   `post/fish-oil.html` 的源碼中應無大段落的 `<style>` 與 `<script>` (僅保留 JSON-LD 或極少量 critical inline styles)。
-   頁面視覺與功能在重構前後完全一致。
-   Console 無 JavaScript 錯誤。
