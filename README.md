# Malikale Safari

## Overview
Malikale Safari is a comprehensive safari booking platform that allows users to explore, book, and review safari packages. The platform integrates secure payment gateways, providing a seamless experience for travelers.

## Features
### Safari Packages
- View available safari packages with detailed descriptions, pricing, and locations.
- Book safaris and manage reservations.
- Leave reviews and ratings for booked safaris.

### Payments Integration
- Secure payment processing using **MPesa** and **PayPal**.
- Payment confirmation and storage of transaction details.
- Handling of successful and failed transactions.

### Contact & Support
- Contact Us form to allow inquiries and feedback, with data stored in the backend.

## Technologies Used
### Frontend
- **React.js** with **Bootstrap** for styling.
- **React Router** for navigation.
- **Axios** for API requests.

### Backend
- **Django REST Framework (DRF)** for API development.
- **Django Channels** for real-time features.
- **SQLite** (default Django database) for data storage.

### DevOps & Deployment
- **CI/CD Pipelines** (To be implemented).
- **AWS/Azure/Google Cloud** (Future hosting plans).
- **ngrok** for local API testing with MPesa callbacks.

## Setup & Installation
### Prerequisites
Ensure you have the following installed:
- **Python 3.9+**
- **pnpm** (for frontend package management)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/mumbi65/malikale-safaris.git
   cd malikale-safaris/backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the database:
   ```bash
   python manage.py migrate
   ```
5. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the React development server:
   ```bash
   pnpm dev
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/safari-packages/` | Fetch all safari packages |
| POST | `/api/bookings/` | Create a new booking |
| POST | `/api/payments/mpesa/` | Initiate MPesa payment |
| POST | `/api/payments/paypal/` | Initiate PayPal payment |
| POST | `/api/contact/` | Submit a contact form |

## Future Enhancements
- Host the platform on a cloud provider.
- Implement real-time notifications for bookings and payments.
- Improve UI/UX for a more interactive user experience.
- Enhance security features (2FA, OAuth integration).

## Contributing
Contributions are welcome! Feel free to fork the repository and create a pull request with improvements.

## Contact
For inquiries or support, reach out via mumbic65@gmail.com or visit the Contact Us page on the website.

---
**Malikale Safari** - Your gateway to unforgettable adventures!

