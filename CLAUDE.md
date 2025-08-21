# Heart of Reason Website - Development Log

## Completed Tasks (August 2025)

### 1. Category System Implementation
Successfully organized all essays into 4 main categories:

**Beauty & Reflection**
- Title: "Beauty & Reflection" 
- Description: "Aesthetic philosophy, the appreciation of sublime experience, travel reflections, and contemplations on the beauty found in everyday moments and nature."
- Essays: Beauty, Nature And Our Connection To All Of Life, Nature Saying Hello, We Don't Know How To Spend Our Time

**Society** 
- Essays: The Dissatisfied Generation, Origins of Social Inequality, Modern Consumerism and the Shopping Delusion, Capitalist Realism, What Society Tells Us We Should Be, The Myth of Modernity, The Self-Obsessed Society

**Consciousness**
- Essays: From Self-Concern to Selfless Activity, The Lost Art of Suffering, The Paradox of Happiness, The Truth About Happiness, The Nature of Belief, Discipline and Chaos

**Ethics**
- Essays: Not Everything is for Sale, Money Greed and the Human Pursuit of Survival

### 2. Automatic Image Assignment System
**SUPERSEDED**: Initial Jekyll liquid filter approach was replaced with custom Jekyll filter.

**Current Implementation**: 
- Uses custom Jekyll filter `post_featured_image` 
- Modified `/Users/anubhav/Documents/GitHub/heartofreason/_layouts/category.html`:
  ```liquid
  {% assign category_image = post | post_featured_image %}
  {% if category_image %}
  <div class="article-image">
    <img src="{{ category_image }}" alt="{{ post.title }}">
  </div>
  {% endif %}
  ```
- Automatically extracts first image from markdown content
- No manual featured_image assignment needed in front matter

### 3. Category Assignments Applied
All essays now have proper category assignments in their front matter:
- Format: `categories: [essays, beauty, consciousness]` (multiple categories allowed)
- Maintains original "essays" category while adding specific thematic categories

### 4. Beauty Category Expansion
- Renamed from "Beauty" to "Beauty & Reflection"
- Expanded description to include travel reflections and everyday beauty contemplations
- Added nature-focused and travel reflection essays to this category

### 5. Automatic Quote Styling System (August 2025)
**Problem**: Quotes with attribution like `"quote" – Author` appeared as plain text

**Solution Implemented - JavaScript Method**:

**Files Created/Modified**:
1. **CSS Added** to `/Users/anubhav/Documents/GitHub/heartofreason/_sass/main.scss`:
   ```scss
   // Auto-styled quotes (applied via JavaScript)
   .auto-quote {
     font-family: 'Playfair Display', serif;
     font-size: 1.2em;
     font-style: italic;
     color: #555;
     text-align: center;
     margin: 35px auto;
     padding: 25px;
     background: rgba(255, 182, 193, 0.03);
     border-radius: 8px;
     border-left: 3px solid rgba(255, 182, 193, 0.2);
     max-width: 85%;
     
     &:before, &:after {
       content: '"';
       font-size: 1.3em;
       color: rgba(255, 182, 193, 0.5);
     }
   }
   ```

2. **JavaScript Created** at `/Users/anubhav/Documents/GitHub/heartofreason/assets/js/auto-quotes.js`:
   - Detects quote pattern: `"quote text" – Author Name`
   - Automatically applies `.auto-quote` class
   - Wraps author in semantic `<cite>` tags

3. **Layout Modified** `/Users/anubhav/Documents/GitHub/heartofreason/_layouts/post.html`:
   - Added: `<script src="{{ "/assets/js/auto-quotes.js" | relative_url }}"></script>`

**Alternative Approaches Discussed**:
- **Manual Method**: Using `{% include pull-quote.html %}` for each quote
- **Jekyll Plugin Method**: Would process quotes during site generation

**IF SWITCHING TO JEKYLL PLUGIN - REMOVE THESE**:
```scss
// Remove from _sass/main.scss lines ~607-625:
.auto-quote {
  font-family: 'Playfair Display', serif;
  font-size: 1.2em;
  font-style: italic;
  color: #555;
  text-align: center;
  margin: 35px auto;
  padding: 25px;
  background: rgba(255, 182, 193, 0.03);
  border-radius: 8px;
  border-left: 3px solid rgba(255, 182, 193, 0.2);
  max-width: 85%;
  
  &:before, &:after {
    content: '"';
    font-size: 1.3em;
    color: rgba(255, 182, 193, 0.5);
  }
}
```

```html
<!-- Remove from _layouts/post.html line 97: -->
<script src="{{ "/assets/js/auto-quotes.js" | relative_url }}"></script>
```

```javascript
// Delete entire file: /Users/anubhav/Documents/GitHub/heartofreason/assets/js/auto-quotes.js
```

## Technical Implementation Details

### Quote Statistics Found
- 10 total quote occurrences across 7 essay files
- Pattern: `"quote text" – Author Name` or `"quote text" — Author Name`
- Examples: Rumi, Rilke, Baudrillard quotes

### Category Assignment Pattern
Essays typically assigned to 1-3 categories based on content themes:
- All essays retain "essays" base category
- Added thematic categories: beauty, society, consciousness, ethics
- Multiple categories allowed for cross-cutting themes

## Current Site Structure
- 4 thematic categories effectively organize all philosophical essays
- Automatic image handling using custom Jekyll filter
- Beauty category encompasses aesthetic philosophy, travel reflections, and nature contemplations
- Automatic quote styling via JavaScript (or can be switched to Jekyll plugin)
- All category pages display properly with first images from posts when available