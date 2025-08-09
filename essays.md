---
layout: page
title: Essays
permalink: /essays/
---

<div class="essays-intro">
  <p>Here dwell explorations of philosophical themes through extended meditation. Each essay represents a journey into questions that resist easy answers, inviting readers to pause and contemplate alongside the text.</p>
</div>

<div class="essays-list">
  {% assign essays = site.posts | where: "categories", "essays" %}
  {% for essay in essays %}
    <article class="essay-item">
      <h3 class="essay-title">
        <a href="{{ essay.url | relative_url }}">{{ essay.title | escape }}</a>
      </h3>
      <div class="essay-meta">
        <time datetime="{{ essay.date | date_to_xmlschema }}">
          {{ essay.date | date: site.date_format }}
        </time>
        {% if essay.reading_time %}
          <span class="reading-time">• {{ essay.reading_time }} read</span>
        {% endif %}
      </div>
      <div class="essay-excerpt">
        {{ essay.excerpt | strip_html | truncatewords: 50 }}
      </div>
    </article>
  {% endfor %}
</div>

<style>
  .essays-intro {
    margin: 2em 0 3em;
    font-size: 1.1em;
    line-height: 1.8;
    font-style: italic;
    text-align: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .essay-item {
    margin-bottom: 3em;
    padding-bottom: 2em;
    border-bottom: 1px solid #eee;
  }
  
  .essay-item:last-child {
    border-bottom: none;
  }
  
  .essay-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6em;
    margin-bottom: 0.5em;
  }
  
  .essay-title a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .essay-title a:hover {
    color: #555;
  }
  
  .essay-meta {
    color: #888;
    font-size: 0.9em;
    margin-bottom: 1em;
  }
  
  .reading-time {
    margin-left: 0.5em;
  }
  
  .essay-excerpt {
    line-height: 1.7;
  }
</style>