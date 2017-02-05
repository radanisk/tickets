user = User.create(name: 'user', password: 'password', email: 'user@example.com')
agent = User.create(name: 'agent', password: 'password', email: 'agent@example.com', agent: true)
admin = User.create(name: 'admin', password: 'password', email: 'admin@example.com', admin: true)

3.times do |i|
  ticket = user.tickets.create!(
      title: "Ticket #{i}",
      comment: 'Description',
  )

  2.times do |j|
    agent.comments.create!(ticket: ticket, content: "Agent response #{j}")
    user.comments.create!(ticket: ticket, content: "User response #{j}")
  end

  ticket.update!(agent: agent)
end
