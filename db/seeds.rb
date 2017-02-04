{
  admin: { admin: true },
  agent1: { agent: true },
  agent2: { agent: true },
  user1: {},
  user2: {},
}.each do |name, attrs|
  User.create_with(name: name, password: 'password', **attrs).find_or_create_by(email: "#{name}@example.com")
end
