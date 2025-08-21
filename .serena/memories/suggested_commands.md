# Heart of Reason - Suggested Commands

## Essential Development Commands

### Local Development
```bash
# Start local development server
bundle exec jekyll serve

# Start development server with live reload and drafts
bundle exec jekyll serve --livereload --drafts

# Build the site (output to _site/)
bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

### Dependency Management
```bash
# Install project dependencies
bundle install

# Update gems to latest compatible versions
bundle update

# Check for outdated gems
bundle outdated
```

### Content Management
```bash
# Create a new post (manual - follow naming convention)
# Format: _posts/essays/YYYY-MM-DD-title-slug.md
# Format: _posts/poetry/YYYY-MM-DD-title-slug.md

# Run utility scripts
ruby fix_yaml_conversions.rb    # Fix YAML front matter issues
ruby convert_quotes.rb          # Convert quote formatting
```

### Git Operations
```bash
# Stage and commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub Pages (auto-deploys)
git push origin main
```

### File System Operations (macOS)
```bash
# List directory contents
ls -la

# Find files
find . -name "*.md" -type f

# Search content
grep -r "search term" _posts/

# Check file sizes
du -sh *
```

### Testing & Validation
```bash
# Check Jekyll configuration
bundle exec jekyll doctor

# Validate HTML (if htmlproofer installed)
bundle exec htmlproofer ./_site

# Check for broken links (manual verification needed)
```

## Site URLs
- **Local development**: http://localhost:4000
- **Live site**: https://anubhavxkandpal.github.io/heartofreason.github.io/ (assumed based on README)