module Api
  module V1
    class BaseController < ApplicationController
      abstract!

      include CsrfCookie
      respond_to :json

      before_action :ensure_current_user
    end
  end
end
