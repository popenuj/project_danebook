class UserMailer < ApplicationMailer
  default :from => "somebody@example.com"

  def welcome(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to Danebook!')
  end

  def suggest_friends(user)
    @user = user
    users = User.all - [user]
    @friends = []
    if users.size < 3
      @friends << users
    else
      3.times do
        @friends << users.sample
      end
    end
    mail(to: @user.email, subject: "We noticed you are unpopular, let us help change your life!")
  end

end
