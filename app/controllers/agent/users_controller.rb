module Agent
  class UsersController < BaseController
    inherit_resources

    actions :all, except: [:destroy]

    before_action :ensure_admin

    def permitted_params
      params.permit(user: [:email, :name, :password, :password_confirmation, :agent, :admin])
    end
  end
end