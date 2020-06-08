class AppointmentController < ApplicationController
  def index
    user = User.find_by(token: valid_user_params[:token])
    data = {}

    if user
      data['appointments'] = user.appointments
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
      data['appointmentSet'] =
        user.create_appointment(appointment_params)
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
