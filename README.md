# M.A.M. Logic API

Modular API for multi-agent logic orchestration. Supports role-based multiplication, simulation, and prompt interpretation.

## Endpoints

### `POST /mam/multiply`
```json
{
  "a": 1,
  "b": 1,
  "mode": "standard",
  "metadata": { "intent": "co-creation" }
}