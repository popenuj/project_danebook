module ApplicationHelper
  def render_nav_content
    if signed_in_user?
      render_user_nav
    else
      render_login_nav
    end
  end

  def render_user_nav
    render partial: 'shared/search_bar'
    render partial: 'shared/user_dropdown'
  end

  def render_login_nav
    render partial: 'shared/login_nav'
  end

  def get_navbar_variables
    get_user
    get_profile
    get_profile_photo
    get_cover_photo
  end

  def get_user
    unless @user
      @user = current_user
    end
  end

  def get_profile
    unless @profile
      @profile = current_user.profile
    end
  end

  def get_profile_photo
    if @user.profile.profile_photo_id
      unless @profile_photo
        @profile_photo = Photo.find(current_user.profile.profile_photo_id)
      end
    end
  end

  def get_cover_photo
    if @user.profile.cover_photo_id
      unless @cover_photo
        @cover_photo = Photo.find(current_user.profile.cover_photo_id)
      end
    end
  end

end
