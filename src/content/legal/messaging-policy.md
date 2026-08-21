---
title: "Messaging Policy"
description: "How consumers opt in to ViFi's customer-care SMS program, what ViFi sends, and how HELP and STOP work."
effectiveDate: 2026-08-21
---

This policy describes ViFi LLC's ("ViFi") ViFi-controlled A2P 10DLC
customer-care SMS program. It is the public source of truth for the program's
sender, consent flow, message content, frequency, HELP handling, and STOP
handling. ViFi is the sole sender.

Account verification and security messages sent to ViFi account holders are a
separate service and are not part of this A2P 10DLC Campaign.

## Sender and message control

Every message identifies **ViFi** as the sender. ViFi account holders and the
businesses whose calls ViFi answers cannot draft, edit, brand, or directly send
messages through this program. ViFi does not insert a customer's business
name, contact information, link, location, signature, or other
customer-specific content into the message.

The program sends no marketing, promotions, third-party offers, free-form
messages, missed-call solicitations, or recurring message series.

## How a recipient opts in

The sole opt-in action is an inbound text whose entire body is **YES**
(case-insensitive). ViFi sends no SMS before the recipient takes that action.

A valid flow begins when a caller makes a fresh phone-follow-up request during
an inbound call answered by ViFi. ViFi then reads this instruction:

> ViFi will send two messages for this one-time request: an opt-in confirmation and one customer-care receipt. To opt in, text YES to the number you called. Consent is optional and is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out or HELP for help. Terms are at vifi dot us slash legal slash terms. Privacy is at vifi dot us slash legal slash privacy.

A spoken answer on a call, merely visiting a page, placing a call, or providing
a phone number is not SMS consent. Consent occurs only when the recipient sends
**YES** to the ViFi number identified in the instruction. ViFi does not use
web-form leads, purchased lists, scraped numbers, third-party lists, or consent
collected by a ViFi account holder for this program.

## Exact message flow

1. The caller makes a fresh phone-follow-up request and ViFi presents the voice
   instruction above. No SMS has been sent.
2. The recipient texts **YES** to the identified ViFi number.
3. The program sends the currently registered opt-in confirmation:

   > ViFi: opt-in confirmed. You will receive the content you requested shortly. Reply HELP for help, STOP to opt out.

4. ViFi sends exactly one centrally controlled customer-care receipt:

   > ViFi: Your one-time phone follow-up request has been recorded. Reply HELP for help or STOP to opt out. Msg & data rates may apply.

5. The flow is complete. ViFi sends no additional content for that request.

The receipt has no variable fields, embedded links, embedded phone numbers, or
customer-specific branding. Each distinct inbound YES following the disclosed
phone-follow-up flow is a new one-shot consumer request.

## Frequency

Following each valid YES opt-in, ViFi sends two outbound messages: one automatic
opt-in confirmation and one fixed customer-care receipt. Messages are not
recurring. ViFi does not send reminders or follow-up series for the request.

## HELP

Recipients may text **HELP** at any time. The program sends this automatic
response:

> ViFi: For help with the ViFi one-time customer-care text program, email support@vifi.us. Reply STOP to opt out. Msg & data rates may apply.

ViFi does not send a duplicate application-generated HELP reply. Consumers may
also email [support@vifi.us](mailto:support@vifi.us) for assistance.

## STOP and global suppression

Recipients may text **STOP** or another carrier-recognized opt-out keyword at
any time. The program sends one automatic opt-out acknowledgement. ViFi does
not send a duplicate application-generated reply.

STOP suppresses the recipient across the entire ViFi customer-care SMS program
and every ViFi program number. No ViFi customer-care content may be sent from
another program number to work around that choice.

After STOP, the recipient must first text **START** or **UNSTOP** to remove the
transport-level block. START or UNSTOP does not authorize a ViFi content
message. The recipient must then make a fresh phone-follow-up request, receive
the ViFi voice instruction, and text **YES** to create a new one-time request.

## Privacy and consent records

ViFi records the recipient's inbound YES, HELP, and STOP events, the number to
which the keyword was sent, timestamps, message identifiers, delivery state,
and the related request as needed to operate and audit the program.

ViFi does not sell, rent, or share mobile numbers, SMS opt-in data, or SMS
consent records with third parties or affiliates for their marketing or
promotional purposes. Text messaging originator opt-in data and consent are not
shared with third parties. Service providers may process this data only as
needed to operate and support ViFi's service. See the
[ViFi Privacy Policy](https://vifi.us/legal/privacy/) for more information.

## Reviewer evidence and terms

- [SMS Opt-In Evidence](https://vifi.us/legal/sms-opt-in-evidence/) contains a
  text-first, step-by-step record of the exact flow.
- [SMS Flow Diagram](https://vifi.us/legal/sms-flow-diagram.svg) is a supporting
  visual of the same flow.
- [Terms of Service](https://vifi.us/legal/terms/) contains the applicable
  messaging terms.

Message and data rates may apply. Carriers are not liable for delayed or
undelivered messages.

## Changes to this policy

ViFi may update this policy to reflect program, legal, carrier, or provider
requirements. ViFi will not use an existing YES opt-in for materially broader
message content or frequency. A broader program would require an updated
disclosure, appropriate consent, and any required Campaign review.

## Contact

ViFi LLC

139 Brisbane Dr, Acworth, GA 30101

[support@vifi.us](mailto:support@vifi.us)
