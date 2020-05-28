class Appointment < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, class_name: 'User'
  belongs_to :body_treatment, foreign_key: :body_treatment_id, class_name: 'BodyTreatment'
  belongs_to :studio, foreign_key: :studio_id, class_name: 'Studio'
  belongs_to :duration, foreign_key: :duration_id, class_name: 'Duration'
end
