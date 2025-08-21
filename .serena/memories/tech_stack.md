# Heart of Reason - Tech Stack

## Core Technology
- **Jekyll 4.3.4**: Static site generator
- **Ruby 3.2.0**: Programming language
- **SCSS/Sass**: CSS preprocessing
- **Liquid**: Templating engine
- **kramdown**: Markdown processor

## Jekyll Plugins
- `jekyll-feed`: RSS feed generation
- `jekyll-seo-tag`: SEO meta tags
- Custom plugins in `_plugins/`:
  - `reading_time.rb`: Calculates reading time for posts
  - `image_extractor.rb`: Extracts first image from post content for category pages

## Theme & Styling
- **Base theme**: jekyll-theme-tufte (typography-focused)
- **Custom SCSS**: `_sass/main.scss`, `_sass/typography.scss`
- **Fonts**: 'Sina Nova W01 Regular', 'EB Garamond', 'Source Serif 4', Georgia (serif stack)
- **Design focus**: Clean typography for philosophical reading, subtle background patterns

## JavaScript
- `assets/js/video-embed.js`: Responsive video embedding functionality
- Auto-quote styling system (as documented in CLAUDE.md)

## Dependencies Management
- **Gemfile**: Defines Ruby gem dependencies
- **Bundler**: Dependency management for Ruby gems
- **vendor/**: Contains bundled gems

## Development Environment
- Platform: macOS (Darwin)
- Local development server: `bundle exec jekyll serve`
- Build output: `_site/` directory