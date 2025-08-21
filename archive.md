---
layout: page
title: Archive
permalink: /archive/
---

<div class="archive-page">
  <header class="archive-header">
    <h1>All Essays</h1>
    <p>A chronological journey through philosophical inquiry</p>
  </header>
  
  {% for post in site.posts %}
    {% assign current_year = post.date | date: "%Y" %}
    {% assign previous_year = post.previous.date | date: "%Y" %}
    
    {% if current_year != previous_year %}
      <h2 class="archive-year">{{ current_year }}</h2>
    {% endif %}
    
    <div class="archive-item">
      <time class="archive-date">{{ post.date | date: "%B %d" }}</time>
      <h3 class="archive-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      {% if post.categories.size > 0 %}
      <span class="archive-category">{{ post.categories.first | capitalize }}</span>
      {% endif %}
    </div>
  {% endfor %}
</div>

<style>
  .archive-header {
    text-align: center;
    margin-bottom: 3em;
  }
  
  .archive-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5em;
    margin-bottom: 0.5em;
  }
  
  .archive-header p {
    font-size: 1.1em;
    color: #666;
  }
  
  .archive-year {
    font-family: 'Playfair Display', serif;
    font-size: 1.8em;
    margin: 2em 0 1em;
    padding-bottom: 0.3em;
    border-bottom: 2px solid #eee;
    color: #333;
  }
  
  .archive-item {
    display: flex;
    align-items: baseline;
    margin-bottom: 1.5em;
    padding: 1em 0;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .archive-date {
    min-width: 120px;
    font-size: 0.9em;
    color: #777;
    margin-right: 2em;
  }
  
  .archive-title {
    flex: 1;
    margin: 0;
    font-size: 1.1em;
  }
  
  .archive-title a {
    color: #333;
    text-decoration: none;
  }
  
  .archive-title a:hover {
    color: #555;
    text-decoration: underline;
  }
  
  .archive-category {
    font-size: 0.8em;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-left: 1em;
  }
  
  @media (max-width: 768px) {
    .archive-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .archive-date {
      min-width: auto;
      margin-right: 0;
      margin-bottom: 0.5em;
    }
    
    .archive-category {
      margin-left: 0;
      margin-top: 0.5em;
    }
  }
</style>
