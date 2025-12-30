# 任務名稱：建立「現代編輯風格 (Modern Editorial)」與「5W1H」內容標準規範

**狀態**: `已完成`
**負責人**: @Antigravity
**預計完成日期**: 2025-12-30
**相關連結**: `post/fish-oil copytest.html` (原型), `assets/css/editorial.css` (樣式表), `doc/draft/現代雜誌風 (Modern Editorial) 網站設計系統指南.md` (來源指南)

---

## 1. 任務目標 (Objective)

建立一套標準化的「深度內容頁面」製作規範 (SOP)，以 `fish-oil copytest.html` 為藍本。確保未來所有「百科型」或「深度指南」文章均能保持一致的高品質視覺風格 (Modern Editorial) 與邏輯架構 (5W1H)，解決過往頁面風格不統一與敘事鬆散的問題。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

*   **核心風格**: 採用「雜誌級」排版 (Modern Editorial)，強調不對稱佈局、襯線字體標題 (`Noto Serif TC`) 與大面積留白。
*   **CSS 架構**:
    *   `assets/css/editorial.css`: 定義全域編輯風格變數（色票、間距、排版元件）。
    *   **無 Shadow DOM**: 核心內容頁面為 SEO 重點，採用全域樣式直接渲染，不使用 Shadow DOM 隔離 (與 Widget 類不同)。
*   **內容模組**: 標準化 6 大段落模組 (Who, Why, What, How, When, Where)。

### 2.2. 檔案結構

```
dailyeat/
├── post/
│   ├── fish-oil copytest.html  (標準樣板來源)
│   └── 00template_editorial.html (建議新增：標準化樣板)
└── assets/
    └── css/
        └── editorial.css (核心樣式庫)
```

## 3. 規範細節與拆解 (Specification & Breakdown)

### 3.1 視覺設計系統 (Visual Design System)

*   **色票系統 (Color Palette)**:
    *   `--brand-dark (#0F2C28)`: 深松石綠 (主要文字/背景)
    *   `--brand-accent (#C6A87C)`: 暖沙金 (強調色/邊框)
    *   `--brand-cream (#F9F8F4)`: 米白紙質感 (網頁背景)
*   **排版元件**:
    *   **Hero Section**: 不對稱格線 (左文右圖) + 襯線大標題。
    *   **Minimalist Cards**: 極簡卡片，帶有大尺寸背景數字。
    *   **Highlight Box**: 左側金邊強調的引言區塊。

### 3.2 內容架構 (5W1H Framework)

每一個深度頁面必須包含以下流程：

1.  **WHO (適用族群)**: 使用 `Checklist` 讓使用者自我對號入座 (Is this for me?)。
2.  **WHY (科學原理)**: 解釋問題根源 (例如：發炎)，使用 `Grid Cards` 展示核心效益。
3.  **WHAT (選購標準)**: 定義黃金法則 (Golden Rules)，使用羅馬數字列表 (I, II, III)。
4.  **HOW (執行清單)**: 具體的購買檢查表 (Actionable Checklist)，帶有勾選框樣式。
5.  **WHEN (最佳化)**: 服用時間與劑量建議，使用對比圖表 (Good vs Bad)。
6.  **WHERE (延伸資源)**: 導流至其他 Spoke 頁面的連結卡片。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes
*   **評估**: 無。
*   **原因**: 此為新增的設計規範，不影響舊有頁面運作。新樣式寫在獨立的 `editorial.css` 中。

### 相依性
*   需引入 Google Fonts: `Noto Serif TC` 與 `Noto Sans TC`。

## 5. 驗收標準 (Acceptance Criteria)

- [x] 所有標題皆正確使用 `Noto Serif TC` 字體。
- [x] 頁面必須包含完整的 5W1H 六大段落結構。
- [x] 手機版 (Mobile) 需呈現單欄流式佈局，桌面版 (Desktop) 呈現不對稱格線佈局。
- [x] 使用者可透過 TOC (目錄) 順暢跳轉至各對應區塊。
