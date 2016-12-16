class AddCoverPhotoToProfileTable < ActiveRecord::Migration[5.0]
  def change
    add_attachment :profiles, :cover_photo
  end
end
