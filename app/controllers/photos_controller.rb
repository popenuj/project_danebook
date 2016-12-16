class PhotosController < ApplicationController

  def index
    @photos = User.find(params[:user_id]).photos
  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = current_user.photos.build(whitelisted_photo_params)
    if @photo.save!
      redirect_to @photo
    else
      flash.now[:error] = ["Your photo could not be uploaded"]
      render new_photo_path
    end
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def destroy
    @photo = Photo.find(params[:id])
  end

  private

  def whitelisted_photo_params
    params.require(:photo).permit(:photo)
  end

end
