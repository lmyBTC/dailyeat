# 任務名稱：魚油 (Omega-3) 權威網站內容矩陣建置

**狀態**: `規劃中`
**負責人**: @Antigravity
**預計完成日期**: 2025-01-15
**相關連結**: `doc/draft/魚油 (Omega-3) 權威網站內容矩陣規劃大綱.md`

---

## 1. 任務目標 (Objective)

建立以魚油 (Omega-3) 為核心的權威內容矩陣，透過 1 個 Hub 頁面與 7 個 Spoke 衛星頁面，構建完整的 Topical Authority。目標是為讀者提供從基礎科普、品質辨識到受眾建議與產品評測的全方位資訊，並提升網站的 SEO 權威性與轉化率。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 內容架構
- **Hub Page**: 作為流量入口與百科全書，連結所有深入探討的衛星頁面。
- **Spoke Pages**: 針對特定痛點（型態、濃度、受眾、產品評測）提供深度的專業內容。

### 2.2. 檔案分配 (Matrix)

| 類型 | 頁面名稱 | 檔案路徑 | 狀態 |
| :--- | :--- | :--- | :--- |
| **Hub** | 魚油知識百科 (2025 全攻略) | `post/fish-oil.html` | 已有基礎，需擴充 |
| **Spoke 1** | 型態大對決 (rTG/TG/EE) | `post/fish-oil-structure.html` | 待建立 |
| **Spoke 2** | 品質辨識 (濃度、檢驗、新鮮度) | `post/fish-oil-quality.html` | 待建立 |
| **Spoke 3** | 受眾建議 (孕婦與兒童) | `post/fish-oil-pregnancy-child.html` | 待建立 |
| **Spoke 4** | 受眾建議 (銀髮與三高) | `post/fish-oil-senior.html` | 待建立 |
| **Spoke 5** | 市場真相 (深度評測與計算機) | `post/fish-oil-market-analysis.html` | 已建立 |
| **Spoke 6** | 來源來源比較 (魚油/藻油/磷蝦油) | `post/fish-oil-sources.html` | 待建立 |
| **Spoke 7** | 食用指南 (吃法與常見迷思) | `post/fish-oil-guide.html` | 待建立 (部分於 FAQ) |
| **Extra** | 魚油常見問題 (FAQ) | `post/fish-oil-faq.html` | 已建立 |

## 3. 任務拆解 (Task Breakdown)

### 第一階段：內容擴展與架構優化
- [ ] 依據大綱擴充 `post/fish-oil.html` (Hub Page) 的內容。
- [ ] 串聯現有的 `post/fish-oil-market-analysis.html` 與 `post/fish-oil-faq.html`。

### 第二階段：衛星頁面開發 (技術與品質)
- [ ] 建立「型態大對決」頁面 (`post/fish-oil-structure.html`)。
- [ ] 建立「品質辨識」頁面 (`post/fish-oil-quality.html`)。

### 第三階段：衛星頁面開發 (受眾與比較)
- [ ] 建立「孕婦與兒童」專頁 (`post/fish-oil-pregnancy-child.html`)。
- [ ] 建立「銀髮與三高」專頁 (`post/fish-oil-senior.html`)。
- [ ] 建立「來源比較 (魚油/藻油/磷蝦油)」專頁 (`post/fish-oil-sources.html`)。

### 第四階段：完善與整合
- [ ] 建立「食用指南」專頁 (`post/fish-oil-guide.html`)。
- [ ] 統一更新 `assets/js/articles-data.js` 與 `sitemap.xml`。
- [ ] 驗證所有內部連結與標題層級。

## 4. 影響評估 (Impact Assessment)

### 相依性
- 依賴 `article.css` 與 `article-fish-oil.js` 作為基礎樣式與邏輯。
- 所有新頁面需引用 `RelatedArticlesComponent` 以強化矩陣連結。

## 5. 驗收標準 (Acceptance Criteria)

- [ ] 所有大綱中提到的 1 個 Hub 與 7 個 Spoke 均完成並正確發佈。
- [ ] 頁面之間具備良好的內部連結 (Internal Linking) 邏輯。
- [ ] SEO 元數據 (Title, Description, Keywords) 依據大綱設定完成。
- [ ] 符合專案規範：Shadow DOM、原生 JS、無外部框架依賴。
