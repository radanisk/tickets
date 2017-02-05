json.comments do
  json.array! comments.includes(:user), partial: 'show', as: :comment
end