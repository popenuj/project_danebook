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
      @comments = Comment.all
      @comment = Comment.new
      respond_to do |format|
        format.js
      end
    else
      flash.now[:danger]
      respond_to do |format|
        format.js {head :none}
      end
    end
  end

  def destroy
    # @comment = Comment.find(params[:id])
    # respond_to do |format|
    #   format.js
    # end
    # @comment.destroy!
    @post = Post.find(params[:id])
    respond_to do |format|
      format.js
    end
    @post.destroy
  end

  private

  def whitelisted_post_params
    params.require(:post).permit(:post_text)
  end
end
