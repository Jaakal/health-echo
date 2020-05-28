class User < ApplicationRecord
  has_many :appointments, dependent: :destroy
  has_many :body_treatments, through: :appointments

  has_secure_password

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze

  before_save :downcase_email

  validates :firstname, presence: true, length: { maximum: 20 }
  validates :lastname, presence: true, length: { maximum: 30 }
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  validates :password, presence: true, length: { minimum: 6 },
                       allow_nil: true

  # Converts email to all lower-case.
  def downcase_email
    email.downcase!
  end
end
