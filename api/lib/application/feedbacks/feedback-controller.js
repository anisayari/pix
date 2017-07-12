const Boom = require('boom');
const _ = require('../../infrastructure/utils/lodash-utils');
const serializer = require('../../infrastructure/serializers/jsonapi/feedback-serializer');

const logger = require('../../infrastructure/logger');

module.exports = {

  save(request, reply) {

    const newFeedback = serializer.deserialize(request.payload);

    if (_.isBlank(newFeedback.get('content'))) {
      return reply(Boom.badRequest('Feedback content must not be blank'));
    }

    newFeedback
      .save()
      .then(persistedFeedback => reply(serializer.serialize(persistedFeedback)).code(201))
      .catch((err) => {
        logger.error(err);
        reply(Boom.badImplementation(err));
      });
  }

};

