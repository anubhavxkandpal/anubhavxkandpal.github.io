# Heart of Reason - Codebase Structure

## Root Directory Structure
```
heartofreason/
├── _config.yml           # Jekyll configuration
├── _includes/            # Reusable template components
├── _layouts/             # Page templates
├── _plugins/             # Custom Jekyll plugins
├── _posts/               # Content (essays, poetry)
├── _sass/                # SCSS stylesheets
├── _site/                # Generated site (ignored in git)
├── assets/               # Static assets (CSS, JS, images)
├── vendor/               # Bundled gems
├── Gemfile               # Ruby dependencies
├── CLAUDE.md             # Development log and documentation
└── README.md             # Project documentation
```

## Key Directories Explained

### `_includes/` - Reusable Components
- `contact-form.html`: Contact form markup
- `footer.html`: Site footer
- `head.html`: HTML head section with meta tags
- `header.html`: Site header and navigation
- `newsletter-signup.html`: Newsletter subscription form
- `pull-quote.html`: Styled quote component for essays

### `_layouts/` - Page Templates
- `default.html`: Base template for all pages
- `post.html`: Template for individual blog posts
- `page.html`: Template for static pages
- `category.html`: Template for category listing pages

### `_plugins/` - Custom Functionality
- `reading_time.rb`: Calculates reading time based on word count
- `image_extractor.rb`: Extracts featured images from post content

### `_posts/` - Content Organization
```
_posts/
├── essays/               # Philosophical essays
│   ├── 2025-08-09-the-dissatisfied-generation.md
│   ├── 2025-08-10-from-self-concern-to-selfless-activity.md
│   └── ... (30+ essay files)
├── poetry/               # Poems and meditative verse
│   └── 2025-08-09-river-meditation.md
└── 2025-08-08-welcome.md # General posts
```

### `_sass/` - Styling
- `main.scss`: Primary stylesheet with typography and layout
- `typography.scss`: Typography-specific styles

### `assets/` - Static Resources
```
assets/
├── css/
│   └── styles.scss       # Main SCSS entry point
├── js/
│   └── video-embed.js    # Video embedding functionality
└── images/
    └── posts/            # Post-specific images
```

## Content Categories Structure
The site organizes content into thematic categories:

1. **Beauty & Reflection**: Aesthetic philosophy, travel, nature
2. **Society**: Social commentary and cultural criticism
3. **Consciousness**: Self-awareness and mindfulness
4. **Ethics**: Moral philosophy

## Generated Site Structure (`_site/`)
- Mirrors source structure but with compiled HTML
- Contains processed CSS and JavaScript
- Organized by permalink structure: `/YYYY/MM/DD/title/`
- Category pages: `/categories/category-name/`
- Archive and index pages

## Configuration Files
- `_config.yml`: Main Jekyll configuration
- `Gemfile`: Ruby gem dependencies
- `Gemfile.lock`: Locked dependency versions
- `.serena/project.yml`: Serena configuration (if using Serena)

## Utility Scripts
- `fix_yaml_conversions.rb`: Fixes YAML front matter formatting issues
- `convert_quotes.rb`: Converts quote formatting
- `image_sync.py`: Python script for image synchronization

## Important Notes
- **No build tools**: Pure Jekyll without additional build pipeline
- **No testing framework**: Manual testing and Jekyll doctor validation
- **GitHub Pages compatible**: All plugins and configuration work with GitHub Pages
- **Responsive design**: Mobile-first approach in CSS