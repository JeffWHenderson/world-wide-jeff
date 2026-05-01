class Post < ApplicationRecord
  validates :username, presence: true
  validates :display_name, presence: true
  validates :completion, presence: true, length: { maximum: 200 }
end
