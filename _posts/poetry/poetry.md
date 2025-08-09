---
layout: page
title: Poetry
permalink: /poetry/
---

<div class="poetry-intro">
  <p>Words arranged not merely for meaning, but for the spaces between—where silence speaks and breath becomes meditation.</p>
</div>

<div class="poetry-collection">
  {% assign poems = site.posts | where: "categories", "poetry" %}
  {% for poem in poems %}
    <article class="poem-item">
      <h3 class="poem-title">
        <a href="{{ poem.url | relative_url }}">{{ poem.title | escape }}</a>
      </h3>
      <div class="poem-meta">
        <time datetime="{{ poem.date | date_to_xmlschema }}">
          {{ poem.date | date: site.date_format }}
        </time>
      </div>
      {% if poem.excerpt_poem %}
        <div class="poem-preview">
          {{ poem.excerpt_poem }}
        </div>
      {% endif %}
    </article>
  {% endfor %}
</div>

<style>
  .poetry-intro {
    margin: 2em 0 4em;
    text-align: center;
    font-style: italic;
    font-family: 'Playfair Display', serif;
    font-size: 1.2em;
    line-height: 1.8;
    color: #555;
  }
  
  .poem-item {
    margin-bottom: 3em;
    text-align: center;
    padding-bottom: 2em;
    border-bottom: 1px dotted #ddd;
  }
  
  .poem-item:last-child {
    border-bottom: none;
  }
  
  .poem-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5em;
    margin-bottom: 0.3em;
  }
  
  .poem-title a {
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .poem-title a:hover {
    color: #666;
    letter-spacing: 0.5px;
  }
  
  .poem-meta {
    color: #999;
    font-size: 0.85em;
    margin-bottom: 1.5em;
  }
  
  .poem-preview {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    line-height: 1.8;
    color: #666;
    max-width: 500px;
    margin: 0 auto;
  }
</style>