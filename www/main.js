(function() {
	var editor = ace.edit("code");
	editor.setTheme("ace/theme/tomorrow_night_eighties");
	editor.session.setMode("ace/mode/golang");
	editor.focus();

	$("#code").on("keypress", function(e) {
		var meta = e.metaKey || e.ctrlKey;
		var enterKey = (e.keyCode || e.which);
		var enter = enterKey === 10 || enterKey === 13;
		if (meta && enter) {
			$("#output").html("");
			$("#output").append("<p class='ide'>Executing...</p>");
			$.ajax({
				url: '/api/run',
				method: 'POST',
				data: {
					code: editor.getValue()
				},
				success: function(data) {
          var output = data.replace(/\n/g, '<br/>');
          var className = 'msg';
          if (output.match(/main\.go:/i) != null) {
            className = 'msg-err';
          }
					$("#output").html('<p class="' + className + '">' + output + '</p>');			
				}
			});
		}
	});

})();
