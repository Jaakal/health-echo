require 'rails_helper'

RSpec.describe 'User', type: :model do
  it 'gets created with valid params' do
    expect do
      User.create(firstname: 'Jon', lastname: 'Doe',
                  email: 'jon.doe@gmail.com', password: '123456')
    end.to change(User.all, :count).by(1)
  end

  it 'gets not created with blank first name' do
    expect do
      User.create(firstname: '', lastname: 'Doe',
                  email: 'jon.doe@gmail.com', password: '123456')
    end.to change(User.all, :count).by(0)
  end

  it 'gets not created with too long first name' do
    expect do
      User.create(firstname: 'J' * 21, lastname: 'Doe',
                  email: 'jon.doe@gmail.com', password: '123456')
    end.to change(User.all, :count).by(0)
  end

  it 'gets not created with blank last name' do
    expect do
      User.create(firstname: 'Jon', lastname: '',
                  email: 'jon.doe@gmail.com', password: '123456')
    end.to change(User.all, :count).by(0)
  end

  it 'gets not created with too long last name' do
    expect do
      User.create(firstname: 'Jon' * 21, lastname: 'D' * 31,
                  email: 'jon.doe@gmail.com', password: '123456')
    end.to change(User.all, :count).by(0)
  end

  it 'gets not created with shorter password than 6 characters' do
    expect do
      User.create(firstname: 'Jon', lastname: 'Doe',
                  email: 'jon.doe@gmail.com', password: '12345')
    end.to change(User.all, :count).by(0)
  end

  it 'gets not created with already existing email' do
    create(:user)
    expect do
      User.create(firstname: 'Jon', lastname: 'Doe',
                  email: 'jane.doe@gmail.com', password: '123456')
    end.to change(User.all, :count).by(0)
  end
end
