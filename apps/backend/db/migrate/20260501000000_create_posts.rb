class CreatePosts < ActiveRecord::Migration[8.1]
  def change
    create_table :posts do |t|
      t.string :username, null: false
      t.string :display_name, null: false
      t.string :completion, null: false, limit: 200

      t.timestamps
    end
  end
end
