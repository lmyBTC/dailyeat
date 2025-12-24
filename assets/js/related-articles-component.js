console.log("<<<<< related-articles-component.js HAS LOADED >>>>>");

(function (global) {
  "use strict";

  class RelatedArticlesComponent {
    constructor(hostElement, currentArticleId, articlesData, topicArticles) {
      if (!hostElement || !currentArticleId) {
        console.error("RelatedArticlesComponent: hostElement and currentArticleId are required.");
        return;
      }
      this.hostElement = hostElement;
      this.currentArticleId = currentArticleId;
      this.shadowRoot = this.hostElement.attachShadow({ mode: "open" });
      this.topN = 4; // Number of related articles to show

      // Combine and normalize data sources
      this.allArticles = this._combineAndNormalizeData(articlesData, topicArticles);
    }

    _combineAndNormalizeData(articlesData, topicArticles) {
        const normalizedArticles = (articlesData || []).map(article => ({
            ...article,
            type: 'nutrient',
        }));

        const normalizedTopics = (topicArticles || []).map(article => ({
            ...article,
            type: 'topic',
            goals: article.goal ? [article.goal] : [],
        }));

        return [...normalizedArticles, ...normalizedTopics];
    }

    initialize() {
      if (this.allArticles.length === 0) {
        return;
      }
      const related = this.findRelatedArticles();
      this.render(related);
    }

    findRelatedArticles() {
      const currentArticle = this.allArticles.find(a => a.id === this.currentArticleId);

      if (!currentArticle || !currentArticle.goals || currentArticle.goals.length === 0) {
        return [];
      }

      const currentGoals = new Set(currentArticle.goals);

      const scoredArticles = this.allArticles
        .map(article => {
          if (article.id === this.currentArticleId) {
            return { ...article, score: -1 }; // Exclude self
          }
          const sharedGoals = (article.goals || []).filter(goal => currentGoals.has(goal));
          return { ...article, score: sharedGoals.length };
        })
        .filter(article => article.score > 0)
        .sort((a, b) => b.score - a.score);

      return scoredArticles.slice(0, this.topN);
    }

    _renderNutrientCard(article) {
        const statusColor = article.status === '完整' ? 'teal' : 'amber';
        const goalTags = (article.goals || []).map(goal => `<span class="goal-tag">${goal}</span>`).join('');
        const enNameDisplay = article.en_name ? `<span class="en-name">(${article.en_name})</span>` : '';
        const link = article.link || '#';

        return `
            <a href="${link}" class="nutrient-card-wrapper border-${statusColor}">
                <div class="card-content">
                    <div class="card-header">
                         <h3 class="card-title">
                             ${article.name}
                             ${enNameDisplay}
                         </h3>
                    </div>
                    <div class="goal-tags-container">${goalTags}</div>
                    <p class="card-desc">${article.func}</p>
                </div>
                <div class="card-footer">
                    <span class="read-more-link">閱讀文章 →</span>
                </div>
            </a>
        `;
    }

    _renderTopicCard(article) {
        const keywordsHTML = (article.keywords || '').split(', ').map(k => `<span class="keyword-tag">${k}</span>`).join('');
        return `
            <a href="${article.link}" class="topic-card-wrapper">
                <div class="card-header">
                     <h3 class="card-title">${article.title}</h3>
                </div>
                <p class="card-desc">${article.description}</p>
                <div class="card-footer">
                    ${keywordsHTML}
                </div>
            </a>
        `;
    }

    render(relatedArticles) {
      if (relatedArticles.length === 0) {
        this.hostElement.style.display = 'none';
        return;
      }
      
      const styles = `
        * {
            box-sizing: border-box;
        }
        .related-container {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid #e2e8f0;
        }
        .related-title {
          font-size: 2em;
          font-weight: 700;
          margin-bottom: 30px;
          color: #2d3748;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }
        
        /* Nutrient Card Styles (mimicking Tailwind) */
        .nutrient-card-wrapper {
            background: white;
            border-radius: 8px; /* rounded-lg */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            padding: 20px; /* p-5 */
            display: flex;
            flex-direction: column;
            height: 100%;
            border-left-width: 4px;
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
        }
        .nutrient-card-wrapper:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
            transform: translateY(-2px);
        }
        .border-teal { border-color: #14b8a6; }
        .border-amber { border-color: #f59e0b; }
        .nutrient-card-wrapper .card-content { flex-grow: 1; padding: 0; }
        .nutrient-card-wrapper .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .nutrient-card-wrapper .card-title { font-size: 1.125rem; font-weight: 700; color: #1e293b; margin: 0; border-bottom: 2px solid #ff6b35; padding-bottom: 1px; display: inline-block; }
        .nutrient-card-wrapper .en-name { font-size: 1rem; font-weight: 500; color: #64748b; margin-left: 4px; }
        .goal-tags-container { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
        .goal-tag { font-size: 0.75rem; font-weight: 500; color: #475569; background-color: #f1f5f9; padding: 2px 8px; border-radius: 9999px; }
        .nutrient-card-wrapper .card-desc { font-size: 0.875rem; color: #334155; margin-bottom: 12px; }
        .nutrient-card-wrapper .card-footer { padding: 0; margin-top: auto; }
        .read-more-link {
            display: block;
            text-align: right;
            color: #0d9488; /* teal-600 */
            font-weight: 600;
            margin-top: 8px;
            transition: color 0.2s ease;
        }
        .nutrient-card-wrapper:hover .read-more-link {
            text-decoration: underline;
        }

        /* Topic Card Styles */
        .topic-card-wrapper {
            background: white;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
        }
        .topic-card-wrapper:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
            border-color: #ff6b35;
        }
        .topic-card-wrapper .card-header { padding: 20px 25px 15px; }
        .topic-card-wrapper .card-title { font-size: 1.25em; font-weight: 600; line-height: 1.4; margin: 0; }
        .topic-card-wrapper .card-desc { font-size: 0.95em; color: #718096; padding: 0 25px; flex-grow: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .topic-card-wrapper .card-footer { padding: 20px 25px; font-size: 0.85em; display: flex; flex-wrap: wrap; gap: 5px; }
        .keyword-tag { background: #eff6ff; color: #1e40af; padding: 3px 10px; border-radius: 12px; }
      `;

      const articlesHTML = relatedArticles.map(article => {
          if (article.type === 'nutrient') {
              return this._renderNutrientCard(article);
          } else if (article.type === 'topic') {
              return this._renderTopicCard(article);
          }
          return '';
      }).join('');

      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="related-container">
          <h2 class="related-title">相關營養素文章</h2>
          <div class="related-grid">
            ${articlesHTML}
          </div>
        </div>
      `;
    }
  }

  global.RelatedArticlesComponent = RelatedArticlesComponent;

})(window);