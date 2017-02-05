module Api
  module V1
    class TicketsController < BaseController
      def index
        tickets = current_user.tickets.all

        render locals: {tickets: tickets}
      end

      def create
        ticket = current_user.tickets.new(ticket_params)
        if ticket.save
          render(
            action: :show,
            locals: { ticket: ticket },
            status: :created,
            location: url_for(action: :show, id: ticket)
          )
        else
          render json: { errors: ticket.errors }, status: :unprocessable_entity
        end
      end

      def show
        ticket = Ticket.find(params[:id])

        render locals: {ticket: ticket}
      end

      def update
        ticket = Ticket.find(params[:id])

        authorize! :update, ticket

        if ticket.update(ticket_params)
          render(
            action: :show,
            locals: { ticket: ticket },
            status: :accepted,
            location: url_for(action: :show, id: ticket)
          )
        else
          render json: { errors: ticket.errors }, status: :unprocessable_entity
        end

      end

      private

      def ticket_params
        if action_name == 'update'
          params.require(:ticket).permit(:status)
        else
          params.require(:ticket).permit(:title, :comment)
        end
      end
    end
  end
end
