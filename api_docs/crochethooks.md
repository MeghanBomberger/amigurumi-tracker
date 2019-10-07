# Crochet Hooks

*List of crochet hook options and regional terminology data*

*This is a static table that cannot have new data added to it via the API*

---

## VALUES

| KEY | TYPE |
| --- | --- |
| id | interger |
| size | interger |
| knittingNeedleNumber | decimal with up to two decimal points and a maximum of five digits |
| usSize | string with a character limit of 10 characters |
| ukSize | string with a character limit of 10 characters |
|

---

## RETREIVE

### Request All

```http
GET /api/crochethooks
```

### Request One

```http
GET /api/crochethooks/:id
```

### Response

*Request all will return an array of the objects like the one shown in the template shown below. Request one will return a single object.*

```json
{
	"id": 1,
	"size": 2,
	"knittingNeedleNumber": null,
	"usSize": "0",
	"ukSize": "14"
}
```

---

*Last updated 09/29/2019*