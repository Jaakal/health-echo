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

  def downcase_email
    email.downcase!
  end

  def appointments
    appointments = Appointment.select(:name, :category, :description, :city, :address, :date, :duration, :price)
      .joins(:user, :body_treatment, :studio, :duration).where(user_id: id).order(:date)
    appointments_array = []

    appointments.each do |appointment|
      appointment_hash = {}
      appointment_hash['name'] = appointment['name']
      appointment_hash['category'] = appointment['category']
      appointment_hash['description'] = appointment['description']
      appointment_hash['city'] = appointment['city']
      appointment_hash['address'] = appointment['address']
      appointment_hash['date'] = appointment['date']
      appointment_hash['duration'] = appointment['duration']
      appointment_hash['price'] = appointment['price']
      appointments_array.push(appointment_hash)
    end

    appointments_array
  end

  def create_appointment(appointment_params)
    body_treatment = BodyTreatment.find_by(name: appointment_params[:service], category: appointment_params[:category])
    studio = Studio.find_by(city: appointment_params[:city], address: appointment_params[:address])

    location = Location.find_by(studio_id: studio.id, body_treatment_id: body_treatment.id)
    duration = Duration.find_by(body_treatment_id: body_treatment.id, duration: appointment_params[:duration])

    if location && duration
      Appointment.create(user_id: id, body_treatment_id: body_treatment.id,
                         studio_id: studio.id, duration_id: duration.id, date: appointment_params[:date])

      return true
    end

    false
  end
end
