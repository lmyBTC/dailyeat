## API 文件

### 建構函數

```javascript
const homepage = DailyeatHomepage;
```

- `hostElement`: Shadow DOM 的宿主元素（必要）

### Getter 方法

```javascript
homepage.getTheme(); // 取得主題設定
homepage.getDebug(); // 取得除錯模式狀態
homepage.getSearchPlaceholder(); // 取得搜尋框 placeholder
homepage.getLanguage(); // 取得語言設定
homepage.getConfig(); // 取得完整設定物件
```

### Setter 方法（支援鏈式呼叫）

```javascript
homepage
    .setTheme('light|dark')           // 設定主題
    .setDebug(true|false)             // 設定除錯模式
    .setSearchPlaceholder('...')      // 設定搜尋框 placeholder
    .setLanguage('zh-TW')             // 設定語言
    .setConfig({...})                 // 批次設定
```

### 功能方法

```javascript
homepage.initialize(); // 初始化組件（必要）
homepage.reset(); // 重置所有設定
homepage.destroy(); // 銷毀組件，清理資源
```

## 使用範例

### 基本初始化

```javascript
const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("light")
  .setDebug(false)
  .initialize();
```

### 開發模式（包含除錯）

```javascript
const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("light")
  .setDebug(true) // 啟用除錯訊息
  .setLanguage("zh-TW")
  .initialize();

// 檢查設定
console.log("主題:", homepage.getTheme());
console.log("除錯模式:", homepage.getDebug());
```

### 深色主題

```javascript
const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("dark") // 深色主題
  .setDebug(false)
  .initialize();
```

### 自訂搜尋框 Placeholder

```javascript
const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
)
  .setSearchPlaceholder("輸入營養素名稱，例如：維生素C、鈣質...")
  .setTheme("light")
  .setDebug(false)
  .initialize();
```

### 批次設定

```javascript
const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
)
  .setConfig({
    theme: "dark",
    debug: false,
    language: "zh-TW",
    searchPlaceholder: "搜尋營養素...",
  })
  .initialize();
```

### 動態切換主題

```javascript
// 切換到深色主題
homepage.setTheme("dark");

// 切換到淺色主題
homepage.setTheme("light");
```

### 動態開啟/關閉除錯模式

```javascript
// 開啟除錯模式
homepage.setDebug(true);

// 關閉除錯模式（正式環境建議）
homepage.setDebug(false);
```

### 重置和重新初始化

```javascript
// 重置所有設定
homepage.reset().setTheme("light").setDebug(false).initialize();
```

### 銷毀組件

```javascript
// 清理資源（頁面離開時建議呼叫）
homepage.destroy();
```

## Shadow DOM 隔離驗證

組件使用 Closed Shadow DOM 確保完全隔離：

```javascript
// 驗證 CSS 隔離
const initialStyleCount = document.head.querySelectorAll("style").length;

const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
).initialize();

// 檢查主頁面的 CSS 數量是否增加
const finalStyleCount = document.head.querySelectorAll("style").length;
console.log("CSS 隔離:", initialStyleCount === finalStyleCount); // 應該是 true
```

## 響應式支援

組件內建響應式設計，支援以下斷點：

- **桌面版** (> 768px): 完整網格佈局
- **平板版** (≤ 768px): 調整字體大小和間距
- **手機版** (≤ 480px): 單欄佈局

## 瀏覽器支援

支援 2022 年以來的現代瀏覽器：

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

必需功能：

- Shadow DOM v1
- ES6 Classes
- CSS Grid
- Flexbox
- Promise
- Fetch API

## 除錯功能

### 開啟除錯模式

```javascript
const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
)
  .setDebug(true) // 關鍵：啟用除錯模式
  .initialize();
```

### 除錯訊息類型

- **初始化訊息**: 組件載入狀態
- **設定訊息**: 參數設定和驗證
- **樣式訊息**: CSS 載入狀態
- **內容訊息**: DOM 建立狀態
- **事件訊息**: 事件監聽器狀態
- **互動訊息**: 使用者操作回饋

### 正式環境建議

```javascript
// 正式環境應關閉除錯模式
const homepage = new DailyeatHomepage(
  document.getElementById("homepage-container")
)
  .setDebug(false) // 關閉除錯訊息
  .initialize();
```

## 互動式健康工具組件 (Health Tools)

本專案開發了一系列基於醫學實證的互動式工具，封裝為獨立的 JavaScript 類別，並使用 Shadow DOM 隔離樣式。

## 專案結構

### 內容架構理念 (Hub-and-Spoke)

