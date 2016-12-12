class User < ApplicationRecord
  has_one :profile, inverse_of: :user, dependent: :destroy
  accepts_nested_attributes_for :profile, reject_if: :all_blank
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source_type: 'Post', source: :likeable, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :liked_comments, through: :likes, source_type: 'Comment', source: :likeable, dependent: :destroy
  has_many :initiated_friendings, foreign_key: :friender_id,
                                   class_name: "Friending"
  has_many :friended_users, through: :initiated_friendings,
                             source: :friend_recipient
  has_many :received_friendings, foreign_key: :friend_id,
                                  class_name: "Friending"
  has_many :users_friended_by, through: :received_friendings,
                                source: :friend_initiator

  before_create :generate_token

  has_secure_password


  validates_format_of :email, with: /\A[^@]+@[^@]+\.[^@]+\Z/, allow_nil: true
  validates_format_of :password, with: /\A(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\Z/, allow_nil: true

  def regenerate_auth_token
    destroy_token
    generate_token
    save!
  end

  def destroy_token
    self.token = nil
  end


private

    def generate_token
      begin
        self[:token] = SecureRandom.urlsafe_base64
      end while User.exists?(:token => self[:token])
    end

end
