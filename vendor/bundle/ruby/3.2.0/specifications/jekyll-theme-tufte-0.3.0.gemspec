# -*- encoding: utf-8 -*-
# stub: jekyll-theme-tufte 0.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-theme-tufte".freeze
  s.version = "0.3.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Andy Brody".freeze, "Stephan Druskat".freeze, "Clay H".freeze]
  s.date = "2022-12-09"
  s.email = ["git@abrody.com".freeze]
  s.homepage = "https://github.com/ab/jekyll-theme-tufte".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.1".freeze
  s.summary = "A modern Jekyll theme based on tufte-css, in the style of Edward Tufte".freeze

  s.installed_by_version = "3.4.1" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 4.3"])
  s.add_runtime_dependency(%q<jekyll-feed>.freeze, ["~> 0.17"])
  s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
  s.add_development_dependency(%q<rake>.freeze, [">= 0"])
end
