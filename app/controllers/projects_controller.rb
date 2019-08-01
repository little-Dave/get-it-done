class ProjectsController < ApplicationController

  def create
    Project.create(allowed_params)
  end

  def update
    project = Project.find(params[:id])
    project.update
  end

  def destroy
    project = Project.find(params[:id])
    project.destroy
  end

  private

  def allowed_params
    params.require(:project).permit(:name, :description, :notes, :user_id)
  end

end
