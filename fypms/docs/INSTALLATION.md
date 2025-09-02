# FYPMS Installation Manual

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing FYPMS, ensure you have the following installed:

- Node.js (v18.0.0 or higher)
- Git
- PostgreSQL (v14 or higher)
- Visual Studio Code (recommended)
- Windows Terminal (recommended)

To verify your Node.js installation:
```bash
node --version
npm --version
```

## Local Development Setup

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/fypms.git
cd fypms
```

2. **Install Dependencies**
```bash
npm install
```

## Environment Configuration

1. Create a new `.env` file in the root directory:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/fypms"

# Authentication
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# File Upload (EdgeStore)
EDGE_STORE_ACCESS_KEY="your-edge-store-access-key"
EDGE_STORE_SECRET_KEY="your-edge-store-secret-key"
```

2. Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Database Setup

1. **Install PostgreSQL**
   - Download from [PostgreSQL Official Website](https://www.postgresql.org/download/windows/)
   - Follow the installation wizard
   - Remember your superuser password

2. **Initialize Database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Verify database connection
npx prisma studio
```

## Running the Application

1. **Development Mode**
```bash
npm run dev
```
Access the application at `http://localhost:3000`

2. **Production Build**
```bash
npm run build
npm start
```

## Deployment

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy to Vercel**
```bash
vercel login
vercel
```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Navigate to Project Settings
   - Add Environment Variables:
     - `DATABASE_URL`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`
     - `EDGE_STORE_ACCESS_KEY`
     - `EDGE_STORE_SECRET_KEY`

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
```bash
# Reset database
npx prisma migrate reset

# Verify connection
npx prisma db pull
```

2. **Build Errors**
```bash
# Clear Next.js cache
rd /s /q .next
npm run build
```

3. **Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
del /f /q node_modules
del /f /q package-lock.json
npm install
```

### Verification Steps

1. **Check System Status**
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check PostgreSQL
psql --version
```

2. **Verify Database Connection**
```bash
npx prisma studio
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Vercel Deployment Documentation](https://vercel.com/docs)

## Support

If you encounter any issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/yourusername/fypms/issues)
2. Contact the development team
3. Refer to the technical documentation

---

**Note**: Replace placeholder values (like `yourusername`, `your-generated-secret`) with actual values for your installation.

Last Updated: August 13, 2025