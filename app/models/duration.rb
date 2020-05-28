class Duration < ApplicationRecord
  belongs_to :body_treatment, foreign_key: :body_treatment_id, class_name: 'BodyTreatment'

  validates :duration, presence: true
  validates :price, presence: true
end
