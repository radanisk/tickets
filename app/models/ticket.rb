class Ticket < ApplicationRecord
  validates :title, presence: true, length: { maximum: 255 }
  validates :status, inclusion: { in: %w(open close), message: '%{value} is not a valid status' }
end
