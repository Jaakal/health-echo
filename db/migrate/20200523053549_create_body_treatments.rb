# frozen_string_literal: true

class CreateBodyTreatments < ActiveRecord::Migration[6.0]
  def change
    create_table :body_treatments do |t|
      t.string :name
      t.string :category
      t.text :description
      t.integer :duration
      t.decimal :price

      t.timestamps
    end
  end
end
