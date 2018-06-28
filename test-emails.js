const TO_ADDRESS = 'YOUR_EMAIL_HERE'
const domain = 'crowdcoinage.com'

const pug = require('pug')
const path = require('path')
const mailgun = require('mailgun-js')({ apiKey: "MAILGUN_KEY_HERE", domain: domain })
const mailcomposer = require('mailcomposer')

let campaign = {
  token_name: "Black.Insure",
  token_symbol: "BLCK"
}

function sendEmail(subject, html) {
  var mail = mailcomposer({
    from: 'testing@crowdcoinage.com',
    to: TO_ADDRESS,
    subject: subject,
    html: html
  })

  mail.build(function(mailBuildError, message) {
    var dataToSend = {
        to: TO_ADDRESS,
        message: message.toString('ascii')
    }

    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
        if (sendError) {
            console.log(sendError);
            return;
        }
    })
  })
}


let templates = path.join(__dirname, 'email-templates', 'account')
let compiledHTML = null

compiledHTML = pug.compileFile(path.join(templates, 'verify-email.pug'))({
  logo: 'demo.crowdcoinage.com/public/images/blck-logo-white.png',
  name: 'tauno.poks@crowdcoinage.com',
  hashLink: 'http://example.net/asd/',
  returnEmail: 'support@crowdcoinage.com',
  campaign: campaign
})
sendEmail('Confirm Signup', compiledHTML)

compiledHTML = pug.compileFile(path.join(templates, 'email-verified.pug'))({
  logo: 'demo.crowdcoinage.com/public/images/blck-logo-white.png',
  name: 'tauno.poks@crowdcoinage.com',
  hashLink: 'http://example.net/asd/',
  returnEmail: 'support@crowdcoinage.com',
  campaign: campaign
})
sendEmail('Thank you, your account has been verified', compiledHTML)

compiledHTML = pug.compileFile(path.join(templates, 'reset-password.pug'))({
  logo: 'demo.crowdcoinage.com/public/images/blck-logo-white.png',
  name: 'tauno.poks@crowdcoinage.com',
  hashLink: 'http://example.net/asd/',
  returnEmail: 'support@crowdcoinage.com',
  campaign: campaign
})
sendEmail('Reset Passowrd', compiledHTML)

compiledHTML = pug.compileFile(path.join(templates, 'password-was-reset.pug'))({
  logo: 'demo.crowdcoinage.com/public/images/blck-logo-white.png',
  name: 'tauno.poks@crowdcoinage.com',
  hashLink: 'http://example.net/asd/',
  returnEmail: 'support@crowdcoinage.com',
  campaign: campaign
})
sendEmail('Your password was reset', compiledHTML)

compiledHTML = pug.compileFile(path.join(templates, 'password-change.pug'))({
  logo: 'demo.crowdcoinage.com/public/images/blck-logo-white.png',
  name: 'tauno.poks@crowdcoinage.com',
  hashLink: 'http://example.net/asd/',
  returnEmail: 'support@crowdcoinage.com',
  campaign: campaign
})
sendEmail('Your password was changed', compiledHTML)

compiledHTML = pug.compileFile(path.join(templates, 'identity-change.pug'))({
  logo: 'demo.crowdcoinage.com/public/images/blck-logo-white.png',
  name: 'tauno.poks@crowdcoinage.com',
  hashLink: 'http://example.net/asd/',
  returnEmail: 'support@crowdcoinage.com',
  campaign: campaign,
  changes: [
    'Enabled two factor authentication',
    'Changed receiving wallet address to 0xc581d6021bebf02667ccb0b177590529db44746a'
  ]
})
sendEmail('Your account was changed. Please verify the changes', compiledHTML)

compiledHTML = pug.compileFile(path.join(templates, 'invitation.pug'))({
  logo: 'demo.crowdcoinage.com/public/images/blck-logo-white.png',
  name: 'tauno.poks@crowdcoinage.com',
  hashLink: 'http://example.net/asd/',
  returnEmail: 'support@crowdcoinage.com',
  campaign: campaign,
  role: 'translator'
})
sendEmail('An invitation has been sent to you', compiledHTML)
