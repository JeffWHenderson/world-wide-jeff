class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :display_name, null: false
      t.text :bio, default: ""
      t.string :top_friends, array: true, default: []
      t.jsonb :custom_style, default: {}
      t.string :password_digest, null: false
      t.string :auth_token

      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :auth_token, unique: true
  end
end
