module Jekyll
  module ImageExtractor
    def extract_first_image(content)
      # Match markdown image syntax: ![alt](url)
      image_match = content.match(/!\[.*?\]\((.*?)\)/)
      if image_match
        image_match[1]
      else
        # Match HTML img tags as backup
        html_match = content.match(/<img[^>]+src="([^"]+)"/)
        html_match ? html_match[1] : nil
      end
    end
    
    def post_featured_image(post)
      # First check if post has explicit featured_image
      if post['featured_image'] && !post['featured_image'].empty?
        # Check if it's a placeholder path (our non-existent local paths)
        if post['featured_image'].start_with?('/assets/images/')
          # Fall back to extracting from content
          extract_first_image(post.content)
        else
          post['featured_image']
        end
      else
        # Extract from content
        extract_first_image(post.content)
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImageExtractor)
