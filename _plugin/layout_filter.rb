module Jekyll
	module LayoutSortFilter
	  def layout_sort(pages, layout)
		pages.select { |page| page.data.layout == layout }.sort_by { |page| page.date }
	  end
	end
  end
  
  Liquid::Template.register_filter(Jekyll::LayoutSortFilter)