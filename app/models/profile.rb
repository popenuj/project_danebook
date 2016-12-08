class Profile < ApplicationRecord
  belongs_to :user, inverse_of: :profile

  validates_presence_of :first_name, :last_name, :birthday, :gender

end
