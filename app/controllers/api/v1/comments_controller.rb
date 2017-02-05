module Api
  module V1
    class CommentsController < BaseController
      def index
        comments = current_user.tickets.find(params[:ticket_id]).comments.all

        render locals: { comments: comments }
      end

      def create
        comment = Ticket.find(params[:ticket_id]).comments.new(ticket_params.merge(user_id: current_user.id))
        if comment.save
          render(
            action: :show,
            locals: { comment: comment },
            status: :created,
            location: url_for(action: :show, id: comment)
          )
        else
          render json: { errors: comment.errors }, status: :unprocessable_entity
        end
      end

      def show
        comment = current_user.tickets.find(params[:ticket_id]).comments.find(params[:id])

        render locals: { comment: comment }
      end

      private

      def ticket_params
        params.require(:comment).permit(:content)
      end
    end
  end
end
