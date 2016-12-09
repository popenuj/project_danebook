class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.references :user
      t.string     :first_name
      t.string     :last_name
      t.date       :birthday
      t.string     :gender
      t.string     :college
      t.string     :hometown
      t.string     :currently_lives
      t.string     :telephone
      t.string     :wtlb
      t.text       :about_me

      t.timestamps
    end
  end
end
