class CommentsController < ApplicationController

  def new
    @comment = Comment.new
  end

  def create
    if params[:post_id]
      post = Post.find(params[:post_id])
      current_user.posts.find(post.id).comments.create!(comment_params)
    else
      photo = Photo.find(params[:photo_id])
      current_user.photos.find(photo.id).comments.create!(comment_params)
    end
    redirect_to :back
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy!
    redirect_to :back
  end

  private

  def comment_params
    params.require(:comment).permit(:comment_text).merge(user_id: current_user.id)
  end

end
