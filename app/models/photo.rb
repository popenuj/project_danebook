class Photo < ApplicationRecord

  belongs_to :user
  belongs_to :profile, optional: true

  has_many :likes, :as => :likeable, dependent: :destroy
  has_many :comments, :as => :commentable, dependent: :destroy

  has_attached_file :photo,
              styles: { thumb: "100x100" },
     convert_options: { thumb: '-strip
                                -quality 30%
                                -resize 600x
                                -sharpen 0x0.5'}

    validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/


end
