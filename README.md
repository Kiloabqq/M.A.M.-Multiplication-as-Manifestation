# M.A.M. - Multiplication as Manifestation

M.A.M. is the KiLo / AISKI framing for a symbolic AI and agent-composition
protocol exposed as a small Express API. It models how roles such as Catalyst,
Potential, Null, Observer, Filter, and Amplifier interact with numeric operands
and metadata to produce a composed result and a trace of the transformation
chain.

The poetic idea behind "Multiplication as Manifestation" remains part of the
project identity: intent meets structure, roles modify trajectory, and the final
composition becomes legible. The implementation below keeps that tone while
stating clearly where philosophy ends and protocol behavior begins.

> M.A.M. does not replace arithmetic multiplication. It defines a symbolic
> composition operator for modeling role interaction, amplification, filtering,
> and agent orchestration.

## What It Is

- A symbolic composition API for experiments in multi-agent orchestration.
- A predictable demo service for role overlays, prompt interpretation, and
  traceable transformation chains.
- A framing layer for agent interaction where `⊗` means composition, not
  arithmetic multiplication.
- A KiLo / AISKI-branded protocol sketch for thinking about agent collaboration
  with technical discipline.

## What It Is Not

- It is not a replacement for normal arithmetic multiplication.
- It is not a claim that `2 ⊗ 3` should replace `2 × 3` in mathematics.
- It is not a cryptographic or scientific standard.

## Concept Summary

M.A.M. keeps the `multiply` function name for API compatibility, but the
underlying operator is symbolic composition:

- `standard`: baseline composition score, defined as `a + b`
- `catalytic`: standard composition plus a catalyst bonus
- `unit_amplify`: if either side is `1`, the other side is amplified by `+1`
- `doubling_symmetry`: if both inputs match, the result doubles that shared
  value
- `non_commutative`: order matters, so `a ⊗ b` differs from `b ⊗ a`
- `null`: composition collapses to `0`

### Roles

- `Catalyst`: nudges the initiating operand to represent intent injection.
- `Potential`: expands the second operand to represent latent capacity.
- `Null`: zeroes the composition path and switches the mode to `null`.
- `Observer`: annotates metadata without changing the numeric core.
- `Filter`: blocks negative inputs in chains that require safe composition.
- `Amplifier`: increases both operands before symbolic composition.

## Install

```bash
npm install
```

## Run

```bash
npm start
```

The server starts on port `3000` by default.

## Health Check

```http
GET /health
```

Response:

```text
OK
```

## API

### `POST /mam/multiply`

Runs one symbolic composition step with an optional role overlay.

Request:

```json
{
  "a": 2,
  "b": 3,
  "mode": "non_commutative",
  "role": "catalyst",
  "metadata": {
    "intent": "prototype"
  }
}
```

Response:

```json
{
  "operator": "symbolic_composition",
  "mode": "non_commutative",
  "role": "catalyst",
  "result": 9,
  "metadata": {
    "intent": "prototype",
    "lastRole": "catalyst",
    "appliedRoles": ["catalyst"]
  },
  "agentTrace": [
    {
      "role": "catalyst",
      "before": {
        "a": 2,
        "b": 3,
        "mode": "non_commutative",
        "metadata": {
          "intent": "prototype"
        }
      },
      "after": {
        "a": 3,
        "b": 3,
        "mode": "non_commutative",
        "metadata": {
          "intent": "prototype",
          "lastRole": "catalyst",
          "appliedRoles": ["catalyst"]
        }
      },
      "reason": "Catalyst increases the initiating operand to represent intent injection."
    }
  ]
}
```

### `POST /mam/chain`

Interprets a prompt, applies the detected roles in sequence, and then computes
the composed result.

Request:

```json
{
  "prompt": "catalyst amplify and then apply non-commutative logic",
  "a": 1,
  "b": 2,
  "metadata": {
    "source": "demo"
  }
}
```

Response:

```json
{
  "operator": "symbolic_composition",
  "prompt": "catalyst amplify and then apply non-commutative logic",
  "roles": ["catalyst", "amplifier"],
  "mode": "non_commutative",
  "agentTrace": [
    {
      "role": "catalyst",
      "before": {
        "a": 1,
        "b": 2,
        "mode": "non_commutative",
        "metadata": {
          "source": "demo",
          "intent": "chain",
          "prompt": "catalyst amplify and then apply non-commutative logic"
        }
      },
      "after": {
        "a": 2,
        "b": 2,
        "mode": "non_commutative",
        "metadata": {
          "source": "demo",
          "intent": "chain",
          "prompt": "catalyst amplify and then apply non-commutative logic",
          "lastRole": "catalyst",
          "appliedRoles": ["catalyst"]
        }
      },
      "reason": "Catalyst increases the initiating operand to represent intent injection."
    }
  ],
  "finalPayload": {
    "a": 4,
    "b": 4,
    "mode": "non_commutative",
    "metadata": {
      "source": "demo",
      "intent": "chain",
      "prompt": "catalyst amplify and then apply non-commutative logic",
      "lastRole": "amplifier",
      "appliedRoles": ["catalyst", "amplifier"],
      "amplified": true
    },
    "agentTrace": []
  },
  "result": 12,
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

### `POST /mam/debug`

Returns the adjusted payload, result, supported modes, and a timestamp for
troubleshooting symbolic composition behavior.

Request:

```json
{
  "a": 3,
  "b": 3,
  "mode": "doubling_symmetry",
  "role": "observer",
  "metadata": {
    "ticket": "dbg-001"
  }
}
```

### `POST /mam/interpret`

Parses prompt keywords into roles and a recommended mode.

Request:

```json
{
  "prompt": "potential filter and double the pattern"
}
```

Response:

```json
{
  "prompt": "potential filter and double the pattern",
  "roles": ["potential", "filter"],
  "mode": "doubling_symmetry",
  "matchedKeywords": {
    "roles": {
      "potential": ["potential"],
      "filter": ["filter"]
    },
    "mode": ["double"]
  }
}
```

## Error Behavior

- Invalid numeric input returns HTTP `400`.
- Missing or non-string `prompt` returns HTTP `400`.
- Unknown `mode` returns HTTP `400`.

Example invalid request:

```json
{
  "a": "two",
  "b": 3
}
```

Example response:

```json
{
  "error": "a must be a finite number."
}
```

## Development

Run tests:

```bash
npm test
```

Format the repo:

```bash
npm run format
```

## Whitepaper

See [WHITEPAPER.md](./WHITEPAPER.md) for the technical concept paper and the
operator framing behind M.A.M., including the KiLo / AISKI positioning and the
symbolic meaning of `⊗`.
