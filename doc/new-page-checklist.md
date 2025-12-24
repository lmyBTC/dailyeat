# New Page Checklist

## 1. Preparation
- [ ] Copy `00template.html` to `post/[new-page-slug].html`.
- [ ] Ensure the filename uses kebab-case (e.g., `vitamin-c.html`).

## 2. Metadata Setup
- [ ] Update `<title>`: `[Nutrient] - [Main Benefit] | [Site Name]`
- [ ] Update `<meta name="description">`: Concise summary (150-160 chars).
- [ ] Update `<meta name="keywords">`.
- [ ] Update Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`).

## 3. Content Implementation
- [ ] Write content following `doc/writing-guide.md` (PSMA structure).
- [ ] Use semantic HTML (`<h2>`, `<h3>`, `<p>`, `<ul>`).
- [ ] Apply CSS classes:
    - `.alert` (with `.alert-doctor`, `.alert-nutritionist`, or `.alert-tip`)
    - `.info-cards` or `.risk-group-cards` (Max 2/3 cards per container)
    - `.responsive-table-wrapper` for tables.

## 4. Components
- [ ] Ensure `ResponsiveTocComponent` is included and configured.
- [ ] Ensure `RelatedArticlesComponent` is included.

## 5. JSON-LD Structured Data
- [ ] Update `WebSite` schema (if needed).
- [ ] Update `Article` schema (headline, description, author, date).
- [ ] Update `FAQPage` schema (populate with 20 FAQs).
- [ ] Update `BreadcrumbList` schema.

## 6. System Updates
- [ ] Update `assets/js/articles-data.js` with the new article info.
- [ ] Update `sitemap.xml` to include the new URL.
- [ ] Verify `post/archive.html` (if manual update is required, though logic might handle it).

## 7. Verification
- [ ] Check console for errors (Debug mode).
- [ ] Verify RWD (Mobile/Desktop).
- [ ] Check Shadow DOM isolation (if applicable).
