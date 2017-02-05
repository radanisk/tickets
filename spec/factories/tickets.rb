FactoryGirl.define do
  factory :ticket do
    user
    sequence(:title) { |i| "Ticket #{i}" }
    comment { "First comment content for #{title}" }
  end
end
