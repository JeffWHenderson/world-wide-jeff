Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :posts, only: [:index, :create]
    resources :profiles, only: [:index, :show, :update], param: :username
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"
    get "me", to: "sessions#me"
  end
end
