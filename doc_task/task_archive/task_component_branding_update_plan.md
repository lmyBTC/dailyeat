# 任務名稱：全專案組件品牌名稱統一：將「Caregiver」替換為「Dailyeat / 營養百科」

**狀態**: `開發中`
**負責人**: @G1
**預計完成日期**: YYYY-MM-DD (視文件數量而定)
**相關連結**: 專案所有 HTML, JS 文件

---

## 1. 任務目標 (Objective)

本專案已更名為「Dailyeat 營養百科」。為確保品牌名稱在所有組件與內容中保持一致性，本任務旨在系統性地審查並更新專案資料夾內所有相關檔案中，殘留的「Caregiver」或任何舊品牌名稱，統一替換為「Dailyeat 營養百科」或單純「營養百科」，以消除歧義並強化新品牌形象。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

- **搜尋工具**: 使用 `search_file_content` 工具，在專案根目錄下搜尋包含「Caregiver」等關鍵字的 HTML 和 JavaScript 檔案。
- **編輯工具**: 使用 `replace` 工具進行精確的文字替換。
- **文件篩選**: 優先處理 `post/` 和 `category/` 等主要內容資料夾下的檔案。

### 2.2. 檔案結構

將對專案根目錄下，特別是 `post/` 和 `category/` 資料夾內的 HTML 和 JavaScript 檔案進行修改。

```
dailyeat/
├── post/
│   └── [html_files] (修改)
├── category/
│   └── [html_files] (修改)
├── assets/
│   └── js/
│       └── [js_files] (修改)
└── ... (其他可能包含舊名稱的檔案)
```

## 3. 任務拆解 (Task Breakdown)

- [x] **初始化搜尋**: 在全專案範圍內搜尋「Caregiver」關鍵字。
- [ ] **檔案列表整理**: 根據搜尋結果，整理出需要修改的檔案清單。 (已部分完成，列表已在思考中整理)
- [x] **審查 `post/fish-oil.html`**:
    - [x] 讀取 `post/fish-oil.html` 內容。
    - [x] 將 `<script type="application/ld+json">` 區塊內的 `"name": "Caregiver 營養百科"` 替換為 `"name": "營養百科"`。
- [x] **逐步處理其他檔案**: 針對清單中的每個檔案，重複以下步驟：
    - [x] 讀取檔案內容 (`doc/writing-guide.md`, `doc_task/task_template.md` 已處理)。
    - [x] 分析內容，識別所有需要替換的「Caregiver」或舊品牌名稱實例 (`doc/writing-guide.md`, `doc_task/task_template.md` 已處理)。
    - [x] 執行 `replace` 操作，將舊名稱替換為新名稱 (`doc/writing-guide.md`, `doc_task/task_template.md` 已處理)。
    - [x] 儲存修改 (`doc/writing-guide.md`, `doc_task/task_template.md` 已處理)。
- [ ] **最終驗證**: 完成所有替換後，再次進行全專案搜尋，確保沒有任何遺漏的「Caregiver」實例。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 低。
- **原因**: 本次任務主要為文字替換，不涉及功能邏輯修改。雖然 JSON-LD 結構可能被修改，但僅為字串內容，應不致造成破壞性變更。所有修改都將審慎進行以避免引入新問題。

### 相依性

- 本任務不依賴其他未完成的任務。

## 5. 驗收標準 (Acceptance Criteria)

- [ ] 所有被審查的 HTML 和 JavaScript 檔案中，所有「Caregiver」相關的品牌名稱均已替換為「Dailyeat 營養百科」或「營養百科」。
- [ ] `post/fish-oil.html` 中的 JSON-LD 內容已更新，不再包含「Caregiver」。
- [ ] 專案功能在替換後保持正常運作，無引入新的錯誤或警告。
