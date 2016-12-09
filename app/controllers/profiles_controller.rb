class ProfilesController < ApplicationController

  def new
  end

  def create
  end

  def edit
    @profile = current_user.profile
  end

  def update
    @profile = Profile.update(whitelisted_profile_params)
    redirect_to user_profile_path
  end

  def show
    @profile = current_user.profile
  end

  def destroy
  end

  def index
  end

  private

  def whitelisted_profile_params
    params.require(:profile).permit(:college,
                                    :hometown,
                                    :currently_lives,
                                    :telephone,
                                    :wtlb,
                                    :about_me)
  end

end
