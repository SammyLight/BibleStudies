module Jekyll
	class ReverseTagsGenerator < Generator
	  def generate(site)
		reversed_tags = site.tags.keys.reverse
		site.config['reversed_tags'] = reversed_tags
	  end
	end
  end
  