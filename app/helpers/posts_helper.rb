module PostsHelper

  def get_like_id(post)
    like = Like.all.where(user_id: current_user.id).where(likeable_id: post.id)[0]
  end
end
