class Photo < ApplicationRecord

  belongs_to        :user
  has_attached_file :user_photo,
              styles: { thumb: "100x100#" },
     convert_options: { thumb: '-strip
                                -quality 30%
                                -resize 600x
                                -sharpen 0x0.5
                                source.jpg
                                output.jpg' }

  validates_attachment :profile_picture,
           content_type: {
           content_type: ["image/jpeg",
                          "image/gif",
                          "image/png"] }
                          
end
