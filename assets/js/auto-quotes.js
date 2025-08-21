// Auto-style quotes with attribution
document.addEventListener('DOMContentLoaded', function() {
  // Find all paragraphs in post content
  const postContent = document.querySelector('.post-content, .page-content');
  if (!postContent) return;
  
  const paragraphs = postContent.querySelectorAll('p');
  
  paragraphs.forEach(function(p) {
    const text = p.textContent.trim();
    
    // Check if paragraph matches quote pattern: starts with quote, ends with attribution
    const quotePattern = /^"(.+?)"[\s]*[–—-][\s]*(.+)$/;
    const match = text.match(quotePattern);
    
    if (match) {
      // Add auto-quote class for styling
      p.classList.add('auto-quote');
      
      // Optional: wrap attribution in cite tag for semantic markup
      const quote = match[1];
      const author = match[2];
      p.innerHTML = `"${quote}" <cite>— ${author}</cite>`;
    }
  });
});