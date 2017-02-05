class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :omniauthable, :registerable, :recoverable
  devise :database_authenticatable, :rememberable, :trackable, :validatable

  has_many :tickets
  has_many :comments

  validates :name, presence: true, length: { maximum: 255 }

  scope :agent, ->(val = true) { where(agent: val) }
  scope :admin, ->(val = true) { where(admin: val) }

  def password=(val)
    super if val && !val.empty?
  end

  prepend(Module.new do
    def password_confirmation=(val)
      super if val && !val.empty?
    end
  end)
end
