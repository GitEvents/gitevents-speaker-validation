var validator = require('../lib/lnug-speaker-checker-bot');
var should = require('chai').should();
var Joi = require('joi');

describe('lnug-speaker-checker-bot', function(){

	before(function() {
		var schema = Joi.object().keys({
			title: Joi.string().required(),
			month: Joi.string().required(),
			twitter: Joi.string().required()
		});

		validator = validator(schema);
	});

    it('should validate a valid markdown message', function(){
		should.equal(validator(require('./issue_valid.json')).error, null);
    });

	it('should not validate a message missing any piece of required info', function(){
		validator(require('./issue_invalid.json')).error.message.should.equal('title is required');
	});

	describe('github commenting', function(){

		it('should create a comment regarding a required info', function(){

		})
	});
});