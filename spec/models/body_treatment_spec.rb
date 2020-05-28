require 'rails_helper'

RSpec.describe 'BodyTreatment', type: :model do
  it 'gets created with valid params' do
    expect do
      BodyTreatment.create(name: 'Treatment name', category: 'Treatment category', description: 'Treatment descrption')
    end.to change(BodyTreatment.all, :count).by(1)
  end

  it 'gets not created with blank name' do
    expect do
      BodyTreatment.create(name: '', category: 'Treatment category', description: 'Treatment descrption')
    end.to change(BodyTreatment.all, :count).by(0)
  end

  it 'gets not created with blank category' do
    expect do
      BodyTreatment.create(name: 'Treatment name', category: '', description: 'Treatment descrption')
    end.to change(BodyTreatment.all, :count).by(0)
  end

  it 'gets not created with blank treatment descrption' do
    expect do
      BodyTreatment.create(name: 'Treatment name', category: 'Treatment category', description: '')
    end.to change(BodyTreatment.all, :count).by(0)
  end
end
