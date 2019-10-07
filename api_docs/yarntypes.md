# Yarn Types

*Yarn types is a static list of types of yarn.*

---

## VALUES

| KEY | TYPE |
| --- | --- |
| id | interger |
| yarnType | string with a limit of 50 characters |
|

---

## RETREIVE

### Request All

```http
GET /api/yarntypes
```

### Request One

```http
GET /api/yarntypes/:id
```

### Response

*Request all will return an array of the objects like the one shown in the template shown below. Request one will return a single object.*

```json
{
	"id": 1,
	"yarnType": "acrylic"
}
```

---

*Last updated 09/23/2019*