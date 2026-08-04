---
title: "SMS Opt-In Evidence"
description: "Public, text-first documentation of the exact opt-in flow for the ViFi A2P 10DLC Campaign. Provided for DCA / TCR / Twilio reviewers."
effectiveDate: 2026-05-10
---

This page is provided as public reviewer evidence for ViFi LLC's A2P 10DLC Campaign with The Campaign Registry. It documents the **exact** opt-in flow in plain HTML text so that DCA reviewers, automated scanners, and Twilio compliance staff can verify the consent collection mechanism without access to ViFi's production system.

For the broader messaging policy that covers both this customer-facing A2P channel and the separate platform-toll-free channel, see the [ViFi Messaging Policy](/legal/messaging-policy/).

## Sender and Brand

- **Registered Brand:** ViFi LLC
- **Registered with:** The Campaign Registry (Standard Brand, APPROVED)
- **Use case:** Low Volume Mixed (transactional follow-up SMS only)
- **Technical sender:** ViFi LLC is the technical sender of every SMS sent under this Campaign. Each message identifies the specific small business the consumer called as transparency context inside the message body, but the message originates from ViFi LLC's infrastructure under ViFi LLC's TCR-registered Brand. The signature pattern used inside the body is **"ViFi for [Business Name]"** (e.g., "ViFi for Acme Pizza:") so the consumer knows both who sent the message (ViFi) and which business the message relates to (the business they called).

## The single opt-in path

This Campaign has exactly ONE opt-in surface. There is no website signup form, no QR code, no in-store paper form, no third-party data source, and no purchased list. End users opt in only after they initiate a phone call to a small business that uses the ViFi voice platform.

## The exact flow, end to end

### Step 1: Consumer initiates an inbound phone call to a participating business

A consumer dials the business directly (the regular published phone number for that business). ViFi never outbound dials. ViFi never solicits opt-in outside of this inbound-call surface.

### Step 2: ViFi's AI voice agent answers and addresses the consumer's question

The agent identifies the business by name, addresses the consumer's question (booking, hours, directions, menu, etc.), and proceeds based on what the consumer requested.

### Step 3: Verbal CTA (the exact script the agent uses)

When SMS follow-up would be helpful, the agent reads one of the following exact scripts. The consumer's verbal response is captured in the call recording and call transcript.

> **Agent (verbal CTA, exact script):** "If it's helpful, I can send you the [booking link / directions / menu / a summary of our call] in one text from ViFi for [Business Name]. The text will come from a ViFi phone number; standard message and data rates may apply. To confirm, you'll reply YES to that text. Would you like me to send it?"

The four item slots are:
1. "the booking link"
2. "the directions"
3. "the menu"
4. "a summary of our call"

These are the ONLY four variants used. Any other phrasing is a configuration bug.

A verbal "yes" on the call is a **request**, not legal SMS consent. Legal SMS consent is granted only at Step 5 when the consumer replies YES to the confirmation SMS by text.

### Step 4: ViFi sends ONE consent-confirmation SMS to the consumer

After the consumer verbally agrees, ViFi sends a single SMS to the consumer's mobile number from ViFi's TCR-registered A2P number. The exact message body is:

> **ViFi for [Business Name]:** you asked us to text you the [Requested Item] from your call. Reply YES to confirm and receive it, or STOP to opt out. Reply HELP for help. Msg & data rates may apply. Frequency: 1 confirmation + 1 content text per call. Terms: https://vifi.us/legal/terms/ Privacy: https://vifi.us/legal/privacy/

The `[Business Name]` slot is filled at send time with the specific business the consumer called. The `[Requested Item]` slot is filled with the item the consumer requested (booking link / directions / menu / call summary).

### Step 5: Consumer replies — the legal consent moment

The consumer's SMS reply determines the outcome:

#### Branch (a) — Consumer replies "YES" (legal consent granted)

