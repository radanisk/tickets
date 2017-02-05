class WelcomeController < ApplicationController
  include ReactOnRails::Controller

  def index
    redux_store(
        'ticketsStore',
        props: render_to_string(template: "api/v1/tickets/index.json.jbuilder", locals: { tickets: current_user ? current_user.tickets.all : [] }, format: :json)
    )

    respond_to do |format|
      format.html
    end
  end
end
