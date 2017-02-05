FactoryGirl.define do
  factory :user do
    sequence(:email) { |i| "user#{i}@example.com" }
    sequence(:name) { |i| "User #{i}" }
    password { SecureRandom.hex }
  end
end
