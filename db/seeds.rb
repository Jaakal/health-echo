# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(firstname: 'Jon', lastname: 'Doe', email: 'jon.doe@gmail.com', password: 'password', password_confirmation: 'password')
User.create(firstname: 'Jane', lastname: 'Doe', email: 'jane.doe@gmail.com', password: 'password', password_confirmation: 'password')
User.create(firstname: 'James', lastname: 'Dark', email: 'j@d.com', password: '123456', password_confirmation: '123456')

BodyTreatment.create(name: 'Swedish Massage', category: 'Massage Therapy', description: "Swedish Massage uses a variety of techniques in order to promote relaxation, ease muscle tension, and promote blood circulation. Swedish Massage is one of the most popular types of massage and is a great starting point if you're new to massage therapy.")
BodyTreatment.create(name: 'Deep Tissue Massage', category: 'Massage Therapy', description: "Deep tissue massage is aimed at the deeper tissue structures of the muscle and fascia. The pressure will generally be more intense. It is a more focused type of massage, as we try to release chronic muscle tension and 'knots'.")
BodyTreatment.create(name: 'Sports Massage', category: 'Massage Therapy', description: "Sports massage is designed for athletes, but can be useful for anyone who has an active lifestyle. Our technique was developed to help athletes prepare their bodies for optimal results during training, event performance, and to aid recovery after an event.")
BodyTreatment.create(name: 'Myopractic', category: 'Massage Therapy', description: "Myopractic® is a massage therapy system using deep muscle therapy and structural integration techniques to achieve deep relaxation and relieve chronic pain. This technique includes deep massage, myofascial release, muscle stretching, and trigger point release.")
BodyTreatment.create(name: 'Therapeutic Massage', category: 'Massage Therapy', description: "Therapeutic massage may be very relaxing, but it employs a combination of advanced techniques that are likely to be used for pain and chronic health issues. Most people coming in for therapeutic types of bodywork come in on a regular basis.")
BodyTreatment.create(name: 'Trigger Point Therapy', category: 'Massage Therapy', description: "Trigger Point Therapy is used to relieve painful nodules in the muscles. Trigger points take a long time to develop and may affect optimal muscle function. This “deeper” therapy can be very soothing and relaxing.")
BodyTreatment.create(name: 'Therapy for Kids', category: 'Massage Therapy', description: "Kids are great candidates for massage. The right combination of techniques can bring great relief from the traumas experienced while growing up. Kids are very active and are constantly having to adjust to a body that is growing and changing. Massage is great for kids!")
BodyTreatment.create(name: 'Prenatal Massage', category: 'Massage Therapy', description: "Our Prenatal Massage was developed to relax tense muscles, relieve swelling, improve circulation, and improve mobility. Our massage is tailored specifically to the needs of pregnant women and their changing bodies. Our technique is most effective after the 3rd month of pregnancy.")
BodyTreatment.create(name: 'Lymphatic Drainage Massage', category: 'Massage Therapy', description: "Lymphatic drainage massage uses a variety of gentle massage strokes in order to aid the movement of lymph through the body, which is very effective for those having issues with swelling, particularly after a surgical procedure. Clients that need lymphatic drainage massage may require multiple visits.")

BodyTreatment.all.each do |service|
  add_on = 1 + rand(10)
  Duration.create(body_treatment_id: service.id, duration: 30, price: 40 + add_on)
  Duration.create(body_treatment_id: service.id, duration: 45, price: 50 + add_on)
  Duration.create(body_treatment_id: service.id, duration: 60, price: 60 + add_on)
end

Studio.create(city: 'New York', address: 'Studio1')
Studio.create(city: 'New York', address: 'Studio4')
Studio.create(city: 'New York', address: 'Studio9')
Studio.create(city: 'Seattle', address: 'Studio2')
Studio.create(city: 'Seattle', address: 'Studio5')
Studio.create(city: 'Seattle', address: 'Studio6')
Studio.create(city: 'Seattle', address: 'Studio8')
Studio.create(city: 'Los Angeles', address: 'Studio3')
Studio.create(city: 'Los Angeles', address: 'Studio7')

Studio.all.each do |studio|
  BodyTreatment.all.each do |service|
    if 1 + rand(10) > 4
      Location.create(body_treatment_id: service.id, studio_id: studio.id)
    end
  end
end