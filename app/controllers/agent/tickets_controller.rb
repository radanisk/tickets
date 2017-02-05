module Agent
  class TicketsController < BaseController
    inherit_resources
    actions :index, :show, :update

    def permitted_params
      params.permit(ticket: [:status, :agent_id])
    end
  end
end