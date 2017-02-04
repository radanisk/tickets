module Api
  module V1
    class ProfilesController < BaseController
      def show
        render action: :show
      end
    end
  end
end
