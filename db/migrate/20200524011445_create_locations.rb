# frozen_string_literal: true

class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.integer :body_treatment_id
      t.integer :studio_id

      t.timestamps
    end
  end
end
