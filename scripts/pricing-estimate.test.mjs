import { test } from "node:test";
import assert from "node:assert/strict";
import { estimatePlans, formatCost } from "../src/utils/pricing-estimate.ts";

test("included units never create negative extra charges", () => {
  assert.deepEqual(estimatePlans(0, 0).map(p => p.totalCents), [4900, 14900, 34900]);
  assert.equal(estimatePlans(100, 100)[0].totalCents, 4900);
});

test("published examples compare the whole bill, not just the allowance", () => {
  assert.deepEqual(estimatePlans(150, 0).map(p => p.totalCents), [5650, 14900, 34900]);
  assert.deepEqual(estimatePlans(2000, 0).map(p => p.totalCents), [33400, 32900, 34900]);
  assert.deepEqual(estimatePlans(4000, 0).map(p => p.totalCents), [63400, 56900, 54900]);
  assert.equal(formatCost(5650), "$56.50");
});

test("SMS and minute allowances are independent and calculated in cents", () => {
  assert.equal(estimatePlans(101, 101)[0].totalCents, 4918);
  assert.equal(estimatePlans(0, 501)[1].smsCents, 3);
  assert.equal(estimatePlans(0, 2001)[2].smsCents, 2);
  assert.deepEqual(estimatePlans(3000, 0).map(p => p.totalCents), [48400, 44900, 44900]);
});

test("invalid units cannot produce a misleading quote", () => {
  for (const invalid of [-1, 1.5, NaN, Infinity, 1000001]) {
    assert.throws(() => estimatePlans(invalid, 0), RangeError);
    assert.throws(() => estimatePlans(0, invalid), RangeError);
  }
});
