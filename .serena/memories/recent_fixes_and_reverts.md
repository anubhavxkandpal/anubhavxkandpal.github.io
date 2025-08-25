# Recent Fixes and Reverts - Heart of Reason Website

## Issues Encountered
- **Dark overlays** appeared on all cards after implementing seasonal/time awareness
- **Contextual backgrounds** not appearing properly
- **Archive page images** still not filling left column properly despite previous fixes
- **Interactive quote highlighting** potentially causing conflicts

## Actions Taken (December 2024)

### ✅ Reverted Problematic Features
1. **Seasonal Time Awareness Script Removed**
   - File: `/assets/js/seasonal-time-awareness.js` 
   - Removed from `_layouts/default.html`
   - This was causing dark overlays on cards due to complex filter/opacity rules

2. **Interactive Quote Highlighting Temporarily Disabled**
   - Commented out in `_layouts/post.html`
   - `<!-- Temporarily disabled: <script src="{{ "/assets/js/interactive-quote-highlighting.js" | relative_url }}"></script> -->`
   - Can be re-enabled later after testing

3. **Contextual Backgrounds Simplified**
   - Removed complex logic from `/assets/js/contextual-backgrounds.js`
   - Kept basic category detection but simplified application
   - Added console.log for debugging

### ✅ Created Safe Alternatives

4. **Simple Lotus Seasonal Script**
   - New file: `/assets/js/simple-lotus-seasonal.js`
   - Only modifies existing lotus watermark with seasonal variations
   - Safe, minimal changes: scale, opacity, filter adjustments
   - Spring/Summer/Autumn/Winter configurations
   - Added to `_layouts/default.html`

### ✅ UI Improvements Completed

5. **Archive Page Improvements**
   - **Removed "Essays" labels** from archive cards (redundant)
   - **Increased image width** from 280px to 320px 
   - **Better proportions** between image and content sections
   - File modified: `archive.md` and `_sass/main.scss`

6. **Bookmark Tooltip Added**
   - Hover tooltip on bookmark button: "Save your reading position"
   - Changes to "Position saved!" on click
   - CSS styling with arrow pointer
   - Files: `/assets/js/floating-elements.js` and `_sass/main.scss`

## Current Active Features
✅ **Floating Elements** (TOC, Navigator, Reading Companion)
✅ **Bevelled Header Image**  
✅ **Simple Lotus Seasonal Variations** (safe minimal changes)
✅ **Contextual Backgrounds** (simplified version)
✅ **Archive Page** (clean, properly proportioned)
✅ **Bookmark Tooltip** (user-friendly)

## Temporarily Disabled
🚫 **Seasonal Time Awareness** (complex time-based color shifts)
🚫 **Interactive Quote Highlighting** (user text selection/highlighting)

## Files Modified in This Session
- `_layouts/default.html` - Script includes
- `_layouts/post.html` - Disabled quote highlighting  
- `assets/js/contextual-backgrounds.js` - Simplified
- `assets/js/simple-lotus-seasonal.js` - Created
- `assets/js/floating-elements.js` - Added tooltip
- `_sass/main.scss` - Archive improvements, tooltip styles
- `archive.md` - Removed Essays labels

## Next Steps
- Test site functionality without dark overlays
- If all works well, can gradually re-enable features
- Interactive quote highlighting can be re-enabled after testing
- Consider simpler time awareness implementation if desired

## Performance Notes
- Reduced JavaScript complexity significantly
- Minimal CSS changes to maintain performance
- All remaining features are lightweight and non-blocking