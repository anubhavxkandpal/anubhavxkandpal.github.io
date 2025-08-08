document.addEventListener('DOMContentLoaded', function() {
  // Function to create responsive video embeds
  function setupVideoEmbeds() {
    // Find all iframes with a src containing common video platforms
    const videoIframes = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="dailymotion"]');
    
    // Wrap each video iframe in a responsive container
    videoIframes.forEach(iframe => {
      // Skip if already wrapped
      if (iframe.parentNode.className.includes('video-container')) return;
      
      // Create container
      const container = document.createElement('div');
      container.className = 'video-container';
      
      // Replace iframe with wrapped version
      iframe.parentNode.insertBefore(container, iframe);
      container.appendChild(iframe);
    });
  }
  
  // Run on page load
  setupVideoEmbeds();
});
