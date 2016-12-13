class FriendingsController < ApplicationController

  def index
    @friends = current_user.friended_users
  end

  def show
    @friends = User.all.where("profile.first_name LIKE ?, params(:input)")
  end

  def create
    friending_recipient = User.find(params[:id])
    if current_user.friended_users << friending_recipient
      flash[:success] = ["User successfully added as your friend!"]
      redirect_to friending_recipient
    else
      flash[:danger] = ["Could not add user as friend!"]
      redirect_to friending_recipient
    end
  end

  def destroy
    unfriended_user = User.find(params[:id])
    current_user.friended_users.delete(unfriended_user)
    flash[:sucess] = ["Successfully unfriended!"]
    redirect_to root_path
  end

end
