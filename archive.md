---
layout: page
title: Archive
permalink: /archive/
---

<div class="archive-page">
  <header class="archive-header">
    <h1>All Essays</h1>
    <p class="archive-description">A chronological journey through philosophical inquiry</p>
  </header>
  
  <div class="archive-posts">
    <section class="recent-reflections">
      <div class="articles-grid archive-grid">
        {% for post in site.posts %}
        <article class="article-card archive-card">
          {% assign archive_image = post | post_featured_image %}
          {% if archive_image %}
          <div class="article-image">
            <img src="{{ archive_image }}" alt="{{ post.title }}">
          </div>
          {% endif %}
          <div class="article-content">
            <h3 class="article-title">
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </h3>
            <p class="article-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            <div class="article-meta">
              <time datetime="{{ post.date | date_to_xmlschema }}">
                {{ post.date | date: "%B %d, %Y" }}
              </time>
              {% if post.reading_time %}
              <span class="reading-time">{{ post.reading_time }} read</span>
              {% endif %}
            </div>
          </div>
        </article>
        {% endfor %}
      </div>
    </section>
  </div>
</div>
