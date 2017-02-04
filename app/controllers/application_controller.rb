class ApplicationController < ActionController::Base
  abstract!

  protect_from_forgery with: :exception

  def ensure_current_user
    warden.authenticate!(scope: :user)
  end
end
