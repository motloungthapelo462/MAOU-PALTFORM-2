Vercel Deployment Guide for MAOU Web

1) Import the repository
- Go to https://vercel.com/new
- Select "Import Git Repository" and pick motloungthapelo462/MAOU-PALTFORM-2 (branch: main)
- Root directory: set to `maouweb` when prompted (this repo contains a mono root)

2) Environment variables to add (Project Settings → Environment Variables)
- MAOU_REAL_ADMIN_EMAIL -> your admin email
- MAOU_REAL_ADMIN_PASSWORD -> a strong password
- SENDGRID_API_KEY -> (optional) your SendGrid API key
- SENDGRID_FROM -> optional from address (default no-reply@maou.app)
- SMTP_HOST -> (optional) SMTP host if not using SendGrid
- SMTP_PORT -> SMTP port (e.g. 587)
- SMTP_USER -> SMTP username
- SMTP_PASS -> SMTP password
- SMTP_FROM -> SMTP from address
- NODE_ENV -> production

3) Build & Output Settings
- Framework Preset: `Next.js`
- Root Directory: `maouweb`
- Build Command: `npm run build`
- Output Directory: leave default (Vercel will detect)

4) Notes & Best Practices
- Do NOT store real secrets in the repo. Use Vercel's environment variables for production secrets.
- Set `MAOU_REAL_ADMIN_EMAIL` and `MAOU_REAL_ADMIN_PASSWORD` to the real admin credentials — these are used server-side only.
- For OTP emails: prefer `SENDGRID_API_KEY`. If absent, set SMTP_* vars.
- Test admin login flow in a staging deployment: use a non-critical admin email to verify OTP delivery.
- Monitor logs (Vercel dashboard) for mailer errors; the app logs send failures to the server console.

5) After Deploy
- Visit your project URL, try `/admin/login` and follow the OTP flow for a `real` admin.
- If you need to rotate admin creds, update env vars in Vercel and redeploy.

6) Optional
- Add a secrets manager or database for persistent admin/user storage for production-grade security.
