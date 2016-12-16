class CommentMailer < ApplicationMailer

  def comment_posted(comment)
    @comment = comment
    @user = comment.post.user
    @commentor = comment.user
    mail(to: @user.email, subject: "#{@commentor.profile.first_name} commented on your post!")
  end

end
