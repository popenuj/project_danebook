class Profile < ApplicationRecord
  belongs_to :user, inverse_of: :profile
  belongs_to :profile_photo, class_name: "Photo", optional: true
  belongs_to :cover_photo, class_name: "Photo", optional: true

  validates_presence_of :first_name, :last_name, :birthday, :gender

end
