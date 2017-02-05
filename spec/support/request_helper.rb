module SpecHelper
  # Helpers for request specs.
  module RequestGroup
    def self.included(base)
      base.extend ClassMethods
    end

    module ClassMethods
      # Context-level helper to add before filter to sign in user.
      # Adds `current_user` with let if not defined yet or with gven block.
      #
      #     sign_in { owner }
      #     sign_in # will call current_user or define it with nil
      def sign_in(&block)
        if block || !instance_methods.include?(:current_user)
          block ||= ->(*) {}
          let(:current_user, &block)
        end
        before { sign_in(instance_eval { current_user }) }
      end

      # Adds `referer` with `let` and adds it to request.
      def set_referer
        let(:referer) { site_root_url + 'test_referer' }
        before { request.env['HTTP_REFERER'] = referer }
      end

      def with_csrf_protection!
        around do |ex|
          begin
            old = ActionController::Base.allow_forgery_protection
            ActionController::Base.allow_forgery_protection = true
            ex.run
          ensure
            ActionController::Base.allow_forgery_protection = old
          end
        end
      end
    end

    def controller_path(**options)
      url_for(controller: described_class.controller_path, only_path: true, **options)
    end

    def resource_path(resource = self.resource, **options)
      controller_path(action: :show, id: resource, **options)
    end

    def sign_in(user)
      return unless user
      auth_params = {email: user.email, password: user.password}
      post('/api/v1/session', params: {user: auth_params})
    end

    def sign_out
      delete('/api/v1/session')
    end

    RSpec.configuration.include self, type: :request
  end
end
