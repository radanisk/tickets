Rails.application.routes.draw do
  root to: 'welcome#index'

  namespace 'api', path: 'api', defaults: {format: 'json'} do
    namespace 'v1', path: 'v1' do
      resources :tickets, only: [:index, :create, :show, :update]
    end
  end
end
