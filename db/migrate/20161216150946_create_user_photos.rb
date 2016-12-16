class CreateUserPhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :user_photos do |t|
      t.attachment :user_photo

      t.timestamps
    end
  end
end
