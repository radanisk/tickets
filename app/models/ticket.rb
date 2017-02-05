class Ticket < ApplicationRecord
  attr_accessor :comment

  belongs_to :user
  belongs_to :agent, class_name: :User, required: false
  has_many :comments

  validates :title, presence: true, length: { maximum: 255 }
  validates :status, inclusion: { in: %w(open closed), message: '%{value} is not a valid status' }
  validates :comment, presence: true, on: :create

  before_validation :build_first_comment, on: :create

  def build_first_comment
    return unless comment.present? && user
    comments.new(content: comment, user: user)
  end
end
