---
title: "Messaging Policy"
description: "How ViFi obtains SMS consent for both account-holder messages and consumer-facing messages, what messages are sent, and how to opt out."
effectiveDate: 2026-05-05
---

ViFi LLC ("ViFi") sends SMS through two strictly separate channels:

1. **Platform messaging** — ViFi → a ViFi account holder (e.g., the business owner who signed up for the ViFi platform). Used for sign-in codes (MFA), account verification, account alerts, and security notifications. Sent over a toll-free number registered to ViFi LLC.
2. **Customer messaging (A2P 10DLC)** — ViFi → an end consumer who initiated a phone call to a ViFi-powered business. Used for transactional follow-up the consumer requested on the call (booking link, directions, menu, call summary). Sent through a per-tenant Messaging Service bound to ViFi's TCR-registered Campaign.

Each channel has its own opt-in moment, consent capture, and disclosure surface, documented below. Both are referenced from our [Privacy Policy](/legal/privacy/) and [Terms of Service](/legal/terms/), and this page is the public source-of-truth for SMS opt-in evidence under TCR / Twilio Toll-Free Verification / CTIA / 10DLC review.

---

## Channel 1: Platform messaging (ViFi → account holders)

### Who receives these messages

Authenticated ViFi account holders only — the people who created an account at vifi.us, completed signup, and added a phone number for security purposes. End consumers who call a ViFi-powered business never receive platform-channel SMS.

### Use cases

- **Two-factor authentication (TWO_FACTOR_AUTHENTICATION)** — sign-in codes during login on a new device or after session expiry
- **Account notifications (ACCOUNT_NOTIFICATIONS)** — phone-number ownership verification at signup, trial-ending reminders, payment failure alerts, subscription renewals, provisioning completion notifications
- **Security alerts (SECURITY_ALERT)** — new sign-in detected from an unrecognized device, password change confirmations, suspicious activity warnings

This channel is **strictly transactional**. ViFi does not send marketing, promotional, third-party, or unsolicited messages on this channel.

### The opt-in moment

The account holder's express SMS consent is captured at the phone-verification step inside the ViFi dashboard (Account → Security → Add phone number). Before the user can request a verification code, the UI displays the following disclosure directly above the **Send code** button:

> By tapping **Send code**, you consent to receive SMS messages from ViFi at this number for sign-in codes, account alerts, and security notifications. Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help.

A render of the disclosure as it appears in the live UI is provided as evidence:

![ViFi platform SMS consent disclosure shown at phone verification](/legal/platform-sms-consent.png)