本專案的內容架構採用「Hub-and-Spoke」（軸心輻射）模型，以建立主題權威性並優化 SEO。

-   **Hub (軸心)**: 為高層次的「主題彙整頁面」（如 `topic-cardiovascular-health.html`），圍繞特定健康目標提供全面性的指引。
-   **Spoke (輻射)**: 為基礎的「元素頁面」，深入探討單一「營養素」(`post/[nutrient].html`) 或「食物」(`food/[food-name].html`)。

所有文章都應遵循此模型的內部連結策略，即「主題頁面」連結到多個「元素頁面」，而「元素頁面」也應連回答所屬的「主題頁面」，形成緊密的內容網絡。詳細的寫作與連結指引請參閱 `doc/writing-guide.md`。

```
dailyeat/
├── index.html                     # 主頁面文件
├── category/
│   ├── archive.html               # 文章總覽頁面 (動態載入)
│   ├── health-topics.html         # 健康主題頁面 (動態載入)
│   ├── nutrient-dashboard.html    # 互動式儀表板 (動態載入)
│   ├── tools.html                 # 健康計算機工具箱 (整合多項工具)
│   ├── foodWiki.html              # 食物營養資料庫頁面
│   └── brands.html                # 合作專屬優惠頁面
├── brand/
│   └── betterbio.html             # BetterBio 專屬優惠頁面
├── post/
│   ├── [nutrient].html            # 核心營養素文章
│   └── topic-[topic-name].html    # 主題式文章
├── food/
│   ├── [food-name].html           # 獨立食物營養頁面
│   └── food_data.js               # 食物資料庫
├── assets/
│   └── js/
│       ├── articles-data.js         # 文章與營養素的中央資料庫
│       ├── archive-logic.js         # 文章總覽頁面的顯示邏輯
│       ├── health-topics-logic.js   # 健康主題頁面的顯示邏輯
│       ├── dashboard-logic.js       # 儀表板頁面的顯示邏輯
│       └── tools-JS/               # 獨立工具組件
│           ├── caffeine-calculator.js
│           ├── fish-oil-calculator.js
│           ├── cardio-risk-calculator.js
│           ├── ionic-balance-calculator.js
│           └── zone2-calculator.js
│       └── ...
├── doc/
│   ├── writing-guide.md           # 文章風格指引
│   └── new-page-checklist.md      # 新增頁面檢查清單
├── CLAUDE.md                     # 開發規範
└── README.md                     # 本文件
```

### 管理文件流程 (Management Document Workflow)

為了有效管理專案任務與進度，我們採用以下文件流程規範：

1.  **管理文件存放**: 所有管理文件皆存放於 `doc_task/` 資料夾中。
2.  **待辦清單 (Todo List)**: `doc_task/todo.md` 用於記錄主要工作摘要與進度追蹤。
3.  **任務規劃與執行文件**: 每項完整的工作規劃與執行細節會獨立存放於 `doc_task/` 下的 `task_任務名稱.md` 文件中 (例如：`task_更新品牌名稱.md`)。
4.  **新任務建立**: 當有新任務需求時，應使用 `doc_task/task_template.md` 範本建立新的 `task_任務名稱.md` 規劃執行文件。
5.  **進度回寫**: 任務完成後，其進度摘要會回寫至 `doc_task/todo.md` 進行更新。
6.  **文件歸檔**: 已完成的任務文件 (例如 `task_更新品牌名稱.md`) 將會移動至 `doc_task/task_archive/` 資料夾中進行保存與歸檔。

## 重要注意事項

### Shadow DOM 隔離要求

- **正確**：所有 CSS 都在 Shadow DOM 內
- **錯誤**：不可將 CSS 注入到主頁面 `<head>`

### Debug 參數要求

- **正確**：`setDebug(false)` 時不輸出任何除錯訊息
- **錯誤**：忽略 debug 設定，總是輸出訊息

### 鏈式呼叫要求

- **正確**：所有 setter 方法都回傳 `this`
- **錯誤**：setter 方法回傳其他值或 undefined

## 版本更新

所有更新都會保持向後相容性，不會產生 Breaking Changes。

## 技術支援

如有問題，請檢查：

1. **瀏覽器相容性**：確保使用支援的瀏覽器版本
2. **Shadow DOM 支援**：檢查 `'attachShadow' in Element.prototype`
3. **JavaScript 錯誤**：開啟開發者工具查看錯誤訊息
4. **除錯模式**：暫時啟用 `setDebug(true)` 查看詳細訊息
