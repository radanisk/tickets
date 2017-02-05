class Comment < ApplicationRecord
  belongs_to :ticket
  belongs_to :user

  validates :content, presence: true, length: {maximum: 65_535, allow_blank: true}
end
