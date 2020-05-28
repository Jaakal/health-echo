class Studio < ApplicationRecord
  has_many :locations, dependent: :destroy
  has_many :body_treatments, through: :locations

  validates :city, presence: true, length: { maximum: 50 }
  validates :address, presence: true, length: { maximum: 200 }
end
