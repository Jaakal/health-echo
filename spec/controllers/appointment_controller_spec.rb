require 'rails_helper'

RSpec.describe AppointmentController, type: :controller do
  before(:all) do
    @user = create(:user)
    @user_logged_in = create(:user, email: 'jane.doe2@gmail.com', token: SecureRandom.hex(16))
    @body_treatment = create(:body_treatment)
    @duration = create(:duration, body_treatment_id: @body_treatment.id, duration: 30, price: 23)
    @studio = create(:studio)
    @location = create(:location, body_treatment_id: @body_treatment.id, studio_id: @studio.id)
    create(:appointment, user_id: @user_logged_in.id, body_treatment_id: @body_treatment.id,
                         studio_id: @studio.id, duration_id: @duration.id, date: '2020-07-02')
  end

  describe 'INDEX action' do
    it 'it returns all the appointments when user logged in' do
      post :index, params: { user: { token: @user_logged_in.token } }
      expect(JSON.parse(response.body)['appointments'].length).to eq(1)
    end

    it 'it returns user loggedIn false when user is not logged in' do
      post :index, params: { user: { token: '' } }
      expect(JSON.parse(response.body)['loggedIn']).to be(false)
    end
  end

  describe 'CREATE action' do
    it 'it creates new appointment when user logged in' do
      post :create, params: { user: { token: @user_logged_in.token, city: @studio.city,
                                      address: @studio.address, date: '2020-07-02', duration: @duration.duration,
                                      category: @body_treatment.category, service: @body_treatment.name } }
      expect(JSON.parse(response.body)['appointmentSet']).to be(true)
    end

    it 'it returns user loggedIn false when user is not logged in' do
      post :create, params: { user: { token: '', city: @studio.city, address: @studio.address,
                                      date: '2020-07-02', duration: @duration.duration,
                                      category: @body_treatment.category, service: @body_treatment.name } }
      expect(JSON.parse(response.body)['loggedIn']).to be(false)
    end
  end
end
