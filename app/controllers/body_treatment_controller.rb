class BodyTreatmentController < ApplicationController
  # rubocop:disable Metrics/BlockLength
  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/PerceivedComplexity
  # rubocop:disable Metrics/BlockNesting
  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Layout/LineLength
  def index
    user = User.find_by(token: valid_user_params[:token])
    data = {}

    if user
      treatments_query = BodyTreatment.select(:name, :category, :description, :city, :address, :duration, :price)
        .joins(:studios, :durations).all.order(:name, :city, :address, :duration)
      services = {}

      treatments_query.each do |service|
        if services[service['name']]
          if services[service['name']]['city'][service['city']]
            if services[service['name']]['city'][service['city']]['address'][service['address']]
              services[service['name']]['city'][service['city']]['address'][service['address']]['duration'][service['duration']] =
                { 'price' => service['price'] }
            else
              duration_hash = { service['duration'] => { 'price' => service['price'] } }
              services[service['name']]['city'][service['city']]['address'][service['address']] =
                { 'duration' => duration_hash }
            end
          else
            address_hash = {}
            duration_hash = {}

            duration_hash[service['duration']] = { 'price' => service['price'] }
            address_hash[service['address']] = { 'duration' => duration_hash }
            city_hash = { 'address' => address_hash }

            services[service['name']]['city'][service['city']] = city_hash
          end
        else
          service_hash = {}
          city_hash = {}
          address_hash = {}
          duration_hash = {}

          service_hash['category'] = service['category']
          service_hash['description'] = service['description']

          duration_hash[service['duration']] = { 'price' => service['price'] }
          address_hash[service['address']] = { 'duration' => duration_hash }
          city_hash[service['city']] = { 'address' => address_hash }
          service_hash['city'] = city_hash

          services[service['name']] = service_hash
        end
      end
      services_array = []

      services.each do |key, value|
        value['name'] = key
        services_array.push(value)
      end

      data['services'] = services_array
      data['services_query'] = treatments_query
      data['loggedIn'] = true
    else
      data['loggedIn'] = false
    end

    render json: data
  end
  # rubocop:enable Metrics/BlockLength
  # rubocop:enable Metrics/AbcSize
  # rubocop:enable Metrics/PerceivedComplexity
  # rubocop:enable Metrics/BlockNesting
  # rubocop:enable Metrics/MethodLength
  # rubocop:enable Layout/LineLength

  private

  def valid_user_params
    params.require(:user).permit(:token)
  end
end
