# Heart of Reason - Code Style & Conventions

## File Structure Conventions

### Post Naming
- **Essays**: `_posts/essays/YYYY-MM-DD-title-with-hyphens.md`
- **Poetry**: `_posts/poetry/YYYY-MM-DD-title-with-hyphens.md`
- **Welcome posts**: `_posts/YYYY-MM-DD-title.md`

### YAML Front Matter Structure
```yaml
---
layout: post
title: "Title in Title Case"
date: YYYY-MM-DD
categories: [essays, category1, category2]  # Multiple categories allowed
reading_time: "X minutes"
excerpt: "Brief excerpt of the post content"
featured_image: "/path/to/image" # Optional, auto-extracted if not provided
---
```

### Category System
- **Base categories**: `essays`, `poetry`
- **Thematic categories**: `beauty`, `society`, `consciousness`, `ethics`
- **Format**: Array notation `[essays, society, consciousness]`

## SCSS/CSS Conventions

### File Organization
- `_sass/main.scss`: Primary styles
- `_sass/typography.scss`: Typography-specific styles
- `assets/css/styles.scss`: Main entry point

### Style Patterns
- **Font stack**: Serif fonts prioritized for readability
- **Base font size**: 18px for philosophical content
- **Line height**: 1.65 for comfortable reading
- **Color scheme**: Subtle with #333 text on #fafafa background
- **Spacing**: Generous margins for contemplative reading

### CSS Class Naming
- **BEM-like approach**: `.post-header`, `.post-meta`, `.site-header`
- **Semantic naming**: `.reading-time`, `.categories`, `.excerpt`

## Ruby Code Conventions

### Plugin Structure
```ruby
module Jekyll
  module PluginName
    def method_name(input)
      # Implementation
    end
  end
end

Liquid::Template.register_filter(Jekyll::PluginName)
```

### Variable Naming
- **Snake_case**: For Ruby variables and methods
- **Descriptive names**: `words_per_minute`, `image_match`, `post_featured_image`

## Liquid Template Conventions

### Template Variables
- Use `assign` for clarity: `{% assign hero_image = page | post_featured_image %}`
- Semantic naming: `hero_image`, `category_image`, `reading_minutes`

### Conditional Logic
```liquid
{% if condition %}
  <!-- content -->
{% endif %}
```

### Filters Usage
- Custom filters: `{{ content | reading_time }}`, `{{ post | post_featured_image }}`
- Built-in filters: `{{ page.date | date: site.date_format }}`

## Content Writing Conventions

### Markdown Style
- **Headers**: Use `#` for H1, `##` for H2, etc.
- **Emphasis**: *italics* for emphasis, **bold** for strong emphasis
- **Quotes**: Use `> ` for blockquotes
- **Images**: `![alt text](image-url)` format

### Philosophical Content Guidelines
- **Reading-friendly**: Assume 200 words per minute reading speed
- **Structured**: Use headers to organize long essays
- **Contemplative**: Allow for white space and breathing room in text