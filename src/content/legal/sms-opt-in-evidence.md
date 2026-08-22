---
title: "SMS Opt-In Evidence"
description: "Reviewer evidence for the consumer-originated YES opt-in used by ViFi's A2P 10DLC customer-care program."
effectiveDate: 2026-08-22
---

This page gives DCA, The Campaign Registry, carrier, and Twilio reviewers a
public, text-first description of ViFi LLC's exact A2P 10DLC opt-in and message
flow. The text on this page is authoritative; the diagram is a supporting
visual.

## Program identity

- **Brand and sole sender:** ViFi LLC
- **Traffic purpose:** one ViFi-controlled, low-volume, one-time customer-care
  program
- **Pre-resubmission reviewer proof:** this public evidence page and the
  supporting screenshot, recording, transcript, audio, and diagram are
  published before Campaign resubmission; publication does not enable outbound
  or create a public SMS enrollment surface
- **Fail-closed rollout:** all program outbound remains disabled while the
  Campaign status is not **VERIFIED**; after verification, outbound is enabled
  only for one consented internal canary, and customer-provisioned numbers
  remain disabled until that canary passes
- **Message control:** ViFi centrally controls every message; ViFi account
  holders cannot write, edit, brand, or directly send program messages

No program message contains a third-party brand, variable field, embedded
link, embedded phone number, location, signature, free-form text, or
customer-authored content. Every outbound message begins with **ViFi**.

## Public reviewer proof

The artifacts below show where the consumer hears the complete disclosure,
sees the ViFi number, and learns to send **YES**. They are code-derived,
pre-approval demonstrations of the production `vifi-direct-v1` contract—not a
live enrollment flow and not evidence that an SMS was sent.

For the rendered example, the runtime-owned **[ViFi SMS number]** placeholder is
replaced with ViFi's internal canary number, **+1 (678) 750-4279**. This is the
same substitution the production disclosure renderer performs. While the
Campaign is not **VERIFIED**, the number is not active as a program enrollment
surface: viewing these files or texting the number creates no request, consent
record, confirmation, receipt, or other campaign message.

<figure>
  <a href="/legal/vifi-direct-opt-in-proof.png">
    <img src="/legal/vifi-direct-opt-in-proof.png" alt="ViFi reviewer proof showing the exact rendered voice disclosure, the internal canary number, the YES keyword, and the rule that ViFi sends no SMS before YES" width="1920" height="1080" loading="eager" />
  </a>
  <figcaption>Full-size, no-login screenshot of the exact rendered disclosure and keyword instruction.</figcaption>
</figure>

<video controls preload="metadata" poster="/legal/vifi-direct-opt-in-proof.png">
  <source src="/legal/vifi-direct-opt-in-proof.mp4" type="video/mp4" />
  <track kind="captions" srclang="en" label="English" src="/legal/vifi-direct-verbal-cta.vtt" default />
  Your browser does not support embedded video. Use the direct recording and transcript links below.
</video>

The 50-second recording first presents the exact rendered disclosure in full
with its exact audio. It then shows the consumer-originated **YES** and the two
registered message examples. The message display is explicitly a pre-approval
simulation; it did not send SMS or create consent.

- [Open or download the MP4 recording](/legal/vifi-direct-opt-in-proof.mp4)
- [Open or download the exact disclosure audio](/legal/vifi-direct-verbal-cta.mp3)
- [Open the exact rendered transcript](/legal/vifi-direct-verbal-cta.txt)
- [Open the caption file](/legal/vifi-direct-verbal-cta.vtt)
- [Open the registered-message examples screenshot](/legal/vifi-direct-registered-messages-proof.png)
- [Open the artifact checksum and source manifest](/legal/vifi-direct-proof-manifest.txt)
- [Open the supporting state-flow diagram](/legal/sms-flow-diagram.svg)

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
and the reviewer artifacts above are the pre-resubmission proof. They are not an
SMS signup surface and do not invite a visitor to send YES based on a page
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

The Campaign's keyword setting is:

```text
optInKeywords=[YES]
```

### Step 3: Campaign opt-in confirmation

After the timely, accepted YES, the program sends the confirmation included in
the Campaign registration, verbatim:

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

1. one opt-in confirmation included in the Campaign registration; and
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
- [Rendered CTA screenshot](https://vifi.us/legal/vifi-direct-opt-in-proof.png)
- [Captioned CTA recording](https://vifi.us/legal/vifi-direct-opt-in-proof.mp4)
- [Exact rendered CTA transcript](https://vifi.us/legal/vifi-direct-verbal-cta.txt)
- [Supporting SMS flow diagram](https://vifi.us/legal/sms-flow-diagram.svg)

## Contact

ViFi LLC

139 Brisbane Dr, Acworth, GA 30101

<p><!--email_off--><a href="mailto:support@vifi.us">support@vifi.us</a><!--/email_off--></p>

+1 (678) 232-1627
