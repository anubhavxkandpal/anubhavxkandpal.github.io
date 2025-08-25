// Interactive Quote Highlighting System
class InteractiveQuoteHighlighting {
  constructor() {
    this.highlights = new Map();
    this.communityHighlights = new Map(); // For future community features
    this.selectionThreshold = 10; // Minimum characters to highlight
    this.init();
  }

  init() {
    this.setupSelectionHandling();
    this.loadSavedHighlights();
    this.createHighlightUI();
    this.setupKeyboardShortcuts();
    this.restoreHighlights();
  }

  // Selection and Highlighting Core
  setupSelectionHandling() {
    let selectionTimeout;
    
    document.addEventListener('mouseup', (e) => {
      clearTimeout(selectionTimeout);
      selectionTimeout = setTimeout(() => {
        this.handleSelection(e);
      }, 100);
    });

    // Handle keyboard selection (shift + arrow keys)
    document.addEventListener('keyup', (e) => {
      if (e.shiftKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        setTimeout(() => {
          this.handleSelection(e);
        }, 50);
      }
    });

    // Clear highlight UI when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.highlight-ui') && !e.target.closest('.user-highlight')) {
        this.hideHighlightUI();
      }
    });
  }

  handleSelection(e) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText.length < this.selectionThreshold) {
      this.hideHighlightUI();
      return;
    }

    // Only allow highlighting within post content
    const postContent = document.querySelector('.post-content, .page-content');
    if (!postContent || !postContent.contains(selection.anchorNode)) {
      this.hideHighlightUI();
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    this.showHighlightUI(selectedText, range, {
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  }

  // UI Components
  createHighlightUI() {
    const ui = document.createElement('div');
    ui.className = 'highlight-ui hidden';
    ui.innerHTML = `
      <div class="highlight-options">
        <button class="highlight-btn wisdom" data-type="wisdom" title="Mark as Wisdom">💡</button>
        <button class="highlight-btn insight" data-type="insight" title="Personal Insight">🔍</button>
        <button class="highlight-btn beautiful" data-type="beautiful" title="Beautiful Passage">✨</button>
        <button class="highlight-btn share" data-action="share" title="Share Quote">📤</button>
        <button class="highlight-btn save" data-action="save" title="Save Highlight">💾</button>
        <button class="highlight-btn remove" data-action="remove" title="Remove Highlight">🗑️</button>
      </div>
      <div class="highlight-text-preview"></div>
    `;
    
    document.body.appendChild(ui);
    
    // Add event listeners
    ui.addEventListener('click', (e) => {
      e.stopPropagation();
      const button = e.target.closest('button');
      if (!button) return;
      
      if (button.dataset.type) {
        this.createHighlight(button.dataset.type);
      } else if (button.dataset.action) {
        this.handleAction(button.dataset.action);
      }
    });
    
    this.highlightUI = ui;
  }

  showHighlightUI(text, range, position) {
    const ui = this.highlightUI;
    const preview = ui.querySelector('.highlight-text-preview');
    
    // Store current selection data
    this.currentSelection = { text, range, position };
    
    // Update preview
    preview.textContent = text.length > 100 ? text.substring(0, 100) + '...' : text;
    
    // Position UI
    ui.style.left = `${Math.max(10, Math.min(position.x - 150, window.innerWidth - 310))}px`;
    ui.style.top = `${Math.max(10, position.y - 80)}px`;
    
    // Check if text is already highlighted
    const existingHighlight = this.findExistingHighlight(text);
    if (existingHighlight) {
      ui.classList.add('existing-highlight');
      ui.querySelector('.remove').style.display = 'block';
    } else {
      ui.classList.remove('existing-highlight');
      ui.querySelector('.remove').style.display = 'none';
    }
    
    ui.classList.remove('hidden');
  }

  hideHighlightUI() {
    if (this.highlightUI) {
      this.highlightUI.classList.add('hidden');
    }
    
    // Clear selection
    window.getSelection().removeAllRanges();
    this.currentSelection = null;
  }

  // Highlight Creation and Management
  createHighlight(type) {
    if (!this.currentSelection) return;
    
    const { text, range } = this.currentSelection;
    const highlightId = this.generateHighlightId(text, range);
    
    // Create highlight element
    const highlightElement = document.createElement('span');
    highlightElement.className = `user-highlight highlight-${type}`;
    highlightElement.setAttribute('data-highlight-id', highlightId);
    highlightElement.setAttribute('data-highlight-type', type);
    highlightElement.setAttribute('title', `${this.getTypeDisplayName(type)} - Click to manage`);
    
    try {
      range.surroundContents(highlightElement);
      
      // Store highlight data
      this.highlights.set(highlightId, {
        id: highlightId,
        text,
        type,
        timestamp: Date.now(),
        url: window.location.pathname,
        context: this.getContextAroundText(range, 50)
      });
      
      // Save to localStorage
      this.saveHighlights();
      
      // Add click handler
      highlightElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showHighlightDetails(highlightId);
      });
      
      this.hideHighlightUI();
      
      // Trigger special effect for beautiful passages
      if (type === 'beautiful') {
        this.triggerBeautifulEffect(highlightElement);
      }
      
    } catch (error) {
      console.warn('Could not create highlight:', error);
      this.createAlternativeHighlight(text, type);
    }
  }

  createAlternativeHighlight(text, type) {
    // Fallback method for complex selections
    const postContent = document.querySelector('.post-content, .page-content');
    if (!postContent) return;
    
    const walker = document.createTreeWalker(
      postContent,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      const nodeText = node.textContent;
      const index = nodeText.indexOf(text);
      
      if (index !== -1) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + text.length);
        
        const highlightElement = document.createElement('span');
        highlightElement.className = `user-highlight highlight-${type}`;
        highlightElement.setAttribute('data-highlight-text', text);
        
        try {
          range.surroundContents(highlightElement);
          break;
        } catch (error) {
          continue;
        }
      }
    }
  }

  // Highlight Actions
  handleAction(action) {
    if (!this.currentSelection) return;
    
    switch (action) {
      case 'share':
        this.shareHighlight();
        break;
      case 'save':
        this.saveHighlightAsNote();
        break;
      case 'remove':
        this.removeHighlight();
        break;
    }
  }

  shareHighlight() {
    const { text } = this.currentSelection;
    const url = window.location.href;
    const title = document.title;
    
    const shareText = `"${text}"\n\n— From "${title}"\n${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Quote from ${title}`,
        text: shareText,
        url: url
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        this.showNotification('Quote copied to clipboard!', 'success');
      }).catch(() => {
        this.showNotification('Could not copy quote', 'error');
      });
    }
    
    this.hideHighlightUI();
  }

  saveHighlightAsNote() {
    const { text } = this.currentSelection;
    const note = prompt('Add a personal note to this highlight:', '');
    
    if (note !== null) {
      this.createHighlight('insight');
      
      // Add note to the highlight
      const highlights = this.getStoredHighlights();
      const latestHighlight = Array.from(highlights.values()).pop();
      if (latestHighlight) {
        latestHighlight.note = note;
        this.saveHighlights();
      }
    }
  }

  removeHighlight() {
    const { text } = this.currentSelection;
    const existingHighlight = this.findExistingHighlight(text);
    
    if (existingHighlight) {
      const highlightElement = document.querySelector(`[data-highlight-id="${existingHighlight.id}"]`);
      if (highlightElement) {
        // Replace highlight with plain text
        highlightElement.outerHTML = highlightElement.innerHTML;
      }
      
      // Remove from storage
      this.highlights.delete(existingHighlight.id);
      this.saveHighlights();
      
      this.showNotification('Highlight removed', 'info');
    }
    
    this.hideHighlightUI();
  }

  // Storage and Persistence
  saveHighlights() {
    const highlightsData = {};
    this.highlights.forEach((value, key) => {
      highlightsData[key] = value;
    });
    
    try {
      localStorage.setItem('philosophicalHighlights', JSON.stringify(highlightsData));
    } catch (error) {
      console.warn('Could not save highlights:', error);
    }
  }

  loadSavedHighlights() {
    try {
      const saved = localStorage.getItem('philosophicalHighlights');
      if (saved) {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([key, value]) => {
          this.highlights.set(key, value);
        });
      }
    } catch (error) {
      console.warn('Could not load saved highlights:', error);
    }
  }

  restoreHighlights() {
    // Restore highlights for current page
    const currentUrl = window.location.pathname;
    const pageHighlights = Array.from(this.highlights.values())
      .filter(h => h.url === currentUrl);
    
    pageHighlights.forEach(highlight => {
      this.restoreSingleHighlight(highlight);
    });
  }

  restoreSingleHighlight(highlight) {
    const postContent = document.querySelector('.post-content, .page-content');
    if (!postContent) return;
    
    // Find and highlight the text
    const walker = document.createTreeWalker(
      postContent,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      const nodeText = node.textContent;
      const index = nodeText.indexOf(highlight.text);
      
      if (index !== -1) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + highlight.text.length);
        
        const highlightElement = document.createElement('span');
        highlightElement.className = `user-highlight highlight-${highlight.type} restored`;
        highlightElement.setAttribute('data-highlight-id', highlight.id);
        highlightElement.setAttribute('data-highlight-type', highlight.type);
        highlightElement.setAttribute('title', `${this.getTypeDisplayName(highlight.type)} - Click to manage`);
        
        try {
          range.surroundContents(highlightElement);
          
          highlightElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showHighlightDetails(highlight.id);
          });
          
          break;
        } catch (error) {
          continue;
        }
      }
    }
  }

  // Utility Functions
  generateHighlightId(text, range) {
    const timestamp = Date.now();
    const textHash = this.simpleHash(text);
    return `highlight_${textHash}_${timestamp}`;
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  getContextAroundText(range, contextLength) {
    const container = range.commonAncestorContainer;
    const fullText = container.textContent || '';
    const selectedText = range.toString();
    
    const startIndex = fullText.indexOf(selectedText);
    if (startIndex === -1) return selectedText;
    
    const contextStart = Math.max(0, startIndex - contextLength);
    const contextEnd = Math.min(fullText.length, startIndex + selectedText.length + contextLength);
    
    return fullText.substring(contextStart, contextEnd);
  }

  findExistingHighlight(text) {
    return Array.from(this.highlights.values()).find(h => h.text === text);
  }

  getTypeDisplayName(type) {
    const names = {
      wisdom: 'Philosophical Wisdom',
      insight: 'Personal Insight',
      beautiful: 'Beautiful Passage'
    };
    return names[type] || type;
  }

  // Special Effects
  triggerBeautifulEffect(element) {
    element.style.animation = 'beautiful-highlight-glow 3s ease-in-out';
    
    // Intensify background temporarily
    if (window.intensifyBackground) {
      window.intensifyBackground(3000);
    }
    
    setTimeout(() => {
      element.style.animation = '';
    }, 3000);
  }

  // Keyboard Shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault();
            if (window.getSelection().toString().trim()) {
              this.createHighlight('wisdom');
            }
            break;
          case 'b':
            e.preventDefault();
            if (window.getSelection().toString().trim()) {
              this.createHighlight('beautiful');
            }
            break;
        }
      }
    });
  }

  // Notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `highlight-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  showHighlightDetails(highlightId) {
    const highlight = this.highlights.get(highlightId);
    if (!highlight) return;
    
    // Create or update details popup
    // This would show highlight metadata, notes, etc.
    console.log('Highlight details:', highlight);
  }

  // Public API
  getStoredHighlights() {
    return this.highlights;
  }

  exportHighlights() {
    const highlights = Array.from(this.highlights.values());
    const exportData = {
      exported: new Date().toISOString(),
      highlights: highlights
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `philosophical-highlights-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on content pages
  if (document.querySelector('.post-content, .page-content')) {
    window.interactiveQuoting = new InteractiveQuoteHighlighting();
    
    // Make export function available globally
    window.exportHighlights = () => {
      if (window.interactiveQuoting) {
        window.interactiveQuoting.exportHighlights();
      }
    };
  }
});