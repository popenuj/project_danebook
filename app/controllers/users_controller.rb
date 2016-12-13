class UsersController < ApplicationController
  before_action :correct_user, except: [:index, :show, :new, :create]

  skip_before_action :authenticate, only: [:new, :create]

  def index
    @post = Post.new
    @posts = Post.all.order("created_at DESC")
    @comment = Comment.new
    @comments = Comment.all
    @friends = current_user.friended_users
    @users = User.all
  end

  def new
    if current_user
      redirect_to users_path
    end
    @user = User.new
    @user.build_profile
  end

  def create
    @user = User.new(whitelisted)
    if @user.save
      sign_in(@user)
      flash[:success] = ["Successfully signed in"]
      redirect_to users_path
    else
      flash.now[:danger] = ["Something went wrong signing up"]
      @user.errors.full_messages.each do |error|
        flash.now[:danger] << error
      end
      render :new
    end
  end

  def show
  end

  private

    def whitelisted
      if params[:user][:profile_attributes]["birthday(1i)"]
        params[:user][:profile_attributes][:birthday] = parse_date_select
      end
      params.require(:user).permit(
                                    :email,
                                    :password,
                                    :password_confirmation,
                                    {
                                      profile_attributes:[
                                                          :first_name,
                                                          :last_name,
                                                          :birthday,
                                                          :gender
                                                        ]
                                    }
                                  )
    end

    def parse_date_select
      Date.new params[:user][:profile_attributes]["birthday(1i)"].to_i, params[:user][:profile_attributes]["birthday(2i)"].to_i, params[:user][:profile_attributes]["birthday(3i)"].to_i
    end

    def correct_user
      unless params[:id] == current_user.id.to_s
        flash[:danger] = ["You cannot mess with other users! Jerk.."]
        redirect_to user_path(current_user)
      end
    end

    def set_user
      @user = User.find(params[:id])
    end

end
