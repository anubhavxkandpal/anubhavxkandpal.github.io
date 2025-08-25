# Podcast and Typography Updates - August 2025

## Podcast Episode Embed Fixes
**Problem**: Episode cards on podcast page had broken Spotify embeds using incomplete episode IDs
**Solution**: Updated all 13 episodes with correct full Spotify episode IDs

### Fixed Episode IDs:
- Episode 1: `3Yy4J1xgCazLE0cE7K0Avu` (was: `e2kq6io`)
- Episode 2: `4EbJ5K0s8n4tHpgPc373rr`
- Episode 3: `2u0jIj2ibc2qigDoEuIMi5`
- Episode 4: `05yFJ0iZnIYsBOlFkWLUQs`
- Episode 5: `59TfNMw9NUvr8E2mUbeeRw`
- Episode 6: `7mWPTrraXw5bf3un4N8Flk`
- Episode 7: `3QhKosqTKH28cWYhZysetI`
- Episode 8: `0pCIwOMbxT0Gue1cMoL6vr`
- Episode 9: `0stj0xxdy2VsfSqPGjP0Uu`
- Episode 10: `0BB2mEXIyKDpOLSwBfg83V`
- Episode 11: `0RetdWHP5KDfbJbJggYXGI`
- Episode 12: `6mKfT3CiUaxIj6qVauCYdK`
- Episode 13: `4atzzvqx9QpaqLPtA4gLJk` (was: `e319cgj`)

**Files Modified**: All 13 episode files in `_posts/podcast/` with updated `spotify_embed` and `spotify_link` fields

## RSS Feed Button Improvements
**Problem**: RSS feed button unclear - users thought XML display was a bug
**Solution**: 
- Updated button text to "RSS Feed (for podcast apps)"
- Added helper text: "Copy this link to add the podcast to your favorite podcast app"
- Added CSS styling for helper text

**Files Modified**:
- `/podcast.md` - Updated button text and added helper
- `/_sass/main.scss` - Added `.rss-help` styling

## Typography Consistency Fixes
**Problem**: Multiple headings falling back to Times New Roman instead of using consistent site fonts
**Issues Fixed**:
1. "Recent Reflections" heading showing bold + fallback font
2. "Explore by Theme" heading using poor fallback
3. Category card titles and descriptions using inconsistent fonts
4. "Latest Episodes" podcast heading inconsistency

**Solution Implemented**:
1. **Global heading styles**: Added universal h1-h6 font family declaration
2. **Improved font stacks**: Added Charter, Source Serif 4, Georgia as better fallbacks
3. **Specific fixes**: 
   - Recent Reflections: Added proper font stack + `font-weight: 400`
   - Category cards: Updated both h3 titles and p descriptions
   - All podcast headings: Consistent font stacks

**Files Modified**: `/_sass/main.scss`
- Line ~29: Added global `h1, h2, h3, h4, h5, h6` font family
- Line ~415: Fixed `.content-categories h2` font stack
- Line ~441: Fixed category card `h3` font stack
- Line ~452: Added category card `p` font family (Sina Nova)
- Line ~464: Fixed `.recent-reflections h2` font stack + weight
- Line ~886: Fixed podcast episodes `h2` font stack

## Final Typography Stack
- **Headings**: 'Playfair Display', 'Charter', 'Source Serif 4', 'Georgia', serif
- **Body Text**: 'Sina Nova W01 Regular', 'Sina Nova', 'EB Garamond', 'Source Serif 4', 'Georgia', serif
- **Navigation/Meta**: 'Source Sans Pro', 'Inter', sans-serif

## Result
- All Spotify embeds now work properly on podcast page
- RSS feed button is user-friendly and clearly explained
- Consistent, elegant typography throughout the site
- No more Times New Roman fallbacks