# Tickets

Rails + React test app.

**Requirements**

- Ruby
- MySQL
- NodeJS & npm

**Development setup**

1. bundle install && npm i && node client/node_modules/node-sass/scripts/install.js
2. rails db:create && rails db:migrate
3. rails db:seed - if you want 3 predefined users: admin@example.com, agent@example.com, user@example.com with password: password
4. foreman start -f Procfile.dev
