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
- **Pre-submission reviewer proof:** this public evidence page and the
  supporting diagram are published before Campaign submission; publication
  does not enable outbound or create a public SMS enrollment surface
- **Fail-closed rollout:** all program outbound remains disabled while the
  Campaign status is not **VERIFIED**; after verification, outbound is enabled
  only for one consented internal canary, and customer-provisioned numbers
  remain disabled until that canary passes
- **Message control:** ViFi centrally controls every message; ViFi account
  holders cannot write, edit, brand, or directly send program messages

No program message contains a third-party brand, variable field, embedded
link, embedded phone number, location, signature, free-form text, or
customer-authored content. Every outbound message begins with **ViFi**.

## Sole opt-in action

The sole consent action is a consumer-originated SMS whose entire body is
**YES** (case-insensitive), received during an activated, unexpired pending
request. ViFi sends **zero outbound SMS before YES**. A YES sent during voice
playback cannot authorize and sends no program message.

The flow begins when a caller makes a fresh phone-follow-up request during an
inbound call. ViFi creates a non-authorizable disclosure-pending record and
presents this instruction by voice without interruption:

> ViFi will send two messages for this one-time request: an opt-in confirmation and one customer-care receipt. After this message ends, to opt in, text YES within 15 minutes to this ViFi number: [ViFi SMS number]. Consent is optional and is not a condition of purchase. ViFi sends no text before your YES. Message and data rates may apply. Reply STOP to opt out or HELP for help. Terms are at vifi dot us slash legal slash terms. Privacy is at vifi dot us slash legal slash privacy.

At runtime, ViFi replaces **[ViFi SMS number]** only with the ViFi-owned,
SMS-capable source number assigned to the disclosure-pending record. The value
is not customer-supplied or customer-configurable and does not add customer
branding or content.

The initial record cannot authorize SMS. Only after the full disclosure
finishes and the activation endpoint succeeds does it become an authorizable
pending request and its 15-minute window begin.

The disclosure is reproduced here solely so reviewers can verify it. This page
and the supporting diagram are the pre-submission reviewer proof. They are not
an SMS signup surface and do not invite a visitor to send YES based on a page
visit.

A spoken answer, an inbound call, a page visit, or possession of a phone number
is not SMS consent. ViFi does not send a confirmation request asking a
non-consented recipient to reply YES. Consent occurs only when the recipient
initiates the SMS conversation by sending YES to the disclosed ViFi number
within the activated pending window.

The pending request expires 15 minutes after the full disclosure finishes and
activation succeeds. A YES during playback, a late YES, a YES without an
authorizable pending request, or a replayed YES sends no confirmation, receipt,
or other program message. A new request requires a fresh call-linked
phone-follow-up request and full disclosure. ViFi does not obtain consent from
account holders, web-form leads, purchased lists, scraped numbers, or
third-party lists.

## Exact end-to-end flow

### Step 1: ViFi presents the instruction

After the caller's fresh phone-follow-up request, ViFi creates a
non-authorizable disclosure-pending record, identifies the ViFi-owned SMS
number, and presents the full voice disclosure above without interruption. No
SMS is sent by ViFi at this step, and YES cannot authorize during playback.

After the full disclosure finishes, ViFi calls the activation endpoint. Only a
successful activation creates the authorizable 15-minute pending window. If
activation fails, there is no authorizable request.

### Step 2: The consumer texts YES

After the full disclosure finishes and activation succeeds, the consumer sends
**YES** to the identified ViFi number within 15 minutes. The first accepted YES
is the opt-in event and consumes the one-time pending request. A YES during
playback, late, repeated, or unsolicited sends nothing.

The Campaign's proposed keyword setting for submission is:

```text
optInKeywords=[YES]
```

### Step 3: Confirmation registered at Campaign submission

After the timely, accepted YES, the program sends the confirmation registered
at Campaign submission, verbatim:

> ViFi: Opt-in confirmed. You will receive one requested follow-up text. Msg & data rates may apply. Reply HELP for help or STOP to opt out.

This confirmation occurs after consent. It is not an outbound opt-in
solicitation.

### Step 4: One fixed customer-care receipt

ViFi then sends exactly one centrally controlled content message, verbatim:

> ViFi: Your one-time phone follow-up request has been recorded. Reply HELP for help or STOP to opt out. Msg & data rates may apply.

This is the only customer-care receipt template. The Campaign's two
`MessageSamples` are exactly the opt-in confirmation quoted in Step 3 and the
fixed customer-care receipt quoted above. They are not two distinct content
use cases and contain no customer-controlled fields.

### Step 5: Complete

The request is complete after the one receipt. ViFi sends no reminder,
marketing message, additional follow-up, free-form reply, or recurring series.

## Frequency

For one accepted YES, ViFi sends exactly two outbound messages:

1. one opt-in confirmation registered at Campaign submission; and
2. one fixed customer-care receipt.

There are no recurring messages. After the accepted YES consumes the pending
request, another YES sends nothing. A new one-shot request requires a fresh
phone-follow-up request and voice disclosure.

## HELP behavior

The program's automatic HELP response is:

> ViFi: For help with the ViFi one-time customer-care text program, email <!--email_off-->support@vifi.us<!--/email_off-->. Reply STOP to opt out. Msg & data rates may apply.

ViFi sends no duplicate application-generated HELP message. Reviewers and
recipients may also contact <!--email_off-->support@vifi.us<!--/email_off-->.

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
voice instruction, wait until the full disclosure finishes and activation
succeeds, and send **YES** to the disclosed ViFi number within 15 minutes to
authorize a new one-time receipt.

## Data and privacy controls

ViFi retains inbound keyword events, disclosure and expiry timestamps, involved
phone numbers, message identifiers, delivery status, consent status, and
suppression status as needed to operate and audit the program.

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

<p><!--email_off--><a href="mailto:support@vifi.us">support@vifi.us</a><!--/email_off--></p>

+1 (678) 232-1627
