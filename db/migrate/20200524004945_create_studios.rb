class CreateStudios < ActiveRecord::Migration[6.0]
  def change
    create_table :studios do |t|
      t.string :city
      t.string :address

      t.timestamps
    end
  end
end
