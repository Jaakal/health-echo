require 'rails_helper'

RSpec.describe StudioController, type: :controller do
  before(:all) do
    @user = create(:user)
    @user_logged_in = create(:user, email: 'jane.doe2@gmail.com', token: SecureRandom.hex(16))
    create(:studio)
  end

  describe 'INDEX action' do
    it 'it returns all the studios when user logged in' do
      post :index, params: { user: { token: @user_logged_in.token } }
      expect(JSON.parse(response.body)['studios'].length).to eq(1)
    end

    it 'it returns user loggedIn false when user is not logged in' do
      post :index, params: { user: { token: '' } }
      expect(JSON.parse(response.body)['loggedIn']).to be(false)
    end
  end
end
