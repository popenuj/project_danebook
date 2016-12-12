class CommentsController < ApplicationController

  def new
    @comment = Comment.new
  end

  def create
    @comment = current_user.comments.build(whitelisted_comment_params)
    if @comment.save
      redirect_to users_path
    else
      skdjfaasfdas
    end
  end

  def edit
  end

  def update
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      redirect_to users_path
    else
      flash[:danger] = "There was a problem with your request!"
      render users_path
    end
  end

  def show
  end

  private

  def whitelisted_comment_params
    params.require(:comment).permit(:comment_text,
                                    :post_id,
                                    :user_id)
  end

end