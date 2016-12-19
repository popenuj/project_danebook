class Comment < ApplicationRecord

  belongs_to :user
  belongs_to :commentable, :polymorphic => true
  belongs_to :post, optional: true
  belongs_to :photo, optional: true
  has_many :likes, :as => :likeable, dependent: :destroy

  after_create :queue_comment_posted_email

  def queue_comment_posted_email
    CommentMailer.comment_posted(self).deliver_later
  end

end
