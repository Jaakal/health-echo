class AppointmentController < ApplicationController
  def index
    user = User.find_by(token: valid_user_params[:token])
    data = {}

    if user
      appointments = Appointment.select(:name, :category, :description, :city, :address, :date, :duration, :price)
        .joins(:user, :body_treatment, :studio, :duration).where(user_id: user.id).order(:date)
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

      data['appointments'] = appointments_array
      data['loggedIn'] = true
    else
      data['loggedIn'] = false
    end

    render json: data
  end

  def create
    user = User.find_by(token: appointment_params[:token])
    data = {}

    if user
      body_treatment = BodyTreatment.find_by(name: appointment_params[:service],
                                             category: appointment_params[:category])
      studio = Studio.find_by(city: appointment_params[:city], address: appointment_params[:address])

      location = Location.find_by(studio_id: studio.id, body_treatment_id: body_treatment.id)
      duration = Duration.find_by(body_treatment_id: body_treatment.id,
                                  duration: appointment_params[:duration])

      if location && duration
        Appointment.create(user_id: user.id, body_treatment_id: body_treatment.id,
                           studio_id: studio.id, duration_id: duration.id, date: appointment_params[:date])
        data['city'] = appointment_params[:city]
        data['address'] = appointment_params[:address]
        data['date'] = appointment_params[:date]
        data['duration'] = appointment_params[:duration]
        data['category'] = appointment_params[:category]
        data['service'] = appointment_params[:service]

        data['appointmentSet'] = true
      end
      data['loggedIn'] = true
    else
      data['loggedIn'] = false
    end

    render json: data
  end

  private

  def valid_user_params
    params.require(:user).permit(:token)
  end

  def appointment_params
    params.require(:user).permit(:token, :city, :address, :date, :duration, :category, :service)
  end
end
