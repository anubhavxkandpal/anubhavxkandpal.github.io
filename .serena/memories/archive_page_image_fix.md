# Archive Page Image Gap Fix

## Issue
White gap appearing at the bottom of images in the archive page article cards.

## Solution Implemented
Fixed the `.article-image` container styling in `_sass/main.scss` to eliminate white gaps:

1. **Fixed Height**: Set fixed `height: 200px` instead of `min-height` to ensure consistent dimensions
2. **Absolute Positioning**: Made images absolutely positioned within container to fill entire space
3. **Overflow Control**: Added `overflow: hidden` to parent card and `align-items: stretch` for equal height
4. **Border Radius**: Added proper border-radius (left side for desktop, top for mobile)
5. **Fallback Background**: Added subtle `#f8f8f8` background color for failed image loads

## Key CSS Changes
- Desktop: 280px × 200px fixed image container with left border-radius
- Mobile: Full width × 180px with top border-radius
- Image uses `object-fit: cover` with absolute positioning to fill container
- Parent card uses `align-items: stretch` to maintain consistent heights

## Files Modified
- `_sass/main.scss` - Archive page styling section (lines 828-880)

This ensures images completely fill their containers without gaps while maintaining aspect ratio.