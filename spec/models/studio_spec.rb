require 'rails_helper'

RSpec.describe 'Studio', type: :model do
  it 'gets created with valid params' do
    expect do
      Studio.create(city: 'Seattle', address: 'Studio1')
    end.to change(Studio.all, :count).by(1)
  end

  it 'gets not created with blank city input' do
    expect do
      Studio.create(city: '', address: 'Studio1')
    end.to change(Studio.all, :count).by(0)
  end

  it 'gets not created with too long city input' do
    expect do
      Studio.create(city: '' * 51, address: 'Studio1')
    end.to change(Studio.all, :count).by(0)
  end

  it 'gets not created with blank address input' do
    expect do
      Studio.create(city: 'Seattle', address: '')
    end.to change(Studio.all, :count).by(0)
  end

  it 'gets not created with too long address input' do
    expect do
      Studio.create(city: 'Seattle', address: 'S' * 201)
    end.to change(Studio.all, :count).by(0)
  end
end
