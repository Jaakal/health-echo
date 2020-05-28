require 'rails_helper'

RSpec.describe 'Location', type: :model do
  it 'gets created with valid params' do
    studio = create(:studio)
    body_treatment = create(:body_treatment)
    expect do
      Location.create(body_treatment_id: body_treatment.id, studio_id: studio.id)
    end.to change(Location.all, :count).by(1)
  end

  it 'gets not created with invalid BodyTreatment ID' do
    studio = create(:studio)
    body_treatment = create(:body_treatment)
    expect do
      Location.create(body_treatment_id: body_treatment.id + 1, studio_id: studio.id)
    end.to change(Location.all, :count).by(0)
  end

  it 'gets not created with Studio ID' do
    studio = create(:studio)
    body_treatment = create(:body_treatment)
    expect do
      Location.create(body_treatment_id: body_treatment.id, studio_id: studio.id + 1)
    end.to change(Location.all, :count).by(0)
  end
end
