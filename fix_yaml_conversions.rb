#!/usr/bin/env ruby

# Script to fix incorrectly converted YAML front matter
# Usage: ruby fix_yaml_conversions.rb

require 'fileutils'

def fix_yaml_in_file(file_path)
  content = File.read(file_path)
  original_content = content.dup
  
  # Fix reading_time field
  content.gsub!(/reading_time: {% include pull-quote\.html quote="([^"]+)" author="--" %}/, 'reading_time: "\1"')
  
  # Fix author field
  content.gsub!(/author: {% include pull-quote\.html quote="([^"]+)" author="--" %}/, 'author: "\1"')
  
  # Fix excerpt field
  content.gsub!(/excerpt: {% include pull-quote\.html quote="([^"]+)" author="--" %}/, 'excerpt: "\1"')
  
  # Only write if content changed
  if content != original_content
    File.write(file_path, content)
    puts "✓ Fixed: #{file_path}"
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
  fixed_count = 0
  
  puts "Fixing YAML front matter in #{essays.length} essay files..."
  puts "=" * 50
  
  essays.each do |essay_path|
    if fix_yaml_in_file(essay_path)
      fixed_count += 1
    end
  end
  
  puts "\n" + "=" * 50
  puts "Fix complete!"
  puts "Files fixed: #{fixed_count}"
end

if __FILE__ == $0
  main
end