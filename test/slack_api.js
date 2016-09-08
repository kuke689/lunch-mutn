const should = require('should');
const Botkit = require('botkit');

require('dotenv').load({silent: true});
const token = process.env.TOKEN;

describe('Prerequisites', () => {
  it('should have a token', done => {
    should.exist(token);
    done();
  });

  it('should have Botkit instance', done => {
    should.exist(Botkit);
    should.exist(Botkit.core);
    should.exist(Botkit.slackbot);
    done();
  });
});

describe('Botkit', () => {
  it('should start and then stop', done => {
    const controller = Botkit.slackbot({debug: false});
    let openIsCalled = false;

    controller.on('rtm_open', bot => {
      should.exist(bot);
      openIsCalled = true;
    });

    controller.on('rtm_close', bot => {
      should.exist(bot);
      openIsCalled.should.be.true;
      controller.shutdown();
      done();
    });

    controller.spawn({token})
      .startRTM((err, bot) => {
        (err === null).should.be.true;
        should.exist(bot);
        bot.closeRTM();
      });
  });

  it('should have fail with false token', function(done) {
    const controller = Botkit.slackbot({debug: false});

    controller.spawn({token: '1234'})
      .startRTM(err => {
        should.exist(err);
        controller.shutdown();
        done();
      });
  });
});
