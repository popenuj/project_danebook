class ProfilesController < ApplicationController

  def new
  end

  def create
  end

  def edit
  end

  def update
    @profile = current_user.profile.update(whitelisted_profile_params)
    redirect_to user_profile_path
  end

  def show
    @user = User.find(params[:user_id ])
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
