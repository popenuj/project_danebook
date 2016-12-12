class PostsController < ApplicationController

  def index
    @posts = Post.all
    @comments = Comment.all
    @comment = Comment.new
  end

  def new
    @post = Post.new
  end

  def create
    @post = current_user.posts.build(whitelisted_post_params)
    if @post.save
      redirect_to users_path
    end
  end

  def edit
  end

  def update
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      redirect_to users_path
    else
      flash[:danger] = "There was a problem with your request!"
      render users_path
    end
  end

  def show
  end

  private

  def whitelisted_post_params
    params.require(:post).permit(:post_text)
  end
end
