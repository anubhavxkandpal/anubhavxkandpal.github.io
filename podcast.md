---
layout: page
title: Podcast
permalink: /podcast/
---

<div class="podcast-page">
  <header class="podcast-header">
    <h1>Heart of Reason Podcast</h1>
    <p class="podcast-description">Philosophical conversations and meditative reflections on consciousness, ethics, beauty, and society.</p>
    
    <div class="podcast-player-main">
      <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/show/5erW3vFyvkRrPEh9elZuzA?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
    
    <div class="podcast-subscribe">
      <p class="subscribe-text">Subscribe and listen on:</p>
      <div class="subscribe-links">
        <a href="https://open.spotify.com/show/5erW3vFyvkRrPEh9elZuzA" target="_blank" rel="noopener" class="subscribe-button spotify">Spotify</a>
        <a href="https://anchor.fm/s/f78b6bfc/podcast/rss" target="_blank" rel="noopener" class="subscribe-button rss">RSS Feed</a>
        <!-- Add more platform links as needed -->
      </div>
    </div>
  </header>
  
  <div class="podcast-episodes">
    <h2>Latest Episodes</h2>
    <div class="episodes-list">
      {% assign podcast_posts = site.categories.podcast | sort: 'date' | reverse %}
      {% for episode in podcast_posts %}
      <article class="episode-card">
        {% if episode.episode_number %}
        <div class="episode-number">Episode {{ episode.episode_number }}</div>
        {% endif %}
        
        <div class="episode-content">
          <h3 class="episode-title">
            <a href="{{ episode.url | relative_url }}">{{ episode.title }}</a>
          </h3>
          
          {% if episode.guest %}
          <div class="episode-guest">Guest: {{ episode.guest }}</div>
          {% endif %}
          
          <div class="episode-description">
            {{ episode.excerpt | strip_html | truncatewords: 50 }}
          </div>
          
          <div class="episode-meta">
            <time datetime="{{ episode.date | date_to_xmlschema }}">
              {{ episode.date | date: "%B %d, %Y" }}
            </time>
            {% if episode.duration %}
            <span class="episode-duration">{{ episode.duration }}</span>
            {% endif %}
          </div>
          
          {% if episode.spotify_embed %}
          <div class="episode-player-preview">
            {{ episode.spotify_embed }}
          </div>
          {% endif %}
          
          <div class="episode-actions">
            <a href="{{ episode.url | relative_url }}" class="listen-button">Listen to Full Episode</a>
            {% if episode.has_transcript %}
            <a href="{{ episode.url | relative_url }}#transcript" class="transcript-link">Read Transcript</a>
            {% endif %}
          </div>
        </div>
      </article>
      {% endfor %}
      
      {% if podcast_posts.size == 0 %}
      <div class="no-episodes">
        <p>New episodes coming soon. Stay tuned!</p>
      </div>
      {% endif %}
    </div>
  </div>
  
  <div class="podcast-rss">
    <a href="/podcast/feed.xml" class="rss-link">
      <span>RSS Feed</span>
    </a>
  </div>
</div>
