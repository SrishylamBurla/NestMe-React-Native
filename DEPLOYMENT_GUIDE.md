# NestMe Production Deployment Guide

> **Version:** 1.0.0  
> **Environment:** Production  
> **Last Updated:** July 2026

---

# Table of Contents

1. Introduction
2. Production Architecture
3. Prerequisites
4. Environment Variables
5. MongoDB Atlas Setup
6. Cloudinary Setup
7. Firebase Setup
8. Email Configuration
9. Razorpay Configuration
10. Backend Deployment
11. Web Deployment
12. Mobile Application Deployment
13. Android Release
14. iOS Release
15. Domain Configuration
16. SSL Configuration
17. Security Checklist
18. Production Checklist
19. Monitoring
20. Backup Strategy
21. Scaling Strategy
22. Troubleshooting
23. Maintenance
24. Disaster Recovery

---

# 1. Introduction

This document explains how to deploy the complete NestMe platform into a production environment.

Production includes:

- Next.js Web Application
- Backend API
- MongoDB Atlas
- Cloudinary
- Firebase Cloud Messaging
- SMTP Email
- Razorpay
- React Native Mobile Application

---

# 2. Production Architecture

```
                    Internet
                         │
                         ▼
                 https://nestme.in
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
   Next.js Web                  React Native App
          │                             │
          └──────────────┬──────────────┘
                         ▼
                 Backend REST API
                         │
       ┌─────────┬─────────────┬──────────────┐
       ▼         ▼             ▼              ▼
 MongoDB     Cloudinary     Firebase      Razorpay
   Atlas          │            │              │
                  ▼            ▼              ▼
              Property      Push        Payments
               Images   Notifications
```

---

# 3. Prerequisites

Install:

- Node.js LTS
- npm
- Git
- MongoDB Atlas Account
- Firebase Project
- Cloudinary Account
- Razorpay Account
- SMTP Email Account
- Vercel Account

Recommended versions

```
Node.js : 22+

npm : Latest

MongoDB : Atlas

Git : Latest
```

---

# 4. Environment Variables

## Backend (.env)

```env
NODE_ENV=production

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=30d

NEXT_PUBLIC_APP_URL=https://nestme.in

NEXT_PUBLIC_API_URL=https://api.nestme.in

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

SMTP_HOST=

SMTP_PORT=

SMTP_USER=

SMTP_PASS=

FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=
```

---

## Mobile (.env)

```env
API_URL=https://api.nestme.in

GOOGLE_MAPS_API_KEY=

RAZORPAY_KEY_ID=
```

---

# 5. MongoDB Atlas

Create:

```
Cluster

↓

Database User

↓

Whitelist IP

↓

Copy Connection String
```

Example

```
mongodb+srv://username:password@cluster.mongodb.net/nestme
```

Enable

- TLS
- Automatic Backups
- Monitoring
- Alerts

---

# 6. Cloudinary

Create

```
Cloud Name

API Key

API Secret
```

Upload Preset

```
nestme
```

Recommended folders

```
properties/

users/

documents/

support/
```

---

# 7. Firebase

Create project

Download

```
google-services.json

GoogleService-Info.plist
```

Enable

- Cloud Messaging

- Analytics

- Crashlytics (Recommended)

Store Service Account JSON securely.

---

# 8. Email Configuration

Recommended providers

- Gmail SMTP (Development)

- SendGrid

- Amazon SES

- Mailgun

Required

```
SMTP_HOST

SMTP_PORT

SMTP_USER

SMTP_PASS
```

---

# 9. Razorpay

Generate

```
Key ID

Key Secret
```

Configure

```
Webhook URL

Payment Verification

Subscriptions
```

---

# 10. Backend Deployment

Recommended options

- VPS (Ubuntu)
- Render
- Railway
- DigitalOcean
- AWS EC2

Install

```bash
npm install
```

Build

```bash
npm run build
```

Start

```bash
npm start
```

PM2

```bash
pm2 start npm --name nestme-api -- start
```

Enable

```bash
pm2 save

pm2 startup
```

---

# 11. Web Deployment

Recommended

Vercel

Commands

```bash
npm install

npm run build
```

Production

```
https://nestme.in
```

Configure

```
Environment Variables

Custom Domain

SSL

Analytics
```

---

# 12. Mobile Deployment

React Native CLI

Generate

```
Release APK

Release AAB
```

Android

```bash
cd android

./gradlew bundleRelease
```

Output

```
android/app/build/outputs/bundle/release/
```

---

# 13. Android Release

Generate Keystore

```bash
keytool -genkeypair \
-alias nestme \
-keyalg RSA \
-keysize 2048 \
-validity 10000 \
-keystore nestme-release.keystore
```

Configure

```
android/gradle.properties

android/app/build.gradle
```

Build

```bash
./gradlew bundleRelease
```

Upload

Google Play Console

---

# 14. iOS Release

