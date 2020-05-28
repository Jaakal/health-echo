class BodyTreatment < ApplicationRecord
  has_many :durations, dependent: :destroy
  has_many :locations, dependent: :destroy
  has_many :studios, through: :locations

  validates :name, presence: true
  validates :category, presence: true
  validates :description, presence: true
end
