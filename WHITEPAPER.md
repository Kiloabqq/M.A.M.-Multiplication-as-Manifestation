# M.A.M. Logic

## A Short Concept Paper for Symbolic Agent Composition

M.A.M. stands for **Multiplication as Manifestation**, but the phrase should be
read symbolically, not literally. The project uses the visual language of
multiplication to describe how roles, prompts, and metadata interact inside an
agent workflow.

Within the KiLo / AISKI identity, that phrase carries a visionary tone: intent
is manifested through role ordering, amplification, filtering, and composition.
The technical implementation keeps that language, but grounds it in explicit,
testable rules.

> M.A.M. does not replace arithmetic multiplication. It defines a symbolic
> composition operator for modeling role interaction, amplification, filtering,
> and agent orchestration.

The operator `⊗` is therefore a composition marker. It captures the idea that
two values, plus the context wrapped around them, can produce a transformed
result that is traceable and role-sensitive.

## Why Use a Symbolic Composition Operator

Normal multiplication is commutative, exact, and mathematically closed. Agent
systems often are not. In orchestration systems:

- order can matter
- metadata can affect meaning
- some roles amplify
- some roles filter
- some roles zero out the result

M.A.M. treats these behaviors as first-class protocol features.

## Core Entities

### Catalyst

Catalyst represents initiating intent. In the reference implementation, Catalyst
nudges the first operand upward before composition. Symbolically, it models the
idea that an initiating agent changes the state of the interaction before the
core operator runs.

### Potential

Potential represents latent capacity. It expands the second operand before
composition, modeling the idea that context or model depth can increase the
available response space.

### Null

Null represents collapse, rejection, or explicit zeroing. When Null is applied,
the composition path ends in mode `null`, and the final result becomes `0`.

## The Symbolic Composition Operator

The exported API function is still named `multiply` for compatibility, but its
meaning in this project is symbolic composition:

```text
a ⊗ b
```

This is not arithmetic multiplication. It is a documented transform whose
behavior depends on mode.

### Standard Mode

Standard mode is the baseline composition rule:

```text
a ⊗ b = a + b
```

This gives the protocol a stable default that is easy to reason about and test.

### Catalyst Mode

Catalytic mode adds a small bias to standard composition:

```text
a ⊗ b = a + b + 1
```

This is a symbolic representation of activated intent rather than a statement
about mathematics.

### Unit Amplify

Unit amplification models the special effect of composition with a unit input:

```text
1 ⊗ n = n + 1
n ⊗ 1 = n + 1
```

In the implementation, if neither side is `1`, the mode still behaves
predictably by returning `a + b + 1`.

### Doubling Symmetry

Doubling symmetry rewards matching operands:

```text
n ⊗ n = 2n
```

If the operands are not equal, the implementation falls back to standard
composition so the mode remains stable outside the symmetry case.

### Non-Commutative Ordering

Some agent workflows depend on sequence. M.A.M. models this explicitly:

```text
a ⊗ b ≠ b ⊗ a
```

The reference implementation uses an order-sensitive scoring rule so the first
operand carries more influence than the second. This makes the protocol usable
for modeling role ordering.

### Null Mode

Null mode collapses composition:

```text
a ⊗ b = 0
```

This supports moderation, gating, or explicit rejection flows.

## Metadata Amplification

M.A.M. is not only about numeric operands. It also preserves metadata and a
trace of how each role changed the payload. This matters for agent systems
because the explanation chain is often as important as the numeric result.

Each overlay step records:

- `role`
- `before`
- `after`
- `reason`

This creates a lightweight audit trail for symbolic orchestration.

## Non-Commutative Role Ordering

M.A.M. separates two ideas:

1. Role overlays modify a payload before composition.
2. The composition mode determines how the final numeric relation behaves.

That distinction makes ordering meaningful. For example:

```text
Catalyst -> Amplifier -> compose
```

is not the same as:

```text
Amplifier -> Catalyst -> compose
```

because the payload changes at each step and the trace captures the difference.

## Worked Examples

### Example 1: Standard Composition

```text
2 ⊗ 3 = 5
```

Interpretation: the protocol reports a baseline combined score of `5`.

### Example 2: Unit Amplification

```text
1 ⊗ 4 = 5
4 ⊗ 1 = 5
```

Interpretation: a unit input triggers a one-step amplification of the other
operand.

### Example 3: Doubling Symmetry

```text
3 ⊗ 3 = 6
```

Interpretation: aligned operands reinforce each other symmetrically.

### Example 4: Non-Commutative Ordering

```text
2 ⊗ 5 = 9
5 ⊗ 2 = 12
```

Interpretation: the initiator matters. Changing order changes the result.

### Example 5: Role-Based Chain

Prompt:

```text
"catalyst amplify and apply non-commutative logic"
```

A reasonable chain is:

1. Catalyst increases the initiating operand.
2. Amplifier increases both operands.
3. Non-commutative composition computes the final score.

The result is numeric, but the protocol value lies in the traceable,
role-sensitive process.

## Positioning

M.A.M. should be presented as:

- a symbolic agent-composition protocol
- a lightweight orchestration experiment
- a role-aware transformation API

It should not be presented as:

- a correction to arithmetic
- a universal replacement for multiplication
- a claim of mathematical supersession

## Conclusion

The strongest version of M.A.M. is the technically honest one. Its power is not
in pretending to rewrite mathematics. Its power is in offering a KiLo /
AISKI-branded, compact, auditable symbolic language for agent interaction,
metadata amplification, filtering, and order-sensitive composition.