ViFi advances the consumer's consent state to **confirmed** for that specific business and that specific request, then sends **one** content SMS containing the requested information. After that one content SMS, the flow is complete. ViFi does NOT send further SMS to the consumer for that business unless the consumer initiates another phone call and requests SMS again.

Example post-YES content SMS bodies (one of these, depending on what was requested):

> **ViFi for [Business Name]:** the booking link you requested from your call: https://acmepizza.example.com/book. Reply HELP for help, STOP to opt out. Msg & data rates may apply.

> **ViFi for [Business Name]:** the directions you requested from your call: [Address with one-line directions]. Reply HELP for help, STOP to opt out. Msg & data rates may apply.

> **ViFi for [Business Name]:** the menu link you requested from your call: https://acmepizza.example.com/menu. Reply HELP for help, STOP to opt out. Msg & data rates may apply.

> **ViFi for [Business Name]:** the summary you requested from your call: [One-sentence summary of the call]. Reply HELP for help, STOP to opt out. Msg & data rates may apply.

#### Branch (b) — Consumer replies "STOP" (or any standard opt-out keyword)

ViFi advances the consumer's consent state to **opted_out** for that business. Twilio Advanced Opt-Out at the Messaging Service level honors the opt-out within seconds. No further SMS is sent to that number for that business. Re-enrollment is **not supported via START** in v1; the consumer would need to contact the business directly to re-engage. Recognized opt-out keywords include: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT.

#### Branch (c) — Consumer does not reply within 24 hours

The pending consent expires automatically. The content SMS the consumer would have received is discarded. The consumer is not contacted further. The next time the consumer calls the business and requests SMS, the double-opt-in flow restarts from the verbal CTA in Step 3.

### Step 6: HELP keyword

At any time, the consumer can reply HELP (or INFO) to a ViFi message. The auto-reply identifies the business, lists the business's contact info, identifies ViFi as the platform sender, and reminds the consumer of STOP availability. The exact HELP auto-reply body:

> **ViFi for [Business Name]:** for [Business Name] support, call [Business Phone] or visit [Business URL]. For ViFi platform support: support@vifi.us. Reply STOP to opt out. Msg & data rates may apply.

## Frequency, scope, and content discipline

For each inbound phone call where the consumer verbally requests SMS follow-up, the consumer receives **at most**:

1. one consent-confirmation SMS (the Step 4 message above), AND
2. one content SMS (only if the consumer replies YES).

That is the entire program. ViFi does not send recurring messages on this Campaign. ViFi does not send marketing, promotional content, third-party offers, or any messages unrelated to the consumer's specific call request. ViFi does not enroll consumers into any subscription, list, or series. Each opt-in is per-call and per-business and expires automatically after the content SMS is delivered (or after 24 hours if YES is not received).

## STOP handling

STOP and equivalent keywords are honored at the Twilio Messaging Service level via Twilio Advanced Opt-Out, typically within five seconds. This applies independently of ViFi's application-layer consent state — a consumer who texts STOP will not receive further SMS regardless of what state ViFi's application records.

## Privacy and Terms

- [ViFi Privacy Policy](/legal/privacy/) — including ViFi's commitment that mobile phone numbers, SMS opt-in data, and SMS consent records are never sold, rented, or shared with third parties or affiliates for their own marketing or promotional purposes.
- [ViFi Terms of Service, Messaging Terms section](/legal/terms/) — frequency, M&D rates, STOP/HELP behavior, prohibited uses.
- [ViFi Messaging Policy](/legal/messaging-policy/) — combined platform + A2P customer-facing policy.

## Visual reference (supporting only — text above is authoritative)

The SMS flow diagram below is provided as a visual aid. The text above is the authoritative description.

![ViFi A2P SMS double opt-in flow diagram](/legal/sms-flow-diagram.svg)

[Direct SVG link for reviewers](/legal/sms-flow-diagram.svg)

## Contact

For reviewer questions about this opt-in flow, contact:

ViFi LLC
139 Brisbane Dr, Acworth, GA 30101
[support@vifi.us](mailto:support@vifi.us) · +1 (678) 232-1627
