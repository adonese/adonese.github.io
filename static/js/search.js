// Inline Search Modal
(function() {
  let searchIndex = null;
  let searchModal = null;
  let searchInput = null;
  let searchResults = null;

  // Create modal HTML
  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.innerHTML = `
      <div class="search-container">
        <div class="search-header">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" id="search-input" placeholder="Search posts..." autocomplete="off" />
          <button class="search-close">ESC</button>
        </div>
        <div class="search-results"></div>
        <div class="search-hint">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>Enter</kbd> to select</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  // Fetch and parse search index
  async function loadSearchIndex() {
    if (searchIndex) return searchIndex;
    try {
      const response = await fetch('/index.json');
      searchIndex = await response.json();
      return searchIndex;
    } catch (e) {
      console.error('Failed to load search index:', e);
      return [];
    }
  }

  // Search function
  function search(query) {
    if (!searchIndex || !query.trim()) return [];

    const terms = query.toLowerCase().split(/\s+/);

    return searchIndex
      .map(post => {
        const title = (post.title || '').toLowerCase();
        const content = (post.content || '').toLowerCase();
        const summary = (post.summary || '').toLowerCase();

        let score = 0;
        for (const term of terms) {
          if (title.includes(term)) score += 10;
          if (summary.includes(term)) score += 5;
          if (content.includes(term)) score += 1;
        }

        return { ...post, score };
      })
      .filter(post => post.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  // Render results
  function renderResults(results) {
    if (!results.length) {
      searchResults.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }

    searchResults.innerHTML = results.map((post, index) => `
      <div class="search-result" data-url="${post.permalink}" data-index="${index}">
        <div class="search-result-title">${escapeHtml(post.title)}</div>
        <div class="search-result-excerpt">${escapeHtml(post.summary || '')}</div>
        <div class="search-result-meta">${formatDate(post.date)}</div>
      </div>
    `).join('');

    // Add click handlers
    searchResults.querySelectorAll('.search-result').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.url;
      });
    });
  }

  // Helper functions
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Keyboard navigation
  let selectedIndex = -1;

  function selectResult(index) {
    const results = searchResults.querySelectorAll('.search-result');
    results.forEach((el, i) => {
      el.classList.toggle('selected', i === index);
      if (i === index) {
        el.style.background = 'var(--bg-subtle)';
      } else {
        el.style.background = '';
      }
    });
    selectedIndex = index;

    // Scroll into view
    if (results[index]) {
      results[index].scrollIntoView({ block: 'nearest' });
    }
  }

  // Open modal
  function openModal() {
    searchModal.classList.add('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    selectedIndex = -1;
    searchInput.focus();
    loadSearchIndex();
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Initialize
  function init() {
    searchModal = createModal();
    searchInput = document.getElementById('search-input');
    searchResults = searchModal.querySelector('.search-results');

    // Search input handler
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (query.trim()) {
        const results = search(query);
        renderResults(results);
        selectedIndex = -1;
      } else {
        searchResults.innerHTML = '';
      }
    });

    // Keyboard handler
    searchInput.addEventListener('keydown', (e) => {
      const results = searchResults.querySelectorAll('.search-result');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectResult(Math.min(selectedIndex + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectResult(Math.max(selectedIndex - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          window.location.href = selected.dataset.url;
        }
      }
    });

    // Close handlers
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeModal();
    });

    searchModal.querySelector('.search-close').addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeModal();
      }
      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchModal.classList.contains('active')) {
          closeModal();
        } else {
          openModal();
        }
      }
    });

    // Intercept search link clicks
    document.querySelectorAll('a[href="/search/"], a[href="/search"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
