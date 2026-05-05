---
title: "Messaging Policy"
description: "How ViFi-powered businesses obtain SMS consent, what messages are sent, and how to opt out."
effectiveDate: 2026-05-04
---

ViFi LLC ("ViFi") operates an AI voice phone-answering platform. When a consumer calls a small business that uses ViFi, our AI voice agent may offer to send a follow-up SMS with information the consumer requested during the call. This page documents the exact opt-in flow, message content, and consumer rights for that SMS program.

This policy is referenced from our [Privacy Policy](/legal/privacy/) and our [Terms of Service](/legal/terms/), and is provided as the public source-of-truth for SMS opt-in evidence under TCR / CTIA / 10DLC review.

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
