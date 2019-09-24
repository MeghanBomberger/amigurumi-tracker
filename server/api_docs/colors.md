# Colors

*List of yarn color options*

---

## VALUES

| KEY | TYPE |
| --- | --- |
| id | interger |
| colorName | string with a limit of 50 characters |
| colorSwatch | string with a limit of 25 characters |
| brandName | string with a limit of 50 characters |
|

---

## RETREIVE

### Request All

```http
GET /api/colors
```

### Request One

```http
GET /api/colors/:id
```

### Response

*Request all will return an array of the objects like the one shown in the template shown below. Request one will return a single object.*

```json
{
	"id": 1,
	"colorName": "ocean",
	"colorSwatch": "rgb (51,105,133)",
	"brandName": "caron simply soft"
}
```

---

## CREATE

### Request

```http
POST /api/colors
```

```json
{
	"colorName": "ocean",
	"colorSwatch": "rgb (51,105,133)",
	"brandName": "caron simply soft"
}
```

### Success Response

```json
{
	"id": 1,
	"colorName": "ocean",
	"colorSwatch": "rgb (51,105,133)",
	"brandName": "caron simply soft"
}
```

### Failure Response

```json
{
	"validationError": "colorName must be a string"
}
```

---

## UPDATE

### Request

```http
PATCH /api/colors/:id
```

```json
{
	"colorName": "ocean",
	"colorSwatch": "rgb (51,105,133)",
	"brandName": "caron simply soft"
}
```

### Success Response

```json
{
	"id": 1,
	"colorName": "ocean",
	"colorSwatch": "rgb (51,105,133)",
	"brandName": "caron simply soft"
}
```

### Failure Response

```json
{
	"validationError": "colorName must be a string"
}
```

---

## DELETE

This api features a soft delete.

### Request

```http
DELETE /api/colors/:id
```

### Success Response

An HTTP 204 status is retured if the deletion was sucessful.

### Failure Response

An HTTP 400 status is retured if you cannot delete this client.

---

*Last updated 09/23/2019*
