ForgetfulChat::Application.routes.draw do
  resource :chat, only: [:create, :show]
  root to: "chats#show"
end
