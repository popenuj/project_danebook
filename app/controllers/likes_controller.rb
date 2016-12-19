class LikesController < ApplicationController

  def create
    if params[:post_id]
      post = Post.find(params[:post_id])
      post.likes.create!(user: current_user)
    elsif params[:comment_id]
      comment = Comment.find(params[:comment_id])
      comment.likes.create!(user: current_user)
    else
      photo = Photo.find(params[:photo_id])
      photo.likes.create!(user: current_user)
    end
    redirect_to :back
  end

  def destroy
    if params[:post_id]
      post = Post.find(params[:post_id])
      like = Like.find_by(user: current_user, likeable: post)
      like.destroy!
    elsif params[:comment_id]
      comment = Comment.find(params[:comment_id])
      like = Like.find_by(user: current_user, likeable: comment)
      like.destroy!
    else
      photo = Photo.find(params[:photo_id])
      like = Like.find_by(user: current_user, likeable: photo)
      like.destroy!
    end
    redirect_to :back
  end

end
