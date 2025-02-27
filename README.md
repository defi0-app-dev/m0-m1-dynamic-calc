# Dynamic Calculator

A modern web-based calculator application built with TypeScript and React.

## Features

- Basic arithmetic operations
- Real-time calculation
- Responsive design
- Error handling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
src/
  ├── components/   # React components
  ├── utils/       # Helper functions
  ├── tests/       # Test files
  └── styles/      # CSS styles
```

## Testing

Tests are written using Jest and React Testing Library.

## Deployment

The application is automatically deployed to Vercel through GitHub Actions.

## GitHub Actions Configuration

### Required Secrets

The following secrets need to be configured in your GitHub repository settings:

- `VERCEL_TOKEN`: Your Vercel authentication token
- `ORG_ID`: Your Vercel organization ID
- `PROJECT_ID`: Your Vercel project ID

To obtain these values:
1. Get your Vercel token from your account settings
2. Find your organization ID from the Vercel dashboard
3. Get your project ID from the project settings in Vercel
