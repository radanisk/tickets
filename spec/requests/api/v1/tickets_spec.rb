RSpec.describe Api::V1::TicketsController do
  sign_in { user }
  let(:user) { create(:user) }
  let(:resource) { create(:ticket, user: user) }

  def resource_hash(resource = self.resource)
    resource.as_json(only: [:id, :title, :open])
  end

  describe '#index' do
    subject { get(controller_path, params: params) && response }
    let(:params) { {} }
    let!(:collection) do
      create_list(:ticket, items_count, user: user).tap do |list|
        list.first.update!(status: 'closed')
      end
    end
    let(:items_count) { 2 }
    let(:other_resource) { create(:ticket) }

    it 'exposes only own tickets' do
      other_resource
      expect(JSON.parse(subject.body)['tickets'].count).to eq(collection.count)
    end

    context 'when user is not signed in' do
      let(:current_user) {}
      it { should be_unauthorized }
    end
  end

  describe '#create' do
    subject { -> { post(controller_path, params: params) && response } }
    let(:params) { {ticket: {title: 'New title', agent_id: create(:user).id, comment: 'Comment'}} }

    it 'creates ticket' do
      should change(current_user.tickets, :count).by(1)
      ticket = current_user.tickets.last
      expect(ticket.title).to eq params[:ticket][:title]
      expect(ticket.agent).to eq nil
      expect(ticket.comments.size).to eq 1
      comment = ticket.comments.first
      expect(comment.content).to eq params[:ticket][:comment]
      expect(comment.user).to eq current_user
      expect(JSON.parse(response.body)['ticket']).to include resource_hash(ticket)
    end

    context 'when user is not signed in' do
      let(:current_user) {}
      its(:call) { should be_unauthorized }
    end
  end

  describe '#show' do
    subject { get(resource_path) && response }
    # its(:json_body) { should include resource_hash }

    context 'when user is not signed in' do
      let(:current_user) {}
      it { should be_unauthorized }
    end
  end

  describe '#update' do
    subject { -> { patch(resource_path, params: params) && response } }
    let(:params) { {ticket: {status: 'closed', title: 'Net title'}} }
    it { should change { resource.reload.status }.to('closed') }
    it { should_not change { resource.reload.title } }

    context 'for not owner' do
      let(:resource) { create(:ticket) }
      it { should_not change { resource.reload.status } }
    end
  end
end
