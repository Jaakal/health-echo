require 'rails_helper'

RSpec.describe 'Appointment', type: :model do
  before(:all) do
    @user = create(:user)
    @studio = create(:studio)
    @body_treatment = create(:body_treatment)
    @duration = Duration.create(body_treatment_id: @body_treatment.id, duration: 45, price: 25.25)
  end

  it 'gets created with valid params' do
    expect do
      Appointment.create(user_id: @user.id, body_treatment_id: @body_treatment.id,
                         studio_id: @studio.id, duration_id: @duration.id)
    end.to change(Appointment.all, :count).by(1)
  end

  it 'gets not created with invalid User ID' do
    expect do
      Appointment.create(user_id: @user.id + 1, body_treatment_id: @body_treatment.id,
                         studio_id: @studio.id, duration_id: @duration.id)
    end.to change(Appointment.all, :count).by(0)
  end

  it 'gets not created with invalid BodyTreatment ID' do
    expect do
      Appointment.create(user_id: @user.id, body_treatment_id: @body_treatment.id + 1,
                         studio_id: @studio.id, duration_id: @duration.id)
    end.to change(Appointment.all, :count).by(0)
  end

  it 'gets not created with invalid Studio ID' do
    expect do
      Appointment.create(user_id: @user.id, body_treatment_id: @body_treatment.id,
                         studio_id: @studio.id + 1, duration_id: @duration.id)
    end.to change(Appointment.all, :count).by(0)
  end

  it 'gets not created with invalid Duration ID' do
    expect do
      Appointment.create(user_id: @user.id, body_treatment_id: @body_treatment.id,
                         studio_id: @studio.id, duration_id: @duration.id + 1)
    end.to change(Appointment.all, :count).by(0)
  end
end
