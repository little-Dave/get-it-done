class UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end
  
  def create
    User.create(allowed_params)
  end

  def show
    user = User.find_by(username: params[:id])
    render json: user, include: [:projects]
  end

  private

  def allowed_params
    params.require(:user).permit(:username, :name)
  end

end

