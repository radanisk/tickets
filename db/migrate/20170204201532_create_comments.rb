class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.belongs_to :ticket, null: false, index: true
      t.belongs_to :user, null: false, index: true
      t.text :content, null: false

      t.timestamps
    end
  end
end
