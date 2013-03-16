module ApplicationHelper
  def app_name
    t(:app_name)
  end

  def title
    base_title = app_name
    if @title.nil?
      base_title
    else
      "#{@title} - #{base_title}"
    end
  end
end
