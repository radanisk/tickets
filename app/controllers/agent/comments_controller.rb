module Agent
  class CommentsController < BaseController
    inherit_resources
    actions :create
    belongs_to :ticket

    def permitted_params
      params[:comment][:user_id] = current_user.id
      params.permit(comment: [:content, :user_id])
    end
  end
end
