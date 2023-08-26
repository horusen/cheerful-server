<h1 align="center">Cheerful</h1>

<p align="center">
  <strong>Recognition and Rewards Platform</strong>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
  </a>
</p>

<p align="center">
  Cheerful is a web platform enabling easy recognition and rewards for outstanding contributions through a point-system which can be exchanged for goods or services from local merchants.
</p>

## :rocket: Tech Stack

- **Frontend**: Angular 2, SCSS, Bootstrap 5, Fontawesome
- **Backend**: NestJS
- **Database**: MySQL, TypeORM - <a href="https://dbdiagram.io/d/64bfbd7602bd1c4a5ea98a93">_See the database modeling here_</a>
- **Email**: Nodemailer
- **SMS**: Twilio
- **Caching**: Redis
- **Cloud Storage**: Amazon S3
- **Deployment**: Heroku

## :sparkles: Features

- **Point Management**: Load, send, and track points.
- **Digital Gift Cards**: Exchange points for digital gift cards.
- **Merchant Integration**: Local merchants offer gift cards.
- **Secure Authentication**: User data protected with JWT authentication.
- **Real-time Updates**: Stay updated with real-time point changes using Redis.
- **Admin Interface**: Manage business admin and merchant activities.
- **Email Invitations**: Invite individuals via email to register.
- **CSV Bulk Import**: Add connections in bulk via CSV.
- **Product Catalog**: Merchants can upload and manage their products.
- **Gift Card Generation**: Secure and unique gift card codes.
- **Redemption Tracking**: Merchants validate gift card redemptions.

## :zap: Getting Started

1. Clone this repository.
2. Clone also the frontend repo called **cheerful-client** and follow the instructions
3. Install dependencies with `npm install`.
4. Set up environment variables for database, Redis, Amazon S3, and JWT secret as specified in the .env-example file.
5. Run backend: `npm run start:dev`.

## :bulb: Usage

### Business Admin

1. Register as a business admin from the landing page.
2. Complete registration and provide business information.
3. Invite individuals via email or username.
4. Load points and transfer them to individuals.
5. Access the dashboard and manage redemptions.

### Individuals

1. Register using an invitation via email.
2. Load points securely using Stripe or Paystack.
3. Send and receive points from connections.
4. Explore the marketplace and exchange points for gift cards.

### Merchant

1. Register as a merchant from the landing page.
2. Complete registration and set up your store.
3. Upload your product catalog to the platform.
4. Validate and track gift card redemptions.

## :octocat: Contributing

Contributions are welcome! Open issues and pull requests.

## :scroll: License

This project is licensed under the MIT License.

## :lock: Security

- Authentication: JWT ensures secure user authentication.
- Authorization: NEST JS guards handle access control.
- Gift Card Codes: SHA256 algorithm and secret key ensure code uniqueness.
- Security Scans: Regular AWS CodeWhisperer scans ensure code integrity.
