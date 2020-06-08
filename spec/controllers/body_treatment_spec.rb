require 'rails_helper'

RSpec.describe BodyTreatmentController, type: :controller do
  before(:all) do
    @user = create(:user)
    @user_logged_in = create(:user, email: 'jane.doe2@gmail.com', token: SecureRandom.hex(16))
    body_treatment = create(:body_treatment)
    create(:duration, body_treatment_id: body_treatment.id, duration: 30, price: 23)
    studio = create(:studio)
    create(:location, body_treatment_id: body_treatment.id, studio_id: studio.id)
  end

  describe 'INDEX action' do
    it 'it returns all the body treatments when user logged in' do
      post :index, params: { user: { token: @user_logged_in.token } }
      expect(JSON.parse(response.body)['services'].length).to eq(1)
    end

    it 'it returns user loggedIn false when user is not logged in' do
      post :index, params: { user: { token: '' } }
      expect(JSON.parse(response.body)['loggedIn']).to be(false)
    end
  end
end
