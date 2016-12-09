module UsersHelper
  require 'time'

  def valid_post_user?(post)
    post.user == current_user ? true : false
  end

  def format_time(time)
    time.strftime("%A %m/%d/%Y")
  end

end
