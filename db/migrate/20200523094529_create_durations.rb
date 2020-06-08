# frozen_string_literal: true

class CreateDurations < ActiveRecord::Migration[6.0]
  def change
    create_table :durations do |t|
      t.integer :body_treatment_id
      t.integer :duration
      t.decimal :price

      t.timestamps
    end
  end
end
