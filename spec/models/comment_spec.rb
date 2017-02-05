require 'rails_helper'

RSpec.describe Comment do
  describe '#valid?' do
    subject { -> { instance.valid? } }
    let(:instance) { build(:comment) }
    its(:call) { should eq true }

    context 'when content is blank' do
      before { instance.content = ' ' }
      it { should change { instance.errors[:content] }.from([]) }
    end

    context 'when content is too long' do
      before { instance.content = 'a' * (65_535 + 1) }
      it { should change { instance.errors[:content] }.from([]) }
    end
  end
end
