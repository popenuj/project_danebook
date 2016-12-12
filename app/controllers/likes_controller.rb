class LikesController < ApplicationController

  def create
    if params[:post_id]
      post = Post.find(params[:post_id])
      post.likes.create!(user: current_user)
      redirect_to users_path
    else
      comment = Comment.find(params[:comment_id])
      comment.likes.create!(user: current_user)
      redirect_to users_path
    end
  end

  def destroy
    if params[:post_id]
      post = Post.find(params[:post_id])
      like = Like.find_by(user: current_user, likeable: post)
      like.destroy!
      redirect_to users_path
    else
      comment = Comment.find(params[:comment_id])
      like = Like.find_by(user: current_user, likeable: comment)
      like.destroy!
      redirect_to users_path
    end
  end

end
