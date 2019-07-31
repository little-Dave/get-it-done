class ProjectsController < ApplicationController

  def destroy
    project = Project.find(params[:id])
    project.destroy
  end

end
