#!/usr/bin/env python3
"""
Image Sync Tool for Substack to GitHub Posts

Usage:
    python image_sync.py add <post_file> <mapping_file>
    python image_sync.py create-mapping <mapping_name>
    python image_sync.py show <mapping_file>
"""

import json
import sys
import os
import re

class ImageSync:
    def __init__(self):
        self.mapping_file = None
        
    def load_mapping(self, mapping_file):
        """Load image mapping from JSON file"""
        try:
            with open(mapping_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Error: Mapping file '{mapping_file}' not found.")
            sys.exit(1)
            
    def save_mapping(self, mapping_file, data):
        """Save mapping to JSON file"""
        with open(mapping_file, 'w') as f:
            json.dump(data, f, indent=2)
            
    def create_mapping_template(self, name):
        """Create a new mapping file template"""
        template = {
            "post_name": name,
            "images": [
                {
                    "name": "image1",
                    "url": "https://example.com/image.jpg",
                    "caption": "Photo by Author on Source",
                    "insert_after": "## Section Title"
                }
            ]
        }
        filename = f"{name}_images.json"
        self.save_mapping(filename, template)
        print(f"Created template: {filename}")
        print("\nEdit this file to add your images with these fields:")
        print("- name: identifier for the image")
        print("- url: direct image URL")
        print("- caption: image caption (optional)")
        print("- insert_after: text after which to insert the image")
        
    def add_images_to_post(self, post_file, mapping_file):
        """Add images to markdown post based on mapping"""
        # Load mapping
        mapping = self.load_mapping(mapping_file)
        
        # Read post content
        with open(post_file, 'r') as f:
            content = f.read()
            
        # Process each image
        for img in mapping['images']:
            insert_after = img['insert_after']
            image_md = f"\n\n![{img.get('name', '')}]({img['url']})"
            if 'caption' in img:
                image_md += f"\n*{img['caption']}*"
                
            # Find insertion point
            if insert_after in content:
                # Insert after the specified text
                parts = content.split(insert_after, 1)
                if len(parts) == 2:
                    content = parts[0] + insert_after + image_md + parts[1]
                    print(f"✓ Inserted {img['name']} after '{insert_after}'")
                else:
                    print(f"✗ Could not find unique position for '{insert_after}'")
            else:
                print(f"✗ Text '{insert_after}' not found in post")
                
        # Save updated content
        with open(post_file, 'w') as f:
            f.write(content)
        print(f"\nUpdated file: {post_file}")
        
    def show_mapping(self, mapping_file):
        """Display mapping file contents"""
        mapping = self.load_mapping(mapping_file)
        print(f"\nPost: {mapping.get('post_name', 'Unknown')}")
        print(f"Images: {len(mapping['images'])}")
        for i, img in enumerate(mapping['images'], 1):
            print(f"\n{i}. {img.get('name', 'Unnamed')}")
            print(f"   URL: {img['url']}")
            print(f"   Insert after: {img['insert_after']}")
            if 'caption' in img:
                print(f"   Caption: {img['caption']}")

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
        
    tool = ImageSync()
    command = sys.argv[1]
    
    if command == 'add' and len(sys.argv) == 4:
        tool.add_images_to_post(sys.argv[2], sys.argv[3])
    elif command == 'create-mapping' and len(sys.argv) == 3:
        tool.create_mapping_template(sys.argv[2])
    elif command == 'show' and len(sys.argv) == 3:
        tool.show_mapping(sys.argv[2])
    else:
        print(__doc__)
        sys.exit(1)

if __name__ == '__main__':
    main()
