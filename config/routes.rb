Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'users#new'
  resource :session
  resources :users do
    resource :profile
    resources :posts
    resources :comments, only: [:show, :new, :create, :edit, :destroy]
  end

  resources :posts do
    resource :like, only: [:new, :create, :destroy]
  end

  resources :comments do
    resource :like, only: [:new, :create, :destroy]
  end

  get '/signup' => 'users#new'
  get '/logout' => 'sessions#destroy'
  get '/login' => 'sessions#new'

end
