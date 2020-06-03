FactoryBot.define do
  factory :user do
    firstname { 'Jane' }
    lastname { 'Doe' }
    email { 'jane.doe@gmail.com' }
    password { '123456' }
  end

  factory :studio do
    city { 'Seattle' }
    address { 'Heaven Street 7 - 11' }
  end

  factory :body_treatment do
    name { 'Full Body Massage' }
    category { 'Massage' }
    description { 'Full body massage by specialist' }
  end

  factory :duration do
  end

  factory :location do
  end

  factory :appointment do
  end
end
