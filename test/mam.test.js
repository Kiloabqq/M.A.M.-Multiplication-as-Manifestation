const test = require("node:test");
const assert = require("node:assert/strict");

const request = require("supertest");

const app = require("../app");
const { multiply } = require("../utils/mamLogic");

test("unit_amplify applies the one-sided amplification rule", () => {
  assert.equal(multiply(1, 4, "unit_amplify"), 5);
  assert.equal(multiply(4, 1, "unit_amplify"), 5);
});

test("doubling_symmetry doubles matching operands", () => {
  assert.equal(multiply(3, 3, "doubling_symmetry"), 6);
});

test("non_commutative mode changes when the operand order changes", () => {
  assert.notEqual(
    multiply(2, 5, "non_commutative"),
    multiply(5, 2, "non_commutative"),
  );
});

test("null mode always returns zero", () => {
  assert.equal(multiply(99, 42, "null"), 0);
});

test("GET /health returns OK", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.text, "OK");
});

test("POST /mam/multiply rejects invalid input with HTTP 400", async () => {
  const response = await request(app).post("/mam/multiply").send({
    a: "two",
    b: 3,
    mode: "standard",
  });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /a must be a finite number/i);
});

test("POST /mam/multiply rejects unknown mode with HTTP 400", async () => {
  const response = await request(app).post("/mam/multiply").send({
    a: 2,
    b: 3,
    mode: "unknown_mode",
  });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /unknown mode/i);
});

test("POST /mam/chain rejects missing prompt with HTTP 400", async () => {
  const response = await request(app).post("/mam/chain").send({
    a: 1,
    b: 1,
  });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /prompt is required/i);
});

test("POST /mam/interpret rejects missing prompt with HTTP 400", async () => {
  const response = await request(app).post("/mam/interpret").send({});

  assert.equal(response.status, 400);
  assert.match(response.body.error, /prompt is required/i);
});