Direct image URL (for review evidence): [https://vifi.us/legal/platform-sms-consent.png](/legal/platform-sms-consent.png)

The user's tap of **Send code** is the documented consent action. The user record's `phone_verified_at` timestamp captures the moment consent was granted. This consent applies only to the platform-messaging channel — it does not opt the user into any consumer-facing campaign.

### Why opt-in is a service requirement

Two-factor authentication via SMS is a security feature of the ViFi platform. Account holders who add a phone number do so explicitly to enable that feature. Account-state notifications (payment failure, trial ending) and security alerts (new sign-in) are part of the operational surface a business owner expects from a SaaS platform of this category. Opting out of these alerts via STOP is honored, but doing so disables MFA-via-SMS and removes the user from security-alert delivery — which is communicated in the disclosure and at opt-out time.

### Frequency and content scope

Frequency varies based on account state — typically a few messages per month for active accounts (one per sign-in event when MFA is required, occasional notifications, occasional security alerts). The platform does not send recurring promotional content, never markets to the recipient, and never shares the phone number with third parties.

### Sender identification

Every platform-channel message identifies ViFi by name and discloses the message purpose. Example samples:

> ViFi: Your verification code is 438219. This code expires in 10 minutes. Don't share it with anyone.

> ViFi: Your trial ends in 3 days. Upgrade at https://app.vifi.us/billing to keep your AI voice agent active. Reply STOP to opt out.

> ViFi: New sign-in detected from a device in San Francisco, CA. If this wasn't you, secure your account: https://app.vifi.us/security. Reply STOP to opt out of security alerts.

### Opting out

Reply STOP (or any standard opt-out keyword: STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT) to any platform-channel message. Twilio Advanced Opt-Out at the toll-free MS level honors the opt-out within seconds. The user can re-enable platform SMS by going back to Account → Security and re-verifying their phone number, which presents the consent disclosure again. STOP applies only to the platform channel; consumer-channel A2P consent is per-(phone, business) and unaffected.

### Reference number

The toll-free phone number used for platform messaging is owned by ViFi LLC and registered for Twilio Toll-Free Verification (currently in resubmission per TCR ruling).

---

## Channel 2: Customer messaging (consumer → ViFi-powered business)

When a consumer calls a small business that uses ViFi, our AI voice agent may offer to send a follow-up SMS with information the consumer requested during the call. This is the A2P 10DLC channel and operates entirely separately from the platform-messaging channel above.

This policy is the public source-of-truth for the A2P 10DLC opt-in flow as well; reviewers under TCR / CTIA / 10DLC use the sections below as evidence.

## Visual flow diagram

The diagram below shows the full opt-in lifecycle, including the exact verbal CTA, the consent confirmation SMS body, and all three terminal branches (YES, STOP, no-reply).

![ViFi A2P 10DLC SMS double opt-in flow](/legal/sms-flow-diagram.svg)

Direct image URL (for review evidence): [https://vifi.us/legal/sms-flow-diagram.svg](/legal/sms-flow-diagram.svg)

## Who sends the SMS

ViFi LLC is the registered Brand and the technical sender of every SMS sent under this program. Each message identifies the specific business the consumer called as transparency context — for example, "Acme Pizza (via ViFi):" — but the SMS originates from ViFi's TCR-registered Campaign and infrastructure.

ViFi is responsible for compliance, opt-in capture, and consumer rights handling. The participating business is responsible for the accuracy of the content the consumer requested.

## When SMS is offered

SMS is **only** offered during a phone call that the consumer initiated to a ViFi-powered business. ViFi never outbound dials and never sends SMS to consumers who have not first called a participating business. Consumers do not see SMS prompts on web forms, marketing materials, or third-party channels.

## The exact verbal CTA script

When the AI voice agent determines that an SMS follow-up would be helpful (for example, the consumer asked for directions, a booking link, the menu, or a summary of the call), it asks the consumer one of the following, with the specific item named:

- "Want me to text you the booking link?"
- "Want me to text you the directions?"
- "Want me to text you the menu?"
- "Want me to text you a summary of our call?"

The consumer's verbal response is captured in the call recording and transcript. **A verbal yes is treated as a request, not as legal SMS consent.** Legal consent is granted only at the SMS double-opt-in step described below.

## The SMS double opt-in flow

If the consumer verbally agrees on the call, ViFi sends one consent confirmation SMS to the consumer's number:

> [Business Name] (via ViFi): you asked us to text you the [booking link / directions / menu / call summary] during your call. Reply YES to confirm and receive it, or STOP to opt out. Reply HELP for help. Msg & data rates may apply. Frequency: 1 confirmation + 1 content text per call.

The consumer's reply determines what happens next.

### Reply: YES

ViFi advances the consumer's consent state to "confirmed" for that specific business and sends one content SMS containing the requested information. After delivery, the flow is complete. ViFi does not send further SMS to that consumer for that business unless the consumer initiates another phone call and requests SMS again.

Example content SMS:

> Acme Pizza (via ViFi): the booking link you requested during your call: https://acmepizza.example.com/book. Reply HELP for help, STOP to opt out. Msg & data rates may apply.

### Reply: STOP (or STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT)

ViFi advances the consumer's consent state to "opted_out" for that business, honored within seconds via Twilio Advanced Opt-Out at the Messaging Service level. No further SMS is sent to that number for that business. Re-enrollment requires the consumer to contact the business directly; ViFi does not auto-re-opt-in on START or any keyword in v1.

### No reply within 24 hours

The pending consent expires. The agreed-upon content SMS is discarded. The consumer is not contacted further. The next time the consumer calls the business and requests SMS, the double-opt-in flow restarts from the beginning.

## Frequency and content scope

For each inbound phone call where the consumer requests SMS follow-up, the consumer receives at most:

1. One consent confirmation SMS, and
2. One content SMS (only if the consumer replies YES).

ViFi does **not** send recurring messages, marketing, promotional content, third-party offers, or messages unrelated to the consumer's specific call request. Messages contain only the item the consumer requested during their call (booking link, directions, menu, or call summary).

## Help and contact

For questions about the SMS program, the consumer can:

- Reply HELP to any ViFi-sent message — the auto-reply identifies the business and provides their direct contact info plus ViFi platform support
- Email ViFi at <support@vifi.us>
- Contact the business directly using the phone number the consumer originally called

## Consumer rights and data handling

Mobile numbers, opt-in records, and consent state changes are retained by ViFi for compliance and audit purposes. ViFi does **not** sell, rent, or share mobile numbers, SMS opt-in data, or SMS consent records with third parties or affiliates for their own marketing or promotional purposes. See our [Privacy Policy](/legal/privacy/) for the full data-handling description.

Consumers may request deletion of their consent and contact records by emailing <privacy@vifi.us>.

## Carrier compliance and disclaimers

Message and data rates may apply per the consumer's mobile carrier. Carriers are not liable for delayed or undelivered messages. ViFi follows CTIA 10DLC messaging guidelines, the TCR Campaign requirements for the registered use case (Low Volume Mixed), and Twilio's Acceptable Use Policy.

For the underlying terms governing platform use, see our [Terms of Service](/legal/terms/), specifically the **Messaging Terms** and **Customer Compliance Responsibilities** sections.

## Changes to this policy

ViFi may update this Messaging Policy to reflect changes in the platform, regulatory guidance, or carrier requirements. The effective date at the top of this page reflects the most recent version. Material changes that affect the consumer's opt-in scope will be communicated to active consumers via SMS where carrier rules permit.

## Contact

ViFi LLC
139 Brisbane Dr, Acworth, GA 30101
<support@vifi.us>
