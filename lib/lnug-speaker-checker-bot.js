var marked = require('marked');
var Joi = require('joi');
var request = require('request');

module.exports = function(schema) {
	/**
	 * @param {Object} issue github issue, see test/issue_valid.json for example
	 */
	return function(issue) {
		var tokens = marked.lexer(issue.body);
		var values = {};
		tokens.forEach(function(token, i) {
			if (token.type === 'list_item_start') {
				var text = tokens[i + 1].text;
				var arr = text.split(':');
				var key = arr[0].toLowerCase();
				arr.shift();
				values[key] = arr.join(':').trim();
			}
		});

		var r = Joi.validate(values, schema);

		if (r.error) {
			var options = {
				uri: issue.comments_url,
				method: 'POST',
				json: {
					"body": r.error.message
				}
			};

			request(options, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(body); // Print the shortened url.
				}
			});
		}

		return r;

	};
};