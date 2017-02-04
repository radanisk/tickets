module Api
  module V1
    class SessionsController < BaseController
      prepend_before_action :allow_params_authentication!, only: :create
      skip_before_action :ensure_current_user
      skip_before_action :verify_authenticity_token, only: :create

      def create
        if warden.authenticated?(:user)
          return render json: {error: t('devise.failure.already_authenticated')},
                        status: :unprocessable_entity
        end
        user = warden.authenticate!(scope: :user)
        sign_in(:user, user)
        head :created
      end

      def destroy
        sign_out
        head :no_content
      end
    end
  end
end
