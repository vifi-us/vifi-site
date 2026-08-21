---
title: "SMS Opt-In Evidence"
description: "Reviewer evidence for the consumer-originated YES opt-in used by ViFi's A2P 10DLC customer-care program."
effectiveDate: 2026-08-21
---

This page gives DCA, The Campaign Registry, carrier, and Twilio reviewers a
public, text-first description of ViFi LLC's exact A2P 10DLC opt-in and message
flow. The text on this page is authoritative; the diagram is a supporting
visual.

## Program identity

- **Brand and sole sender:** ViFi LLC
- **Traffic purpose:** one ViFi-controlled, low-volume, one-time customer-care
  program
- **Reviewer test number:** +1 (678) 750-4279, a ViFi-owned internal pilot
  number for coordinated testing after a fresh test call and voice instruction
- **Message control:** ViFi centrally controls every message; ViFi account
  holders cannot write, edit, brand, or directly send program messages

No program message contains a third-party brand, variable field, embedded
link, embedded phone number, location, signature, free-form text, or
customer-authored content. Every outbound message begins with **ViFi**.

## Sole opt-in action

The sole consent action is a consumer-originated SMS whose entire body is
**YES** (case-insensitive). ViFi sends **zero outbound SMS before YES**.

The flow begins when a caller makes a fresh phone-follow-up request during an
inbound call. ViFi then presents this instruction by voice:

> ViFi will send two messages for this one-time request: an opt-in confirmation and one customer-care receipt. To opt in, text YES to the number you called. Consent is optional and is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out or HELP for help. Terms are at vifi dot us slash legal slash terms. Privacy is at vifi dot us slash legal slash privacy.

The disclosure is reproduced here solely so reviewers can verify it. This page
is not an SMS signup surface and does not invite visitors to text the reviewer
number without a fresh test call, phone-follow-up request, and voice
instruction.

A spoken answer, an inbound call, a page visit, or possession of a phone number
is not SMS consent. ViFi does not send a confirmation request asking a
non-consented recipient to reply YES. Consent occurs only when the recipient
initiates the SMS conversation by sending YES.

Each distinct inbound YES following that disclosed flow is a new one-shot
request. ViFi does not obtain consent from account holders, web-form leads,
purchased lists, scraped numbers, or third-party lists.

## Exact end-to-end flow

### Step 1: ViFi presents the instruction

After the caller's fresh phone-follow-up request, ViFi presents the voice
disclosure above. No SMS is sent by ViFi at this step.

### Step 2: The consumer texts YES

The consumer sends **YES** to the identified ViFi number. This inbound message
is the opt-in event and the one-time customer-care request.

The Campaign's currently registered keyword setting is:

```text
optInKeywords=[YES]
```

### Step 3: Registered opt-in confirmation

After YES, the program sends the currently registered opt-in confirmation,
verbatim:

> ViFi: opt-in confirmed. You will receive the content you requested shortly. Reply HELP for help, STOP to opt out.

This confirmation occurs after consent. It is not an outbound opt-in
solicitation.

### Step 4: One fixed customer-care receipt

ViFi then sends exactly one centrally controlled content message, verbatim:

> ViFi: Your one-time phone follow-up request has been recorded. Reply HELP for help or STOP to opt out. Msg & data rates may apply.

This is the only customer-care receipt template. If campaign registration asks
for two content samples, this exact sample is duplicated; ViFi does not invent
a second use case or template.

### Step 5: Complete

The request is complete after the one receipt. ViFi sends no reminder,
marketing message, additional follow-up, free-form reply, or recurring series.

## Frequency

For one accepted YES, ViFi sends exactly two outbound messages:

1. one registered opt-in confirmation; and
2. one fixed customer-care receipt.

There are no recurring messages. A distinct later YES following a fresh,
disclosed phone-follow-up flow is a new one-shot consumer request.

## HELP behavior

The program's automatic HELP response is:

> ViFi: For help with the ViFi one-time customer-care text program, email support@vifi.us. Reply STOP to opt out. Msg & data rates may apply.

ViFi sends no duplicate application-generated HELP message. Reviewers and
recipients may also contact [support@vifi.us](mailto:support@vifi.us).

## STOP behavior and scope

STOP and carrier-recognized equivalents are honored immediately. The program
sends one automatic opt-out acknowledgement. ViFi does not send a duplicate
application-generated acknowledgement.

ViFi treats STOP as a global opt-out from this entire ViFi customer-care
program. The suppression applies to every ViFi program number, not merely the
number that received STOP. ViFi will not switch numbers to bypass an opt-out.

After STOP, a recipient must first text **START** or **UNSTOP** to remove the
transport-level block. START or UNSTOP does not create a ViFi content request.
The recipient must then make a fresh phone-follow-up request, receive the ViFi
voice instruction, and send **YES** to authorize a new one-time receipt.

## Data and privacy controls

ViFi retains inbound keyword events, timestamps, involved phone numbers,
message identifiers, delivery status, consent status, and suppression status
as needed to operate and audit the program.

ViFi does not sell, rent, or share mobile numbers, SMS opt-in data, or SMS
consent records with third parties or affiliates for their marketing or
promotional purposes. Text messaging originator opt-in data and consent are not
shared with third parties. Service providers may process the data only as
needed to operate and support ViFi's service.

## Public references

- [Messaging Policy](https://vifi.us/legal/messaging-policy/)
- [Privacy Policy](https://vifi.us/legal/privacy/)
- [Terms of Service](https://vifi.us/legal/terms/)
- [Supporting SMS flow diagram](https://vifi.us/legal/sms-flow-diagram.svg)

## Contact

ViFi LLC

139 Brisbane Dr, Acworth, GA 30101

[support@vifi.us](mailto:support@vifi.us)

+1 (678) 232-1627
