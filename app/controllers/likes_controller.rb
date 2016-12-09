class LikesController < ApplicationController

  def create
    @like = current_user
  end

  def destroy
  end

end
