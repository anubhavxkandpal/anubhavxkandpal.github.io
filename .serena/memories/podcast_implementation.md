# Podcast Feature Implementation

## Overview
Implemented a hybrid podcast system for the Heart of Reason website with both a main podcast listing page and individual episode pages, including RSS feed support.

## Files Created/Modified

### New Files Created:
1. **`/podcast.md`** - Main podcast listing page showing all episodes
2. **`/_layouts/podcast.html`** - Layout template for individual podcast episodes
3. **`/_posts/podcast/`** - Directory for podcast episode posts
4. **`/_posts/podcast/2025-08-24-philosophy-of-everyday-moments.md`** - Sample episode template
5. **`/podcast/feed.xml`** - RSS feed for podcast distribution

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

## Notes:
- RSS feed will work once site.url is properly configured in _config.yml
- Podcast cover image should be added at `/assets/images/podcast-cover.jpg` for RSS feed
- Spotify embed codes should be obtained from Spotify for Podcasters dashboard
- The feed.xml is iTunes-compatible for submission to Apple Podcasts