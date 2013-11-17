require 'pusher'
Pusher.app_id = '58839'
Pusher.key = '40c26a378a9aa58a1bc6'
Pusher.secret = 'a0028e9106dab19b5ee1'

class ChatsController < ApplicationController
	def create
		author = params[:chat][:author]
		message = params[:chat][:message]

		@chat = Chat.new(author, message)

		Pusher.trigger("chat_channel", "chat_event", @chat.to_json)
		render json: {success: "message received"}
	end

	def show
		render :show
	end
end
