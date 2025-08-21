---
layout: default
---

<div class="home">
  <div class="intro">
    <h2>Philosophical Inquiry Through Meditative Prose</h2>
    <p>Welcome to Heart of Reason, a space dedicated to exploring philosophical ideas through thoughtful, flowing prose that invites contemplation rather than mere consumption.</p>
  </div>

  <div class="recent-posts">
    <h3>Recent Reflections</h3>

    <div class="post-list">
      {% for post in site.posts %}
        <article class="post-item">
          <h4 class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          </h4>
          <div class="post-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: site.date_format }}
            </time>
          </div>
          <div class="post-excerpt">
            {{ post.excerpt }}
            <a href="{{ post.url | relative_url }}" class="read-more">Continue reading →</a>
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</div>

<style>
  .intro {
    margin: 3em 0 4em;
    text-align: center;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .intro h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8em;
    margin-bottom: 0.8em;
  }
  
  .intro p {
    font-size: 1.2em;
    color: #555;
    line-height: 1.7;
  }
  
  .recent-posts h3 {
    font-family: 'Playfair Display', serif;
    margin-bottom: 1.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #eee;
  }
  
  .post-item {
    margin-bottom: 3em;
  }
  
  .post-title {
    font-family: 'Playfair Display', serif;
    margin-bottom: 0.3em;
  }
  
  .post-title a {
    color: #333;
    text-decoration: none;
  }
  
  .post-meta {
    color: #888;
    margin-bottom: 1em;
    font-size: 0.9em;
  }
  
  .post-excerpt {
    margin-top: 0.8em;
  }
  
  .read-more {
    display: inline-block;
    margin-top: 0.5em;
    font-style: italic;
  }
</style>
