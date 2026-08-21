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
(case-insensitive), received during an activated, unexpired pending request.
The initial disclosure-pending record is non-authorizable, so a YES sent during
voice playback cannot opt in and sends no program message.

A valid flow begins when a caller makes a fresh phone-follow-up request during
an inbound call answered by ViFi. ViFi creates a non-authorizable
disclosure-pending record and reads the following instruction without
interruption:

> ViFi will send two messages for this one-time request: an opt-in confirmation and one customer-care receipt. After this message ends, to opt in, text YES within 15 minutes to this ViFi number: [ViFi SMS number]. Consent is optional and is not a condition of purchase. ViFi sends no text before your YES. Message and data rates may apply. Reply STOP to opt out or HELP for help. Terms are at vifi dot us slash legal slash terms. Privacy is at vifi dot us slash legal slash privacy.

At runtime, ViFi replaces **[ViFi SMS number]** only with the ViFi-owned,
SMS-capable source number assigned to the disclosure-pending record. It is not
a customer or account-holder field and cannot introduce customer branding or
content. The reviewer number for the coordinated internal pilot is
**+1 (678) 750-4279**.

The 15-minute authorizable window does not begin during playback. Only after
the full disclosure finishes and the activation endpoint succeeds does the
record become an authorizable pending request and the 15-minute window begin.

A spoken answer on a call, merely visiting a page, placing a call, or providing
a phone number is not SMS consent. Consent occurs only when the recipient sends
**YES** to the identified ViFi number before that pending request expires. The
request expires 15 minutes after the full disclosure finishes and activation
succeeds. A YES during playback, a late YES, a YES without an authorizable
pending request, or a replayed YES sends no program message. ViFi does not use
web-form leads, purchased lists, scraped numbers, third-party lists, or consent
collected by a ViFi account holder for this program.

## Exact message flow

1. The caller makes a fresh phone-follow-up request. ViFi creates a
   non-authorizable disclosure-pending record, identifies its ViFi-owned SMS
   number, and presents the full voice instruction above without interruption.
   No SMS has been sent, and YES cannot authorize during playback.
2. After the full disclosure finishes, ViFi calls the activation endpoint. If
   activation succeeds, the record becomes one authorizable pending request
   and its 15-minute window begins. Failed activation leaves no authorizable
   request.
3. Within that 15-minute window, the recipient texts **YES** to the identified
   ViFi number. The first accepted YES consumes the pending request. A YES
   during playback, late, repeated, or unsolicited sends nothing.
4. For the accepted YES, ViFi sends the opt-in confirmation registered at
   Campaign submission:

   > ViFi: Opt-in confirmed. You will receive one requested follow-up text. Msg & data rates may apply. Reply HELP for help or STOP to opt out.

5. ViFi sends exactly one centrally controlled customer-care receipt:

   > ViFi: Your one-time phone follow-up request has been recorded. Reply HELP for help or STOP to opt out. Msg & data rates may apply.

6. The flow is complete. ViFi sends no additional content for that request.

The receipt has no variable fields, embedded links, embedded phone numbers, or
customer-specific branding. A new one-shot request requires a fresh
phone-follow-up request and disclosure; an inbound YES cannot create a request
by itself.

## Frequency

Following each timely, accepted YES opt-in, ViFi sends two outbound messages:
one automatic opt-in confirmation and one fixed customer-care receipt. Messages
are not recurring. ViFi does not send reminders or follow-up series for the
request. If the pending request expires, ViFi sends no message.

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
the ViFi voice instruction, wait until the full disclosure finishes and
activation succeeds, and then text **YES** to the disclosed ViFi number within
15 minutes to authorize a new one-time request.

## Privacy and consent records

ViFi records the recipient's inbound YES, HELP, and STOP events, the number to
which the keyword was sent, disclosure and expiry timestamps, message
identifiers, delivery state, and the related request as needed to operate and
audit the program.

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
