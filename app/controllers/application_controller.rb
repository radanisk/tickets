class ApplicationController < ActionController::Base
  abstract!

  protect_from_forgery with: :exception

  def ensure_current_user
    warden.authenticate!(scope: :user)
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, alert: exception.message
  end
end
