class Photo < ApplicationRecord

  belongs_to        :user

  has_attached_file :photo,
              styles: { thumb: "100x100" },
     convert_options: { thumb: '-strip
                                -quality 30%
                                -resize 600x
                                -sharpen 0x0.5'}

    validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/


end
