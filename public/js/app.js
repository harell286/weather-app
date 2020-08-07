const form = $('form');

const button = form.find('button');
const input = form.find('input');

button.on('click', function(e) {
	e.preventDefault();

	if (input.val()) {
		$(this).attr('disabled', true);

		fetch('http://localhost:3000/weather?address='+input.val()).then((response) => {
			
			const p = $(this).siblings().closest('p');
			
			response.json().then(({ error = "", address = "", forecast = "", location = "" }) => {
				if (error) {
					p.text(error);
				} else {
					p.text(forecast);
				}

				$(this).attr('disabled', false);
			})
		});
	}

});