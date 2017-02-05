module Agent
  class BaseController < ApplicationController
    abstract!

    layout 'agent'

    before_action :ensure_agent

    def ensure_agent
      ensure_current_user
      raise CanCan::AccessDenied.new('For agent only', action_name) unless current_user.agent? || current_user.admin?
    end

    def ensure_admin
      ensure_current_user
      raise CanCan::AccessDenied.new('For agent only', action_name) unless current_user.admin?
    end
  end
end