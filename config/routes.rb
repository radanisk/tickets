Rails.application.routes.draw do
  devise_for :users

  namespace 'api', defaults: { format: 'json' } do
    namespace 'v1' do
      resources :tickets, only: [:index, :create, :show, :update] do
        resources :comments, only: [:index, :create, :show]
      end

      resource :profile, only: [:show]
      resource :session, only: [:create, :destroy]
    end
  end



  get '(*path)', to: 'welcome#index'
end
