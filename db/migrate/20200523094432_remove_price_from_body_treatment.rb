class RemovePriceFromBodyTreatment < ActiveRecord::Migration[6.0]
  def change
    remove_column :body_treatments, :price, :decimal
  end
end
