import * as React from 'react';
import { Html, Head, Preview, Body, Container, Text, Heading, Section } from '@react-email/components';

interface EmailTemplateProps {
  username: string;
  otp: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ username, otp }) => (
  <Html>
    <Head />
    <Preview>Your OTP Code</Preview>
    <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
        <Heading style={{ color: '#333' }}>Welcome, {username}!</Heading>
        <Section>
          <Text>Your OTP for verification is:</Text>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>{otp}</Text>
          <Text>Please enter this code to verify your email.</Text>
        </Section>
        <Text style={{ fontSize: '12px', color: '#777' }}>If you didn't request this, please ignore this email.</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;
