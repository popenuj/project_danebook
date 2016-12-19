class ProfilesController < ApplicationController

  def update
    @profile = current_user.profile.update(whitelisted_profile_params)
    redirect_to user_ profile_path
  end

  def show
    @user = User.find(params[:user_id ])
    @profile = Profile.find(params[:user_id ])
    if @profile.profile_photo_id
      @profile_photo = Photo.find(@user.profile.profile_photo_id)
    end
    if @profile.cover_photo_id
      @cover_photo = Photo.find(@user.profile.cover_photo_id)
    end
  end

  private

  def whitelisted_profile_params
    params.permit(:college,
                  :hometown,
                  :currently_lives,
                  :telephone,
                  :wtlb,
                  :about_me,
                  :profile_photo_id,
                  :cover_photo_id)
  end

end
