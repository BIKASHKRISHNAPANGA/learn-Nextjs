import * as React from 'react';

interface EmailTemplateProps {
  username: string;
}

 const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
  </div>
);

export default EmailTemplate;