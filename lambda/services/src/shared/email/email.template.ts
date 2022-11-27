export const EmailTemplates = {
    REGISTER_EMAIL: {
        subject: 'Welcome to Carbon Credit Registry',
        html: `
        Hi {{name}},<br><br>

        Welcome to Carbon Credit Registry - {{countryName}}. <br>Your account has been created. 
        <br>You can access using your temporary password: {{password}}
        {{apiKeyText}}
        <br><br>
        Sincerely,<br>
        The Carbon Credit Registry Team 
    `,
        text: ''
    },
    API_KEY_EMAIL: {
        subject: 'Carbon Credit Registry API Key Generation',
        html: `
        Hi {{name}},<br><br>

        You carbon registry account api key regenerated  - {{apiKey}}.
        <br><br>
        Sincerely,<br>
        The Carbon Credit Registry Team 
    `,
        text: ''
    }
};
