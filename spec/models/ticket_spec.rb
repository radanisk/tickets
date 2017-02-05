require 'rails_helper'

RSpec.describe Ticket, type: :model do
  describe '#valid?' do
    subject { -> { instance.valid? } }
    let(:instance) { build(:ticket) }
    its(:call) { should eq true }

    context 'when title is blank' do
      before { instance.title = ' ' }
      it { should change { instance.errors[:title] }.from([]) }
    end

    context 'when title is too long' do
      before { instance.title = 'a' * (255 + 1) }
      it { should change { instance.errors[:title] }.from([]) }
    end

    context 'when comment is empty' do
      before { instance.comment = '' }
      it { should change { instance.errors[:comment] }.from([]) }
    end
  end

  describe '#save!' do
    subject { -> { instance.save! } }
    let(:instance) { build(:ticket) }

    it 'creates first comment' do
      should change(instance.comments, :count).by(1)
      comment = instance.comments.first
      expect(comment.content).to eq instance.comment
      expect(comment.user).to eq instance.user
    end

    context 'when updating with comment' do
      # clean instance
      let(:instance) { described_class.find(create(:ticket).id) }
      before { instance.comment = 'new' }
      it { should_not change(instance.comments, :count) }
    end
  end
end
