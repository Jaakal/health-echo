require 'rails_helper'

RSpec.describe UserController, type: :controller do
  before(:all) do
    @user = create(:user)
  end

  describe 'CREATE action' do
    it 'it logs newly created user in on valid user data input' do
      post :create, params: { user: { firstname: 'Jon', lastname: 'Doe',
                                      email: 'jon.doe@gmail.com', password: '123456' } }
      expect(JSON.parse(response.body)['loggedIn']).to be(true)
    end

    it "it doesn't create user with invalid user data input" do
      expect do
        post :create, params: { user: { firstname: '', lastname: 'Doe',
                                        email: 'jon.doe@gmail.com', password: '123456' } }
      end.to change(User.all, :count).by(0)
    end

    it 'it returns data hash loggedIn false with invalid user data input' do
      post :create, params: { user: { firstname: '', lastname: 'Doe',
                                      email: 'jon.doe@gmail.com', password: '123456' } }
      expect(JSON.parse(response.body)['loggedIn']).to be(false)
    end
  end

  describe 'LOGIN action' do
    it 'it logs user in on valid user data input' do
      post :login, params: { user: { email: @user.email, password: @user.password } }
      expect(JSON.parse(response.body)['loggedIn']).to be(true)
    end

    it "it doesn't log user in on invalid user data input" do
      post :login, params: { user: { email: 'jane.do@gmail.com', password: @user.password } }
      expect(JSON.parse(response.body)['loggedIn']).to be(false)
    end
  end

  describe 'LOGOUT action' do
    it 'it logs logged in user out' do
      post :login, params: { user: { email: @user.email, password: @user.password } }
      post :logout, params: { user: { token: JSON.parse(response.body)['token'] } }
      expect(JSON.parse(response.body)['loggedIn']).to be(false)
    end
  end
end
