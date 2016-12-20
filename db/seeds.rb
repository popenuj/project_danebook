GENDER = ["male", "female"]
puts "Seeding users"
20.times do
  User.create(email: Faker::Internet.email,
              password: "password1",
              password_confirmation: "password1")
end

puts "Seeding profiles"
User.all.each do |user|
  user.profile(user_id: user.id,
                   first_name: Faker::Name.first_name,
                    last_name: Faker::Name.last_name,
                     birthday: Faker::Date.backward(1000),
                       gender: GENDER.sample,
                      college: Faker::Educator.university,
                     hometown: Faker::Address.city,
              currently_lives: Faker::Address.city,
                    telephone: Faker::PhoneNumber.phone_number).save
end

puts "Seeding posts"
60.times do
  Post.create(user_id: User.all.sample.id,
            post_text: Faker::StarWars.quote)
end

puts "Seeding comments"
180.times do
  Comment.create(user_id: User.all.sample.id,
          commentable_id: Post.all.sample.id,
        commentable_type: "post",
            comment_text: Faker::Hipster.sentence)
end
