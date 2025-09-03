# Jekyll Syntax Fixes - August 2025

## Issues Resolved

### 1. Jekyll Include Tag Syntax Errors
**Problem**: Multiple essays had invalid Jekyll include tag syntax causing build failures with error:
```
Invalid syntax for include tag: quote="..." author="..." 
Valid syntax: {% include file.ext param='value' param2='value' %}
```

**Root Causes**:
- **Curly quotes (Unicode quotes)** instead of straight quotes in include parameters
- **Nested quotes** - double quotes inside quote parameters that were already wrapped in double quotes
- **Multiline include tags** - include tags spanning multiple lines breaking parameter parsing

### 2. Destructive Regex Replacements
**Problem**: Initial fix attempts using broad regex patterns like `{% include pull-quote\.html quote.*Carl Jung.*%}` accidentally deleted large portions of essay content.

**Solution**: Used git checkout to restore full content from previous commits, then applied surgical fixes.

### 3. Image URL Issues  
**Problem**: Images using broken substackcdn URLs instead of direct Unsplash URLs.

**Solution**: Scraped original Substack post to get correct image URLs and updated with proper images and credits.

## Files Fixed

### Discipline Essay (`2025-08-27-discipline-and-chaos.md`)
- Fixed Carl Jung quote with curly quotes
- Fixed Plutarch quote with curly quotes  
- Updated 3 images with correct Unsplash URLs from original Substack post
- Updated alt text and photo credits

### Nature Essay (`2025-08-29-nature-and-our-connection-to-all-of-life.md`)
- Fixed Rachel Carson quote with nested quotes issue by switching outer quotes to single quotes:
  - Before: `quote="One way to open your eyes is to ask yourself, "What if I had never seen this before?"`
  - After: `quote='One way to open your eyes is to ask yourself, "What if I had never seen this before?"'`

### Money Essay (`2025-08-28-money-greed-and-the-human-pursuit-of-survival.md`)
- Fixed multiline Timothy and Ayn Rand quotes

## Key Lessons Learned

1. **Always check for fancy/curly quotes** (`"` `"`) vs straight quotes (`"`) when dealing with Jekyll syntax errors
2. **Use surgical regex patterns** - avoid broad wildcards that can match more than intended
3. **Test regex replacements carefully** - if 2 attempts fail, ask user to handle manually
4. **Restore from git history** when destructive changes occur
5. **Scrape original sources** for correct image URLs rather than guessing

## Current Status
✅ All Jekyll include tag syntax issues resolved
✅ All essays building successfully 
✅ Images loading properly with correct URLs
✅ No more "Invalid syntax for include tag" errors

## Commands Used for Fixes
```bash
git checkout c1706c6 -- [essay files]  # Restore content
# Apply targeted fixes
git add [files]
git commit -m "Fix Jekyll include tag syntax errors"  
git push
```