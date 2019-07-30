class UsersController < ApplicationController

  def show
    user = User.find_by(username: params[:id])
    render json: user, include: [:projects]
  end

end
