class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :display_name, presence: true

  def generate_token!
    update!(auth_token: SecureRandom.hex(32))
    auth_token
  end

  def clear_token!
    update_column(:auth_token, nil)
  end

  def serialize
    {
      username: username,
      displayName: display_name,
      bio: bio || "",
      topFriends: top_friends || [],
      customStyle: custom_style || {}
    }
  end
end
