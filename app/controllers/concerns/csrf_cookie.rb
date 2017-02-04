module CsrfCookie
  def self.included(base)
    base.after_action :add_csrf_cookie
  end

  protected

  def add_csrf_cookie
    cookies['CSRF-Token'] = form_authenticity_token if protect_against_forgery?
  end
end
