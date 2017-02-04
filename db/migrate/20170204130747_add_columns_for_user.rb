class AddColumnsForUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string, null: false
    add_column :users, :admin, :boolean, null: false, default: false
    add_column :users, :agent, :boolean, null: false, default: false

    add_column :tickets, :user_id, :integer, null: false, index: true
    add_column :tickets, :agent_id, :integer, index: true
  end
end
