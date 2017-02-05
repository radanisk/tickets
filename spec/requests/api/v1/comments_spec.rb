RSpec.describe Api::V1::CommentsController do
  sign_in { user }
  let(:user) { create(:user) }
  let(:ticket) { create(:ticket, user: user) }

  def resource_hash(resource = self.resource)
    resource.as_json(only: [:id, :content])
  end

  def controller_path(**options)
    super(ticket_id: ticket, **options)
  end

  describe '#index' do
    subject { get(controller_path, params: params) && response }
    let(:params) { {} }
    let!(:collection) do
      [ticket.comments.first] + create_list(:comment, 2, ticket: ticket)
    end

    it 'exposes only comments for requested ticket' do
      create(:ticket, user: user).comment
      expect(JSON.parse(subject.body)['comments'].count).to eq(collection.count)
    end

    context 'when user is not signed in' do
      let(:current_user) {}
      it { should be_unauthorized }
    end
  end

  describe '#create' do
    subject { -> { post(controller_path(action: :index), params: params) && response } }
    let(:params) { { comment: { content: 'new comment' } } }

    it 'comment' do
      should change(ticket.comments, :count).by(1)
      comment = ticket.comments.last
      expect(comment.content).to eq params[:comment][:content]
      expect(comment.user).to eq current_user
      expect(JSON.parse(response.body)['comment']).to include resource_hash(comment)
    end

    context 'when user is not signed in' do
      let(:current_user) {}
      its(:call) { should be_unauthorized }
    end
  end
end
