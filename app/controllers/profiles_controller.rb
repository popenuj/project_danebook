class ProfilesController < ApplicationController

  def update
    @profile = current_user.profile.update(whitelisted_profile_params)
    redirect_to user_profile_path
  end

  def show
    @user = User.find(params[:user_id ])
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
