# Immediate Fixes Needed - Heart of Reason Website

## Issues Identified (Latest Session)

### 1. Archive Page Image Layout Issue
**Problem**: Images still only filling top 1/3rd of archive cards despite increasing column width from 280px to 320px
**Status**: ❌ Not resolved
**Location**: Archive page (`/archive/`) - horizontal layout cards
**Notes**: Width increase didn't solve the height/vertical filling issue

### 2. Dark Overlay on Ethics Category Page
**Problem**: Dark overlay still present specifically on the Ethics category page only
**Status**: ❌ Not resolved  
**Location**: `/categories/ethics/` page
**Notes**: Other category pages are clean, issue isolated to Ethics page only
**Possible cause**: Category-specific CSS or contextual background issue

### 3. Table of Contents Font Styling
**Problem**: "Contents" title font looks like Times New Roman, doesn't match site theme
**Status**: ❌ Needs styling update
**Location**: Floating TOC element in essay pages
**Current font**: Appears to be default serif (Times New Roman-like)
**Needed**: Should match site's 'Playfair Display' theme font
**File**: `/assets/js/floating-elements.js` and related CSS in `_sass/main.scss`

## Priority Order
1. **Fix archive card image vertical filling** (layout/UX issue)
2. **Remove dark overlay from Ethics page** (visual bug, page-specific)  
3. **Update TOC "Contents" font** (typography consistency)

## Technical Notes
- Archive images need to fill full height of card, not just width
- Ethics page overlay suggests category-specific CSS conflict
- TOC title should use 'Playfair Display' to match site typography
- All other floating elements and recent fixes are working well

## Files Likely Needing Updates
- `_sass/main.scss` - Archive card image styling, TOC typography
- `/assets/js/contextual-backgrounds.js` - Ethics category background conflict
- Possibly ethics category page template or CSS

## Context
User session ending, these are the remaining issues to address in next activation.