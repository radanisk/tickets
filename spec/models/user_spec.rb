require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#valid?' do
    subject { -> { instance.valid? } }
    let(:instance) { build(:user) }
    its(:call) { should eq true }

    context 'when password is blank' do
      let(:instance) { build(:user, password: '') }
      it { should change { instance.errors[:password] }.from([]) }

      context 'for persisted record' do
        let(:instance) { create(:user).tap { |x| x.password = '' } }
        its(:call) { should eq true }
      end
    end

    context "when password_confirmation doesn't match" do
      before { instance.password_confirmation = 'invalid' }
      it { should change { instance.errors[:password_confirmation] }.from([]) }
    end

    context 'when email is already used' do
      before { create(:user, email: instance.email) }
      it { should change { instance.errors[:email] }.from([]) }
    end

    context 'when email is invalid' do
      before { instance.email = 'my_mail' }
      it { should change { instance.errors[:email] }.from([]) }
    end

    context 'when email is too long' do
      before { instance.email = 'a' * (255 + 1) }
      it { should change { instance.errors[:email] }.from([]) }
    end

    context 'when name is blank' do
      before { instance.name = ' ' }
      it { should change { instance.errors[:name] }.from([]) }
    end

    context 'when name is too long' do
      before { instance.name = 'a' * (255 + 1) }
      it { should change { instance.errors[:name] }.from([]) }
    end
  end
end
