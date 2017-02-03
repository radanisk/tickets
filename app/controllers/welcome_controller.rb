class WelcomeController < ApplicationController
  include ReactOnRails::Controller

  def index
    redux_store(
        'ticketsStore',
        props: render_to_string(template: "api/v1/tickets/index.json.jbuilder", locals: { tickets: Ticket.all }, format: :json)
    )

    respond_to do |format|
      format.html
    end
  end
end
