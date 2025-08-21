# Heart of Reason - Task Completion Workflow

## Standard Workflow When Task is Complete

### 1. Build & Test Locally
```bash
# Clean previous build
bundle exec jekyll clean

# Build the site
bundle exec jekyll build

# Serve locally to test
bundle exec jekyll serve
# Test at http://localhost:4000
```

### 2. Content Validation
- **Check post formatting**: Verify YAML front matter is correct
- **Test responsive design**: Check mobile and desktop layouts
- **Verify images**: Ensure image extraction works for category pages
- **Reading time**: Confirm reading time calculation displays correctly
- **Categories**: Check that posts appear in correct category pages

### 3. Jekyll-Specific Checks
```bash
# Run Jekyll doctor to check for issues
bundle exec jekyll doctor

# Check for any plugin errors in build output
# Look for warnings about missing images or broken references
```

### 4. No Formal Linting/Testing
**Note**: This project does not have formal linting, testing, or formatting commands configured. The validation is primarily:
- Visual inspection of the built site
- Jekyll's built-in validation (`jekyll doctor`)
- Manual testing of functionality

### 5. Git Workflow (if changes are ready)
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Descriptive message about changes"

# Push to GitHub (triggers GitHub Pages deployment)
git push origin main
```

### 6. GitHub Pages Deployment
- **Automatic**: Pushes to `main` branch trigger GitHub Pages rebuild
- **Check deployment**: Visit live site to confirm changes are live
- **Monitor**: Check GitHub Actions/Pages section for any deployment issues

## Content-Specific Tasks

### Adding New Essays
1. Create file in `_posts/essays/` with proper naming convention
2. Add complete YAML front matter with categories
3. Write content with markdown formatting
4. Test locally with `bundle exec jekyll serve`
5. Check that post appears in correct category pages
6. Verify image extraction works if images are included

### Adding New Poetry
1. Create file in `_posts/poetry/` 
2. Use appropriate categories (poetry + thematic category)
3. Test formatting and layout

### Modifying Styles
1. Edit SCSS files in `_sass/`
2. Test changes locally
3. Check responsive design
4. Verify typography remains readable

### Plugin Modifications
1. Edit Ruby files in `_plugins/`
2. Restart Jekyll server to load changes
3. Test plugin functionality thoroughly
4. Check for any error messages in build output

## Emergency Procedures

### If Site Breaks
1. **Revert last changes**: `git revert HEAD`
2. **Check Jekyll doctor**: `bundle exec jekyll doctor`
3. **Review error messages**: Look at build output for specific issues
4. **Test locally**: Always test before pushing to main

### If Dependencies Break
1. **Check Gemfile.lock**: Look for version conflicts
2. **Try bundle update**: Update gems to compatible versions
3. **Rollback if needed**: Use `git checkout` to restore working Gemfile.lock