$(document).ready(function() {
	// alert message
	var alert_msg = ("How ForgetfulChat works:\n"
		+ " - messages can be signed with any name\n"
		+ " - messages are sent to everyone else in the room\n"
		+ " - messages are never saved in a database\n"
		+ " - when the page is refreshed, old messages are erased.")

	alert(alert_msg);

	// receiving messages via Pusher
	var pusher = new Pusher('40c26a378a9aa58a1bc6');
	var channel = pusher.subscribe("chat_channel");

	channel.bind('chat_event', function(chat) {
		var msg = chat.message;
		var $msg = $("<div class='msg'></div>").text(msg);
		var auth = chat.author;
		var $auth = $("<span class='auth'></span>").text(auth + ":");

		var $li = $("<li></li>");
		$li.append($auth).append($("<br>")).append($msg);

		var $chatList = $("#chat-list");
		$chatList.append($li);

		// auto-scroll to bottom
		var $chatWindow = $("#chat-window");
		// $chatWindow.scrollTop($chatWindow.prop("scrollHeight"));
		$chatWindow.animate(
			{scrollTop: $chatWindow.prop("scrollHeight")},
			500
		);
	});

	// submitting messages
	var $chatForm = $("#chat-form");
	var $textarea = $("textarea");

	$chatForm.submit(function(event) {
		event.preventDefault();

		if ($textarea.val() === "") {
			return
		}

		$.ajax({
			url: $chatForm.attr("action"),
			type: "POST",
			data: $chatForm.serialize(),
			dataType: "json",
			success: function() {
				$textarea.val("");
			}
		});
	});
});