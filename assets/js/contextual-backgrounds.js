// Contextual Backgrounds System
class ContextualBackgrounds {
  constructor() {
    this.init();
  }

  init() {
    this.applyContextualBackground();
    this.setupTransitions();
  }

  // Apply background based on page context
  applyContextualBackground() {
    const body = document.body;
    
    // Check if we're on a post page
    if (this.isPostPage()) {
      const categories = this.extractCategories();
      const primaryCategory = this.getPrimaryCategory(categories);
      
      if (primaryCategory) {
        // Add contextual background class
        body.classList.add('contextual-bg', `bg-${primaryCategory}`);
        
        // Store the category for potential future use
        body.setAttribute('data-primary-category', primaryCategory);
      }
    } 
    // Check if we're on a category page
    else if (this.isCategoryPage()) {
      const categoryName = this.extractCategoryFromURL();
      if (categoryName) {
        body.classList.add('contextual-bg', `bg-${categoryName}`);
        body.setAttribute('data-primary-category', categoryName);
      }
    }
    // Homepage gets a subtle mixed background
    else if (this.isHomePage()) {
      body.classList.add('contextual-bg', 'bg-mixed');
      this.createMixedBackground();
    }
  }

  // Setup smooth transitions when navigating
  setupTransitions() {
    // Add transition class for smooth background changes
    document.body.style.transition = 'background 0.8s ease';
    
    // Listen for page changes (for SPA-like navigation if implemented later)
    window.addEventListener('beforeunload', () => {
      document.body.style.opacity = '0.95';
    });
  }

  // Helper functions
  isPostPage() {
    return document.querySelector('.post-content') !== null;
  }

  isCategoryPage() {
    return document.querySelector('.category-page') !== null;
  }

  isHomePage() {
    return window.location.pathname === '/' || window.location.pathname === '/index.html';
  }

  extractCategories() {
    const categoriesElement = document.querySelector('.categories');
    if (!categoriesElement) return [];
    
    const links = categoriesElement.querySelectorAll('a');
    return Array.from(links).map(link => {
      return link.textContent.trim().toLowerCase();
    });
  }

  extractCategoryFromURL() {
    const path = window.location.pathname;
    const categoryMatch = path.match(/\/categories\/([^\/]+)\//);
    return categoryMatch ? categoryMatch[1] : null;
  }

  // Determine the primary category for background selection
  getPrimaryCategory(categories) {
    // Priority order for philosophical themes
    const categoryPriority = {
      'consciousness': 1,
      'ethics': 2,
      'beauty': 3,
      'society': 4
    };

    // Filter out 'essays' and other non-thematic categories
    const thematicCategories = categories.filter(cat => 
      categoryPriority.hasOwnProperty(cat)
    );

    if (thematicCategories.length === 0) return null;

    // Return the highest priority category
    return thematicCategories.sort((a, b) => 
      categoryPriority[a] - categoryPriority[b]
    )[0];
  }

  // Create a mixed background for homepage
  createMixedBackground() {
    const body = document.body;
    
    // Create a subtle blend of all category patterns
    const mixedStyle = document.createElement('style');
    mixedStyle.textContent = `
      .contextual-bg.bg-mixed::before {
        background-image: 
          radial-gradient(circle at 15% 15%, rgba(100, 149, 237, 0.015) 0%, transparent 40%),
          radial-gradient(circle at 85% 30%, rgba(255, 182, 193, 0.02) 0%, transparent 50%),
          linear-gradient(45deg, rgba(105, 105, 105, 0.01) 25%, transparent 25%),
          radial-gradient(circle at 50% 80%, rgba(139, 69, 19, 0.015) 1px, transparent 1px);
        background-size: 600px 600px, 500px 500px, 100px 100px, 150px 150px;
        background-position: 0% 0%, 100% 30%, 0 0, 75px 75px;
        animation: mixed-ambient 30s ease-in-out infinite;
      }
      
      @keyframes mixed-ambient {
        0%, 100% { 
          background-position: 0% 0%, 100% 30%, 0 0, 75px 75px;
          opacity: 0.015;
        }
        25% { 
          background-position: 10% 10%, 90% 40%, 25px 25px, 100px 50px;
          opacity: 0.02;
        }
        50% { 
          background-position: 20% 5%, 80% 50%, 50px 0, 50px 100px;
          opacity: 0.018;
        }
        75% { 
          background-position: 5% 20%, 95% 20%, 25px 50px, 125px 25px;
          opacity: 0.012;
        }
      }
    `;
    document.head.appendChild(mixedStyle);
  }

  // Method to update background when categories change (for future dynamic content)
  updateBackground(newCategories) {
    const body = document.body;
    
    // Remove existing contextual background classes
    body.classList.remove('bg-consciousness', 'bg-ethics', 'bg-beauty', 'bg-society', 'bg-mixed');
    
    // Apply new background
    const primaryCategory = this.getPrimaryCategory(newCategories);
    if (primaryCategory) {
      body.classList.add(`bg-${primaryCategory}`);
      body.setAttribute('data-primary-category', primaryCategory);
    }
  }

  // Method to temporarily intensify background (for special moments)
  intensifyBackground(duration = 3000) {
    const body = document.body;
    const currentOpacity = this.getCurrentBackgroundOpacity();
    
    // Temporarily increase opacity
    const style = document.createElement('style');
    style.textContent = `
      .contextual-bg::before {
        opacity: ${currentOpacity * 2} !important;
        transition: opacity 0.5s ease;
      }
    `;
    document.head.appendChild(style);
    
    // Return to normal after duration
    setTimeout(() => {
      document.head.removeChild(style);
    }, duration);
  }

  getCurrentBackgroundOpacity() {
    const body = document.body;
    if (body.classList.contains('bg-consciousness')) return 0.02;
    if (body.classList.contains('bg-ethics')) return 0.02;
    if (body.classList.contains('bg-beauty')) return 0.02;
    if (body.classList.contains('bg-society')) return 0.02;
    if (body.classList.contains('bg-mixed')) return 0.015;
    return 0.01;
  }

  // Method to get current background info (for debugging or other features)
  getCurrentBackground() {
    const body = document.body;
    const category = body.getAttribute('data-primary-category');
    const hasBackground = body.classList.contains('contextual-bg');
    
    return {
      category,
      hasBackground,
      classes: Array.from(body.classList).filter(cls => cls.startsWith('bg-'))
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.contextualBackgrounds = new ContextualBackgrounds();
  
  // Make intensify method available globally for special interactions
  window.intensifyBackground = (duration) => {
    if (window.contextualBackgrounds) {
      window.contextualBackgrounds.intensifyBackground(duration);
    }
  };
});