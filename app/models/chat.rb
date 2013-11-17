class Chat
	attr_accessor :author, :message

	def initialize(author, message)
		@author = author
		@message = message
	end
end