# Designs

*List of amigurumi design profiles*

---

## VALUES

| KEY | TYPE |
| --- | --- |
| id | interger |
| designName | string with limit of 50 characters |
| designNotes | string with limit of 300 characters |
| quantity | interger |
| colors | array of objects - see (Colors)['./colors.md'] API documentation for more details |
| crochetHooks | array of objects - see (Crochet Hooks)['./crochetHooks.md] API documentation for more details |
| fandoms | array of objects - see (Fandoms)['./fandoms.md] API documentation for more details |
| referenceImages | array of objects array of objects - see (Images)['./images.md] API documentation for more details |
| exampleImages | array of objects array of objects - see (Images)['./images.md] API documentation for more details |
| patternDocuments | array of objects array of objects - see (Files)['./files.md] API documentation for more details |
| isDeleted | boolean |
|

---

## RETREIVE

### Request All

```http
GET /api/designs
```

### Request One

```http
GET /api/designs/:id
```

### Response

*Request all will return an array of the objects like the one shown in the template shown below. Request one will return a single object.*

```json
{
	"id": 1,
	"designName": "Slender Man",
	"designNotes": "Rewrite the lapel component",
	"quantity": 3,
	"colors": [
		{
        "id": 4,
        "colorName": "black",
        "colorSwatch": "rgb (0,0,0)",
        "brandName": "caron simply soft",
        "yarnTypeId": 1,
        "yarnWeightId": 5
    	},{
        "id": 5,
        "colorName": "Off White",
        "colorSwatch": "rgb (255,255,255)",
        "brandName": "caron simply soft",
        "yarnTypeId": 1,
        "yarnWeightId": 5
    	}
	],
	"crochetHooks": [
		{
        "id": 6,
        "size": 3.5,
        "knittingNeedleNumber": 4,
        "usSize": "E/4",
        "ukSize": null
    	}
	],
	"fandoms": [
		{
        "id": 8,
        "fandom": "horror",
        "isDeleted": 0
    	}
	]
}
```

## CREATE

### Request

```http
POST /api/designs
```

```json
```json
{
	"designName": "Slender Man",
	"designNotes": "Rewrite the lapel component",
	"quantity": 3,
	"colors": [4,5],
	"crochetHooks": [6],
	"fandoms": [8]
}
```

