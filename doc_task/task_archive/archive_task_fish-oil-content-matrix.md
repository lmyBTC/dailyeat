# 任務名稱：魚油 (Omega-3) 權威網站內容矩陣建置 (2025 Revised)

**狀態**: `已上線`
**負責人**: @Antigravity
**更新日期**: 2025-12-31
**核心目標**: 建立以用戶體驗為核心的魚油 Topical Authority，透過「Hub (入口) -> Core (核心) -> Verticals (分眾)」的三層架構，解決使用者全方位需求。

---

## 1. 策略思維 (Strategic Mindset)

因應內容擴充，我們採用更立體的**三層式導流架構**：
- **Level 1: The Hub (入口)** - 視覺化策展頁面，作為 Header 導航的頂層入口，負責分流。
- **Level 2: The Core (觀念)** - `fish-oil.html` 作為 SEO 核心頁，承接 "魚油功效" 等大流量關鍵字，提供完整基礎知識。
- **Level 3: The Verticals (深度)** - 針對特定族群 (分眾) 或 功能 (工具/評測) 提供深度解答。

## 2. 內容矩陣架構 (Content Matrix)

### Level 1: 專題入口 (The Hub)
| 頁面 | 檔案路徑 | 定位與功能 |
| :--- | :--- | :--- |
| **魚油專題首頁** | `post/fish-oil-hubpage.html` | **[Header Entry]** 視覺化雜誌風格首頁。不側重長文 SEO，而是透過 "Curated Paths" (精選路徑)、"Deep Dive" (深度特寫) 與 "互動工具" 引導使用者進入適合的子頁面。 |

### Level 2: 核心觀念 (The Core)
| 頁面 | 檔案路徑 | 定位與功能 |
| :--- | :--- | :--- |
| **基礎保養指南** | `post/fish-oil.html` | **[Traffic Anchor]** SEO 流量主力。涵蓋 80% 的使用情境，從功效、rTG 型態到挑選標準的完整懶人包。適合 "新手" 或 "一般搜尋者"。 |

### Level 3: 深度分眾與工具 (Verticals & Utilities)

#### A. 分眾指南 (For Whom)
| 頁面 | 檔案路徑 | 重點受眾 | 關鍵痛點 |
| :--- | :--- | :--- | :--- |
| **全齡族群總覽** | `post/fish-oil-groups.html` | **孕婦、兒童、學生、成人** | 整合性分眾頁面。針對不同生命階段 (Life Stages) 提供劑量與選購建議 (如孕婦需注意 DHA 比例)。 |
| **銀髮心血管專區** | `post/fish-oil-senior.html` | **銀髮族、三高族群** | 專注於心血管保養。重點解決「藥物交互作用」(抗凝血劑) 與「高濃度 EPA」需求。 |

#### B. 專業知識 (Technical Deep Dive)
| 頁面 | 檔案路徑 | 核心議題 |
| :--- | :--- | :--- |
| **型態大解析** | `post/fish-oil-structure.html` | rTG vs EE vs TG 的終極比較 (吸收率與 CP 值)。 |
| **品質與檢驗** | `post/fish-oil-quality.html` | IFOS 認證、重金屬檢測、濃度計算公式。 |
| **來源與環保** | `post/fish-oil-sources.html` | 魚油 vs 藻油 vs 磷蝦油。素食者解決方案。 |

#### C. 實用工具與評測 (Utilities)
| 頁面 | 檔案路徑 | 功能說明 |
| :--- | :--- | :--- |
| **挑選工具箱** | `post/fish-oil-tools.html` | **[Interactive]** 包含「劑量計算機」、「成分分析器」與「智能篩選器」。讓數據說話。 |
| **市場評測** | `post/fish-oil-market-analysis.html` | 編輯嚴選市售產品分析與比較 (無廣告導向)。 |
| **食用指南** | `post/fish-oil-guide.html` | 何時吃？怎麼吃？副作用排除 (拉肚子/長痘痘)。 |
| **常見問答** | `post/fish-oil-faq.html` | 快速解答零碎問題 (FAQ Schema Optimized)。 |

## 3. 導流邏輯 (Navigation Flow)

1.  **Header Bar**: 連結至 `fish-oil-hubpage.html`。
2.  **Hub Page**: 提供前往 `fish-oil.html` (新手)、`fish-oil-groups.html` (分眾找答案)、`fish-oil-tools.html` (工具) 的快速卡片。
3.  **Core Page (`fish-oil.html`)**: 在各章節末端嵌入 `Related Article Cards`，將想要深入了解 "rTG" 或 "孕婦吃法" 的人導流至對應的 Vertical Page。

## 4. 驗收標準 (Revised)

- [x] **Hub Page 上線**: 確保 `fish-oil-hubpage.html` 視覺風格符合 Modern Editorial，且所有連結正確。
- [x] **Core Page 定位**: 確認 `fish-oil.html` 已移除過度細碎的分眾內容，專注於通用性知識導引。
- [x] **Verticals 完整性**: 確認 Groups 與 Senior 頁面內容不與 Core Page 重複，而是更深入。
- [x] **Tools 功能正常**: 計算機與篩選器需能正確運作並提供有價值的結果。
