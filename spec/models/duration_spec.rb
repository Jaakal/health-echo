require 'rails_helper'

RSpec.describe 'Duration', type: :model do
  it 'gets created with valid params' do
    body_treatment = create(:body_treatment)
    expect do
      Duration.create(body_treatment_id: body_treatment.id, duration: 45, price: 25.25)
    end.to change(Duration.all, :count).by(1)
  end

  it 'gets not created with invalid BodyTreatment ID' do
    body_treatment = create(:body_treatment)
    expect do
      Duration.create(body_treatment_id: body_treatment.id + 1, duration: 45, price: 25.25)
    end.to change(Duration.all, :count).by(0)
  end

  it 'gets not created without duration' do
    body_treatment = create(:body_treatment)
    expect do
      Duration.create(body_treatment_id: body_treatment.id, price: 25.25)
    end.to change(Duration.all, :count).by(0)
  end

  it 'gets not created without price' do
    body_treatment = create(:body_treatment)
    expect do
      Duration.create(body_treatment_id: body_treatment.id, duration: 45)
    end.to change(Duration.all, :count).by(0)
  end
end
