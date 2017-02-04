json.user do
  json.name current_user.name

  if current_user.admin?
    json.admin true
  elsif current_user.agent?
    json.agent true
  end
end
