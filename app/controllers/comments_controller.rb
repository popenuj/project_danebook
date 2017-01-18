class CommentsController < ApplicationController

  def new
    @comment = Comment.new
  end

  def create
    if params[:post_id]
      @post = Post.find(params[:post_id])
      @comment = current_user.posts.find(@post.id).comments.create!(comment_params)
      respond_to do |format|
        format.js
      end
    else
      photo = Photo.find(params[:photo_id])
      @comment = current_user.photos.find(photo.id).comments.create!(comment_params)
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    respond_to do |format|
      format.js
    end
    @comment.destroy!
  end

  private

  def comment_params
    params.require(:comment).permit(:comment_text).merge(user_id: current_user.id)
  end

end
