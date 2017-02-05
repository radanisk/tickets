RSpec.describe WelcomeController do
  describe '#index' do
    subject { get('/') && response }
    it { should be_ok }
  end
end
