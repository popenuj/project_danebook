class PhotosController < ApplicationController

  def index
    @photos = current_user.photos.all
  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(whitelisted_photo_params)
    if @photo.save
      redirect_to photos_path
    else
      flash.now[:error] = "Your photo could not be uploaded"
      render photo_path
    end
  end

  private

  def whitelisted_photo_params
    params.require(:photo).permit(:user_photo)
  end

end
