// Floating Table of Contents and Reading Experience Enhancements
class FloatingElements {
  constructor() {
    this.init();
  }

  init() {
    if (this.isPostPage()) {
      this.initFloatingTOC();
      this.initReadingCompanion();
      this.initRelatedConceptsNavigator();
    }
  }

  isPostPage() {
    return document.querySelector('.post-content') !== null;
  }

  // 1. Floating Table of Contents
  initFloatingTOC() {
    const content = document.querySelector('.post-content');
    const headings = content.querySelectorAll('h1, h2, h3, h4');
    
    // Only show TOC for longer articles with multiple headings
    if (headings.length < 2 || this.getWordCount(content) < 1500) return;

    const toc = this.createTOC(headings);
    document.body.appendChild(toc);

    this.setupTOCScrollBehavior(toc);
    this.setupTOCClicks(toc, headings);
  }

  createTOC(headings) {
    const toc = document.createElement('div');
    toc.className = 'floating-toc hidden';
    toc.innerHTML = `
      <div class="toc-header">
        <span class="toc-title">Contents</span>
        <button class="toc-toggle" aria-label="Toggle table of contents">×</button>
      </div>
      <div class="toc-progress">
        <div class="progress-bar"></div>
      </div>
      <nav class="toc-nav">
        ${Array.from(headings).map((heading, index) => {
          const id = heading.id || `heading-${index}`;
          if (!heading.id) heading.id = id;
          return `<a href="#${id}" class="toc-link toc-${heading.tagName.toLowerCase()}" data-target="${id}">${heading.textContent.trim()}</a>`;
        }).join('')}
      </nav>
    `;

    // Toggle functionality
    const toggle = toc.querySelector('.toc-toggle');
    toggle.addEventListener('click', () => {
      toc.classList.toggle('collapsed');
    });

    return toc;
  }

