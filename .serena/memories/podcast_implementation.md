# Podcast Feature Implementation

## Overview
Implemented a complete hybrid podcast system for the Heart of Reason website with both a main podcast listing page and individual episode pages, including RSS feed support. Successfully imported all 13 episodes from the existing Anchor/Spotify podcast.

## Files Created/Modified

### New Files Created:
1. **`/podcast.md`** - Main podcast listing page showing all episodes with Spotify show embed
2. **`/_layouts/podcast.html`** - Layout template for individual podcast episodes
3. **`/_posts/podcast/`** - Directory for podcast episode posts
4. **`/podcast/feed.xml`** - RSS feed for podcast distribution
5. **13 episode files** - All episodes from #1 to #13 imported from RSS feed

### Files Modified:
1. **`/_includes/header.html`** - Added Podcast link to main navigation
2. **`/_sass/main.scss`** - Added comprehensive podcast styling (lines 791-1320)

## Structure and Features

### Episode Front Matter Variables:
```yaml
layout: podcast
title: "Episode Title"
date: YYYY-MM-DD
categories: [podcast]
episode_number: 1
duration: "45 minutes"
guest: "Guest Name" (optional)
excerpt: "Episode description"
spotify_embed: 'iframe code'
spotify_link: "URL"
apple_podcasts_link: "URL" (optional)
youtube_link: "URL" (optional)
has_transcript: true/false
show_notes: true/false
transcript: "Full transcript text" (optional)
key_topics: [list of topics]
resources: [list of resources with title, author, link]
quotes: [notable quotes with text and speaker]
```

### Key Features:
1. **Main Podcast Page** (`/podcast/`)
   - Lists all episodes chronologically
   - Shows episode previews with Spotify embeds
   - Subscribe buttons for different platforms
   - RSS feed link

2. **Individual Episode Pages**
   - Full Spotify embed player
   - Show notes and episode description
   - Key topics discussed
   - Resources mentioned
   - Notable quotes section
   - Transcript section (ready for future transcripts)
   - Episode navigation (prev/next)
   - Subscribe buttons

3. **RSS Feed** (`/podcast/feed.xml`)
   - iTunes-compatible podcast RSS
   - Automatically updates with new episodes
   - Includes all episode metadata

### Styling Features:
- Responsive design for mobile/tablet
- Consistent with site's philosophical aesthetic
- Spotify brand colors for platform buttons
- Clean card-based layout for episode listings
- Transcript section with scrollable container
- Hover effects and smooth transitions

## How to Add New Episodes

1. Create a new file in `/_posts/podcast/` with naming format: `YYYY-MM-DD-episode-title.md`
2. Copy the front matter from the sample episode
3. Replace the Spotify embed code with actual embed from Spotify for Podcasters
4. Add episode content, show notes, and any additional metadata
5. Optionally add transcript in the `transcript` field or set `has_transcript: true` for future addition

## Future Enhancements Ready:
- Transcript integration (structure already in place)
- Multiple platform links (Apple Podcasts, YouTube)
- Guest information display
- Episode resources and references
- Notable quotes highlighting
- Automated episode numbering and duration tracking

## Episodes Imported:
1. Episode #1: Where it all started from (Feb 21, 2022)
2. Episode #2: Knowledge and the Separation (Feb 26, 2022)
3. Episode #3: Solitude and The Inner Voice (Mar 1, 2022)
4. Episode #4: Feeling Lost (Mar 4, 2022)
5. Episode #5: Helping Others (Oct 22, 2024)
6. Episode #6: Authentic Listening (Nov 10, 2024)
7. Episode #7: Our Two Selves (Nov 19, 2024)
8. Episode #8: Creativity (Dec 7, 2024)
9. Episode #9: Dancing with Your Devil (Jan 8, 2025)
10. Episode #10: The Rise of the Meritocracy (Mar 1, 2025)
11. Episode #11: The Hall of Mirrors (Apr 7, 2025)
12. Episode #12: Money and Greed (Apr 15, 2025)
13. Episode #13: Nature and Our Connection to All of Life (Apr 21, 2025)

## Podcast Details:
- **Show Spotify ID**: 5erW3vFyvkRrPEh9elZuzA
- **RSS Feed**: https://anchor.fm/s/f78b6bfc/podcast/rss
- **Main Show Embed**: Added to podcast page header

## Notes:
- RSS feed will work once site.url is properly configured in _config.yml
- Podcast cover image should be added at `/assets/images/podcast-cover.jpg` for RSS feed
- All Spotify embed codes extracted from episode IDs in RSS feed
- The feed.xml is iTunes-compatible for submission to Apple Podcasts
- Template files saved with .example extension for reference