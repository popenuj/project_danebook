class LikesController < ApplicationController

  def create
    if params[:post_id]
      post = Post.find(params[:post_id])
      post.likes.create!(user: current_user)
      redirect_to users_path
    else
      @like = current_user.likes.build(likeable_id: params[:comment_id])
    end
  end

  def destroy
    post = Post.find(params[:post_id])
    like = Like.find_by(user: current_user, likeable: post)
    like.destroy!
    redirect_to users_path
  end

end
