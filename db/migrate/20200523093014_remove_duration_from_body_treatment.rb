# frozen_string_literal: true

class RemoveDurationFromBodyTreatment < ActiveRecord::Migration[6.0]
  def change
    remove_column :body_treatments, :duration, :integer
  end
end
