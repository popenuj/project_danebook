class UserMailer < ApplicationMailer
  default :from => "somebody@example.com"

  def welcome(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to Danebook!')
  end

end
