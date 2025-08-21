#!/usr/bin/env ruby

# Script to convert plain quotes to pull-quote includes
# Usage: ruby convert_quotes.rb

require 'fileutils'

# Pattern to match quotes with attribution
QUOTE_PATTERN = /"([^"]+)"\s*[–—-]\s*([^\n.]+)/

def convert_quotes_in_file(file_path)
  content = File.read(file_path)
  original_content = content.dup
  
  # Replace quote pattern with pull-quote include
  content.gsub!(QUOTE_PATTERN) do |match|
    quote_text = $1.strip
    author = $2.strip
    
    puts "Converting quote: \"#{quote_text}\" by #{author}"
    "{% include pull-quote.html quote=\"#{quote_text}\" author=\"#{author}\" %}"
  end
  
  # Only write if content changed
  if content != original_content
    File.write(file_path, content)
    puts "✓ Updated: #{file_path}"
    true
  else
    false
  end
end

def main
  essay_dir = "_posts/essays"
  
  unless Dir.exist?(essay_dir)
    puts "Error: #{essay_dir} directory not found"
    exit 1
  end
  
  essays = Dir.glob("#{essay_dir}/*.md")
  converted_count = 0
  
  puts "Converting quotes in #{essays.length} essay files..."
  puts "=" * 50
  
  essays.each do |essay_path|
    puts "\nProcessing: #{essay_path}"
    if convert_quotes_in_file(essay_path)
      converted_count += 1
    else
      puts "  No quotes found to convert"
    end
  end
  
  puts "\n" + "=" * 50
  puts "Conversion complete!"
  puts "Files updated: #{converted_count}"
  puts "\nYou can now commit the changes when ready."
end

if __FILE__ == $0
  main
end