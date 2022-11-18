
module.exports = async (serverless, options) => [{
    name: 'REGISTER_EMAIL',
    subject: 'Welcome to Carbon Credit Registry',
    html: `
        Hi {{name}},<br><br>

        Welcome to Carbon Credit Registry - {{countryName}}. <br>Your account has been created. You can access using your temporary password: {{password}}
        <br><br>
        Sincerely,<br>
        The Carbon Credit Registry Team 
    `,
    text: '',
}];
