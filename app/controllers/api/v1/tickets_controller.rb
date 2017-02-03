module Api
  module V1
    class TicketsController < BaseController
      def index
        @tickets = Ticket.all

        render locals: {tickets: @tickets}
      end
    end
  end
end
