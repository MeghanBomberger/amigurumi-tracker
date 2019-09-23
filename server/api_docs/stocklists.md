# Stock Lists

*Stock lists are intended for the planning of what to make for specific venues and events.*

---

## VALUES

| KEY | TYPE |
| --- | --- |
| id | interger |
| description | string with a limit of 150 characters |
| designId | array of objects in response and an array of intergers in requests |
| lastUpdated | string with a limit of 20 characters |
| isDeleted | boolean |
|

---

## RETREIVE

### Request All

```http
GET /api/stocklists
```

### Request One

```http
GET /api/stocklists/:id
```

### Response

*Request all will return an array of the objects like the one shown in the template shown below. Request one will return a single object.*

```json
{
	
}
```

---

*Last updated 09/23/2019*