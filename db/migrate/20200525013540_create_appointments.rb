class CreateAppointments < ActiveRecord::Migration[6.0]
  def change
    create_table :appointments do |t|
      t.integer :user_id
      t.integer :body_treatment_id
      t.integer :studio_id
      t.integer :duration_id
      t.date :date

      t.timestamps
    end
  end
end
