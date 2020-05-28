Rails.application.routes.draw do
  get 'user/new'
  post 'user/index'
  post 'user/create'
  post 'user/login'
  post 'user/logout'
  post 'appointment/index'
  post 'appointment/create'
  post 'studio/index'
  post 'body_treatment/index'
  root 'user#new'
end
