FactoryGirl.define do
  factory :comment do
    ticket
    user { ticket.user }
    sequence(:content) { |i| "Comment content #{i}" }
  end
end
