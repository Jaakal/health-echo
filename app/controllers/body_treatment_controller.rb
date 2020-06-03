class BodyTreatmentController < ApplicationController
  def index
    user = User.find_by(token: valid_user_params[:token])
    data = {}

    if user
      data['services'] = BodyTreatment.body_treatments
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
end
