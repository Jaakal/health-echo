class UserController < ApplicationController
  def new; end

  def create
    user = User.new(user_params)
    data = {}

    if user.save
      user.update(token: SecureRandom.hex(16))
      data['firstName'] = user.firstname
      data['lastName'] = user.lastname
      data['loggedIn'] = true
      data['token'] = user.token
    else
      data['loggedIn'] = false
    end

    render json: data
  end

  def login
    user = User.find_by_email(login_params[:email])
    data = {}

    if user&.authenticate(login_params[:password])
      user.update(token: SecureRandom.hex(16))
      data['firstName'] = user.firstname
      data['lastName'] = user.lastname
      data['loggedIn'] = true
      data['token'] = user.token
    else
      data['loggedIn'] = false
    end

    render json: data
  end

  def logout
    user = User.find_by(token: logout_params[:token])
    data = { 'loggedIn' => false }

    user&.update(token: nil)

    render json: data
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end

  def logout_params
    params.require(:user).permit(:token)
  end

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password,
                                 :password_confirmation)
  end
end
