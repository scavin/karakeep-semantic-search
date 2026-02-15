# karakeep-semantic - Semantic Bookmark Search

Search your Karakeep bookmarks by meaning, not just keywords.

## Setup

Set the environment variables:
```
KARAKEEP_SEMANTIC_URL=https://semantic.yourdomain.com
KARAKEEP_SEMANTIC_USER=username
KARAKEEP_SEMANTIC_PASS=password
```

## Usage

### Search bookmarks
```bash
curl -s -u "${KARAKEEP_SEMANTIC_USER}:${KARAKEEP_SEMANTIC_PASS}" "${KARAKEEP_SEMANTIC_URL}/search?q=<query>&limit=<n>" | jq
```

### Examples
```bash
# Find articles about building startups
curl -s -u "${KARAKEEP_SEMANTIC_USER}:${KARAKEEP_SEMANTIC_PASS}" "${KARAKEEP_SEMANTIC_URL}/search?q=how+to+build+a+startup&limit=5" | jq

# Find productivity content
curl -s -u "${KARAKEEP_SEMANTIC_USER}:${KARAKEEP_SEMANTIC_PASS}" "${KARAKEEP_SEMANTIC_URL}/search?q=getting+things+done&limit=5" | jq

# Find something you vaguely remember
curl -s -u "${KARAKEEP_SEMANTIC_USER}:${KARAKEEP_SEMANTIC_PASS}" "${KARAKEEP_SEMANTIC_URL}/search?q=that+article+about+AI+agents&limit=3" | jq
```

### Response format
```json
{
  "results": [
    {
      "bookmarkId": "abc-123",
      "score": 0.85,
      "title": "Article Title",
      "url": "https://example.com/article",
      "tags": ["tag1", "tag2"]
    }
  ],
  "query": "your search",
  "limit": 5,
  "took_ms": 150
}
```

### Other endpoints
```bash
# Health check (no auth required)
curl -s "${KARAKEEP_SEMANTIC_URL}/health" | jq

# Stats
curl -s -u "${KARAKEEP_SEMANTIC_USER}:${KARAKEEP_SEMANTIC_PASS}" "${KARAKEEP_SEMANTIC_URL}/stats" | jq

# Trigger manual sync
curl -s -X POST -u "${KARAKEEP_SEMANTIC_USER}:${KARAKEEP_SEMANTIC_PASS}" "${KARAKEEP_SEMANTIC_URL}/sync" | jq
```

## Tips

- Use natural language queries - "articles about productivity" works better than single keywords
- Higher scores (closer to 1.0) = better matches
- The search understands concepts, not just exact words