Requirements

- macOS
- Xcode
- Apple Developer Account

Archive

```
Product

↓

Archive

↓

Upload to App Store Connect
```

---

# 15. Domain Configuration

Example

```
Web

https://nestme.in

API

https://api.nestme.in

Admin

https://admin.nestme.in
```

Configure DNS

```
A Record

CNAME

TXT
```

---

# 16. SSL

Recommended

Cloudflare

Let's Encrypt

Enable

```
HTTPS

HTTP/2

TLS 1.3

Automatic Renewal
```

---

# 17. Security Checklist

Authentication

- JWT Secret
- Strong Passwords
- HTTPS Only

Database

- IP Whitelist
- Strong Password
- Backup Enabled

Cloudinary

- Signed Uploads
- Restricted API Keys

Firebase

- Restricted Service Account
- Secure Rules

Server

- Firewall
- SSH Keys
- Disable Root Login

Application

- Input Validation
- Sanitisation
- Rate Limiting
- Secure Headers

---

# 18. Production Checklist

## Backend

- [ ] Environment variables configured
- [ ] MongoDB connected
- [ ] Firebase configured
- [ ] Cloudinary configured
- [ ] SMTP configured
- [ ] Razorpay configured
- [ ] HTTPS enabled
- [ ] Logging enabled

## Web

- [ ] Build successful
- [ ] Domain connected
- [ ] SSL active
- [ ] API reachable

## Mobile

- [ ] Release build generated
- [ ] Firebase working
- [ ] Push notifications tested
- [ ] API connected
- [ ] Google Maps working

---

# 19. Monitoring

Recommended

Server

- PM2

Infrastructure

- UptimeRobot

Database

- MongoDB Atlas Monitoring

Mobile

- Firebase Crashlytics

Analytics

- Google Analytics

Logging

- PM2 Logs

---

# 20. Backup Strategy

Database

Daily

Weekly

Monthly

Cloudinary

Automatic Backup

GitHub

Source Code

Environment Variables

Encrypted Password Manager

---

# 21. Scaling Strategy

Future improvements

- Redis Cache
- Load Balancer
- CDN
- Kubernetes
- Docker
- Elasticsearch
- Background Workers
- Horizontal Scaling

---

# 22. Troubleshooting

## MongoDB Connection Failed

Check

- URI
- Username
- Password
- IP Whitelist

---

## Images Not Uploading

Verify

- Cloudinary Credentials
- Upload Preset
- API Secret

---

## Push Notifications Not Working

Check

- FCM Token
- Firebase Project
- Android Manifest
- Notification Permission

---

## Email Not Sending

Verify

- SMTP Host
- SMTP Port
- Username
- Password

---

## Payments Failing

Verify

- Razorpay Keys
- Webhook
- Signature Verification

---

## Build Fails

Run

```bash
rm -rf node_modules

npm install
```

---

# 23. Maintenance

Weekly

- Review logs
- Check server health
- Monitor storage
- Verify backups

Monthly

- Update dependencies
- Rotate secrets if needed
- Review security settings
- Test disaster recovery

Quarterly

- Audit performance
- Review database indexes
- Remove unused assets
- Security review

---

# 24. Disaster Recovery

In the event of a production failure:

1. Identify the affected service.
2. Review application and infrastructure logs.
3. Restore the latest verified MongoDB backup if data loss has occurred.
4. Redeploy the latest stable application build.
5. Verify API endpoints, authentication, image uploads, notifications, and payments.
6. Monitor the application closely until normal operation is restored.
7. Conduct a post-incident review and document lessons learned.

---

# Recommended Production Stack

| Component | Recommended Service |
|-----------|---------------------|
| Web Application | Vercel |
| Backend API | VPS / Railway / Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |
| Push Notifications | Firebase Cloud Messaging |
| Email | SendGrid or Amazon SES |
| Payments | Razorpay |
| DNS | Cloudflare |
| SSL | Let's Encrypt / Cloudflare |
| Monitoring | UptimeRobot + MongoDB Atlas |
| Logging | PM2 |

---

# Release Workflow

```
Development
      │
      ▼
Feature Testing
      │
      ▼
Code Review
      │
      ▼
Merge to Main
      │
      ▼
Production Build
      │
      ▼
Deploy Backend
      │
      ▼
Deploy Web
      │
      ▼
Deploy Mobile
      │
      ▼
Smoke Testing
      │
      ▼
Production Release
```

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | July 2026 | Initial production deployment guide |

---

# Conclusion

Following this deployment guide will provide a secure, scalable, and maintainable production environment for the NestMe platform. Ensure all production secrets are stored securely, backups are verified regularly, monitoring is enabled, and release procedures are followed consistently to minimise downtime and maintain service reliability.

---

**NestMe Technologies**

**Website:** https://nestme.in

**Support:** customersupport@nestme.in

© 2026 NestMe Technologies. All Rights Reserved.