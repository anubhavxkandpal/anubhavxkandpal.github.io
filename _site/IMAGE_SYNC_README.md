# Image Sync Tool for Substack to GitHub

This tool helps you add images to your GitHub markdown posts based on your Substack posts.

## Installation

Make the script executable:
```bash
chmod +x image_sync.py
```

## Usage

### 1. Create a mapping template
```bash
python image_sync.py create-mapping post-name
```
This creates a `post-name_images.json` file with a template.

### 2. Edit the mapping file
Edit the JSON file to add your images:
```json
{
  "post_name": "your-post",
  "images": [
    {
      "name": "Descriptive image name",
      "url": "https://example.com/image.jpg",
      "caption": "Photo by Author on Source",
      "insert_after": "Text after which to insert the image"
    }
  ]
}
```

**Important fields:**
- `name`: A descriptive name for the image
- `url`: Direct URL to the image (Unsplash, Pexels, etc.)
- `caption`: Optional caption text
- `insert_after`: Exact text after which the image should be inserted

### 3. Add images to your post
```bash
python image_sync.py add path/to/post.md mapping-file.json
```
This creates a new file `post_with_images.md` with all images inserted.

### 4. View a mapping file
```bash
python image_sync.py show mapping-file.json
```

## Tips

1. **Finding insertion points**: Use unique phrases from your post for `insert_after`
2. **Image sources**: 
   - Unsplash: Use the direct image URL
   - Pexels: Right-click image → Copy image address
   - Substack: Use the full URL from the image
3. **Multiple images**: Add them to the array in order of appearance

## Example Workflow

1. Write your post without images
2. Create mapping: `python image_sync.py create-mapping my-essay`
3. Edit `my-essay_images.json` with your image URLs
4. Run: `python image_sync.py add _posts/my-essay.md my-essay_images.json`
5. Review `_posts/my-essay_with_images.md`
6. Rename to replace original if satisfied

## Automating from Substack

To match images from Substack:
1. View page source of your Substack post
2. Find image URLs and their positions
3. Add to your mapping file with matching text from your GitHub post
