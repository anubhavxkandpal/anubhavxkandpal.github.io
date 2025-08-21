module Jekyll
  module AutoQuotes
    def auto_style_quotes(content)
      # Pattern to match quotes with attribution
      quote_pattern = /"([^"]+)"\s*[–—-]\s*([^.\n]+)/
      
      content.gsub(quote_pattern) do |match|
        quote_text = $1
        author = $2.strip
        
        # Generate styled quote HTML
        <<~HTML
          <div class="auto-quote">
            <blockquote>"#{quote_text}"</blockquote>
            <cite>— #{author}</cite>
          </div>
        HTML
      end
    end
  end
end

# Apply the filter to post content during generation
Jekyll::Hooks.register :posts, :post_render do |post|
  if post.output_ext == '.html'
    post.output = Jekyll::AutoQuotes.auto_style_quotes(post.output)
  end
end

# Also apply to pages
Jekyll::Hooks.register :pages, :post_render do |page|
  if page.output_ext == '.html'
    page.output = Jekyll::AutoQuotes.auto_style_quotes(page.output)
  end
end

# Make the filter available in liquid templates as well
Liquid::Template.register_filter(Jekyll::AutoQuotes)