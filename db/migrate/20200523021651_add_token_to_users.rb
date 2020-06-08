# frozen_string_literal: true

class AddTokenToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :token, :string, default: nil
  end
end
