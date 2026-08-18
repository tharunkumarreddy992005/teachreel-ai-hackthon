# Security Policy - TechReel AI

## Overview
TechReel AI employs a multi-layered security and privacy model designed to protect user telemetry, recommendation inference vectors, and underlying database resources.

## 1. Supported Versions
| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## 2. Secrets Management & Zero-Hardcoded Credentials
- **Environment Variables**: All database credentials (including MongoDB Atlas URIs, usernames, and passwords) and AI API keys are strictly loaded via process environment variables (`.env`).
- **No Git Leaks**: `.env` and `.env.local` files are strictly enforced in `.gitignore` and excluded from repository commits.
- **Sanitized Examples**: `.env.example` contains only generalized placeholders (`<db_username>`, `<db_password>`, `<cluster-url>`).

## 3. Network & Transport Security
- **Strict HTTPS / TLS 1.3**: Production endpoints enforce SSL/TLS encryption in transit.
- **HTTP Security Headers**:
  - `Content-Security-Policy`: Protects against cross-site scripting and unauthorized frame injection.
  - `X-Content-Type-Options: nosniff`: Prevents MIME-sniffing attacks.
  - `X-Frame-Options: DENY`: Protects against clickjacking.
  - `Strict-Transport-Security`: Enforces 2-year HSTS with preload.
  - `Referrer-Policy: strict-origin-when-cross-origin`: Minimizes referrer leakage.

## 4. Input Sanitization & Hype Shield Defense
- **Pydantic Validation**: All API request schemas enforce strong typing, field length bounds, and sanitization before data ingestion.
- **Hype Shield Detection**: Real-time algorithmic analysis scans incoming short-form video metadata for deceptive clickbait, unrealistic compensation promises, and unverified pedagogical claims.

## 5. Reporting a Vulnerability
If you discover a potential security issue or vulnerability, please notify the security team by filing a private issue or contacting `kt760133@gmail.com`. Valid reports will be acknowledged within 24 hours.
