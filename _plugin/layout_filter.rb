module Jekyll
	module LayoutFilter
	  def filter_by_layout(posts, layout)
		posts.select { |post| post['layout'] == layout }
	  end
	end
  end
  
  Liquid::Template.register_filter(Jekyll::LayoutFilter)
  