  setupTOCScrollBehavior(toc) {
    const header = document.querySelector('.site-header');
    let headerHeight = header ? header.offsetHeight : 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      
      // Show/hide TOC based on scroll position
      if (scrollTop > headerHeight + 100) {
        toc.classList.remove('hidden');
      } else {
        toc.classList.add('hidden');
      }

      // Update progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      toc.querySelector('.progress-bar').style.width = `${Math.min(progress, 100)}%`;

      // Highlight current section
      this.highlightCurrentSection(toc);
    });
  }

  setupTOCClicks(toc, headings) {
    const links = toc.querySelectorAll('.toc-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  highlightCurrentSection(toc) {
    const links = toc.querySelectorAll('.toc-link');
    let currentLink = null;
    
    links.forEach(link => {
      const target = document.getElementById(link.dataset.target);
      if (target) {
        const rect = target.getBoundingClientRect();
        if (rect.top <= 100) {
          currentLink = link;
        }
      }
    });

    links.forEach(link => link.classList.remove('active'));
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }

  // 2. Related Concepts Navigator
  initRelatedConceptsNavigator() {
    const post = document.querySelector('.post');
    if (!post) return;

    const categories = this.extractCategories();
    if (categories.length === 0) return;

    // Create concept navigator
    const navigator = document.createElement('div');
    navigator.className = 'concepts-navigator hidden';
    navigator.innerHTML = `
      <div class="concepts-header">Related Themes</div>
      <div class="concepts-breadcrumb">
        ${categories.map(cat => `<span class="concept-item" data-category="${cat.toLowerCase()}">${cat}</span>`).join('<span class="concept-separator">→</span>')}
      </div>
    `;

    document.body.appendChild(navigator);

    // Show on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 200) {
        navigator.classList.remove('hidden');
      } else {
        navigator.classList.add('hidden');
      }
    });

    // Add click handlers for navigation
    navigator.querySelectorAll('.concept-item').forEach(item => {
      item.addEventListener('click', () => {
        const category = item.dataset.category;
        window.location.href = `/categories/${category}/`;
      });
    });
  }

  // 3. Reading Companion
  initReadingCompanion() {
    const content = document.querySelector('.post-content');
    if (!content) return;

    const companion = document.createElement('div');
    companion.className = 'reading-companion hidden';
    
    const readingTime = this.extractReadingTime();
    const wordCount = this.getWordCount(content);

    companion.innerHTML = `
      <div class="companion-header">
        <div class="tea-cup">
          <div class="tea-liquid"></div>
        </div>
      </div>
      <div class="reading-stats">
        <div class="time-remaining">${readingTime} min</div>
        <div class="progress-text">0%</div>
      </div>
      <div class="companion-actions">
        <button class="bookmark-btn" aria-label="Bookmark position" title="Save reading position">📖</button>
        <button class="share-btn" aria-label="Share quote" title="Share a quote">💭</button>
      </div>
    `;

    document.body.appendChild(companion);

    this.setupReadingCompanionBehavior(companion, readingTime);
  }

  setupReadingCompanionBehavior(companion, totalReadingTime) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      // Show/hide companion
      if (scrollTop > 300) {
        companion.classList.remove('hidden');
      } else {
        companion.classList.add('hidden');
      }

      // Update tea cup fill and time remaining
      const teaLiquid = companion.querySelector('.tea-liquid');
      const progressText = companion.querySelector('.progress-text');
      const timeRemaining = companion.querySelector('.time-remaining');

      if (teaLiquid && progressText && timeRemaining) {
        teaLiquid.style.height = `${Math.min(progress, 100)}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        
        const remainingTime = Math.max(0, Math.round(totalReadingTime * (1 - progress / 100)));
        timeRemaining.textContent = remainingTime > 0 ? `${remainingTime} min` : 'Complete!';
      }
    });

    // Bookmark functionality
    const bookmarkBtn = companion.querySelector('.bookmark-btn');
    bookmarkBtn.addEventListener('click', () => {
      const position = window.pageYOffset;
      localStorage.setItem(`bookmark-${window.location.pathname}`, position);
      bookmarkBtn.textContent = '✓';
      setTimeout(() => bookmarkBtn.textContent = '📖', 1000);
    });

    // Share functionality (basic implementation)
    const shareBtn = companion.querySelector('.share-btn');
    shareBtn.addEventListener('click', () => {
      const selection = window.getSelection().toString();
      if (selection) {
        if (navigator.share) {
          navigator.share({
            title: document.title,
            text: `"${selection}" - ${document.title}`,
            url: window.location.href
          });
        } else {
          // Fallback to copying to clipboard
          navigator.clipboard.writeText(`"${selection}" - ${document.title} (${window.location.href})`);
          shareBtn.textContent = '✓';
          setTimeout(() => shareBtn.textContent = '💭', 1000);
        }
      }
    });
  }

  // Helper functions
  getWordCount(element) {
    const text = element.textContent || element.innerText || '';
    return text.trim().split(/\s+/).length;
  }

  extractCategories() {
    const categoriesElement = document.querySelector('.categories');
    if (!categoriesElement) return [];
    
    const links = categoriesElement.querySelectorAll('a');
    return Array.from(links).map(link => link.textContent.trim());
  }

  extractReadingTime() {
    const readingTimeElement = document.querySelector('.reading-time');
    if (readingTimeElement) {
      const match = readingTimeElement.textContent.match(/(\d+)/);
      return match ? parseInt(match[1]) : 5;
    }
    return 5;
  }

  // Load saved bookmark on page load
  loadBookmark() {
    const savedPosition = localStorage.getItem(`bookmark-${window.location.pathname}`);
    if (savedPosition) {
      const shouldJump = confirm('You have a saved reading position. Jump to where you left off?');
      if (shouldJump) {
        window.scrollTo(0, parseInt(savedPosition));
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const floatingElements = new FloatingElements();
  floatingElements.loadBookmark();
});