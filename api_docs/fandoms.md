# Fandoms

*List of fandom and genre options*

---

## VALUES

| KEY | TYPE |
| --- | --- |
| id | interger |
| fandom | string with a limit of 30 characters, input must be unique |
| isDeleted | boolean |
|

---

## RETREIVE

### Request All

```http
GET /api/fandoms
```

### Request One

```http
GET /api/fandoms/:id
```

### Response

*Request all will return an array of the objects like the one shown in the template shown below. Request one will return a single object.*

```json
{
	"id": 1,
	"fandom": "harry potter",
	"isDeleted": 0
}
```

---

## CREATE

### Request

```http
POST /api/fandoms
```

```json
{
	"fandom": "harry potter"
}
```

### Success Response

```json
{
	"id": 1,
	"fandom": "harry potter",
	"isDeleted": 0
}
```

### Failure Response

```json
{
	"validationError": "fandom must be a string"
}
```

---

## UPDATE

### Request

```http
PATCH /api/fandoms
```

```json
{
	"fandom": "harry potter"
}
```

### Success Response

```json
{
	"id": 1,
	"fandom": "harry potter",
	"isDeleted": 0
}
```

### Failure Response

```json
{
	"validationError": "fandom must be a string"
}
```

---

## DELETE

This api features a soft delete.

### Request

```http
DELETE /api/fandoms/:id
```

### Success Response

An HTTP 204 status is retured if the deletion was sucessful.

### Failure Response

An HTTP 400 status is retured if you cannot delete this client.

---

*Last updated 09/29/2019*

