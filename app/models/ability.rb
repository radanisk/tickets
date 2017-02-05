class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user
    can(:create, Ticket)
    can([:show, :update], Ticket) { |ticket| ticket.user_id == user.id }
  end
end
