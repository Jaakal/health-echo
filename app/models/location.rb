class Location < ApplicationRecord
  belongs_to :body_treatment, foreign_key: :body_treatment_id, class_name: 'BodyTreatment'
  belongs_to :studio, foreign_key: :studio_id, class_name: 'Studio'
end
