I am working on a mySQL query for a personal project. Right now the end goal is to have the query return the following json for each item:

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
        "yarnWeightId": {
			  "weightNumber": 4,
			  "weightName": "medium/worst weight"
		  }
    	},{
        "id": 5,
        "colorName": "Off White",
        "colorSwatch": "rgb (255,255,255)",
        "brandName": "caron simply soft",
        "yarnWeightId": {
			  "weightNumber": 4,
			  "weightName": "medium/worst weight"
		  }
    	}
	]
}
```

My most recent attempt is:

```mySQL
SELECT 
	d.id,
	d.designName,
	d.designNotes,
	d.quantity,
	d.isDeleted,
	GROUP_CONCAT(
		JSON_OBJECT(
			c.colorName,
			c.colorSwatch,
			c.brandName,
			yw.weightNumber,
			yw.weightName
		)
	) AS colorsUsed
FROM designs AS d
	INNER JOIN design_colors AS dc 
		ON dc.designId = d.id
	INNER JOIN colors AS c 
		ON dc.colorId = c.id
	INNER JOIN yarnweights AS yw 
		ON c.yarnWeightId = yw.id
GROUP BY d.id
;
```

Which is giving me an internal server error. Testing it with a simplier query goes through fine so I've narrowed it down to the query itself being the issue. 

The query below got me close:
```mysql
SELECT 
	d.id,
	d.designName,
	d.designNotes,
	d.quantity,
	d.isDeleted,
	GROUP_CONCAT(
		DISTINCT c.id
		GROUP BY c.id
	) AS colorsUsed
FROM designs AS d
	INNER JOIN design_colors AS dc 
		ON dc.designId = d.id
	INNER JOIN colors AS c 
		ON dc.colorId = c.id
	INNER JOIN yarnweights AS yw 
		ON c.yarnWeightId = yw.id
GROUP BY
	d.id
```

It returned objects like this:
```json
{
	"id": 3,
	"designName": "Slenderman",
	"designNotes": null,
	"quantity": 0,
	"isDeleted": 0,
	"colorsUsed": "4,5"
}
```

But while I get the ids of all the `colorsUsed` I do not get them in an array, let alone the array of objects I need there. I feel like GROUP_CONCAT isn't the right solution for this, or at least that I'm not using it correctly, but it's what comes up when I've been trying to find the solution. Just a point in the right direction to keep looking would be helpful too. 

---

My database is structured as so:
IMAGE HERE

With the tables as:

### designs
| id | designName	| quantity | isDeleted |designNotes |
| ---  | --- | --- | --- | --- | --- | --- |
| 1 | Snow White | 0 | 0 | "alter sleeve design to 3DCbob with alternating color method" |	
| 2 | Weeping Angel | 1 | 0 | "length arms to be able to tack over eyes" |
| 3 | Slenderman | 0 | 0 | "rewrite the lapel component" |
|

### design_colors
| colorId | designId |
| --- | --- |
| 1 | 1 |
| 2 | 1 |
| 3 | 1 |
| 4 | 1 |
| 5 | 1 |
| 6 | 1 |
| 7 | 1 |
| 8 | 2 |
| 4 | 3 |
| 5 | 3 |
|

### colors

| id | colorName | colorSwatch | brandName | yarnWeightId |
| --- | --- | --- | --- | --- |
| 1 | ocean | rgb (51,105,133) | caron simply soft | 5 |
| 2 | harvest red | rgb (181,32,37) | caron simply soft | 5 |
| 3 | royal blue | rgb (46,109,166) | caron simply soft | 5 |
| 4 | black | rgb (0,0,0) | caron simply soft | 5 |
| 5 | Off White | rgb (255,255,255) | caron simply soft | 5 |
| 6 | Lemonade | rgb (248,220,54) | caron simply soft | 5 |
| 7 | bone | rgb (237,208,173) | caron simply soft | 5 |
| 8 | gray heather | rgb (194,181,174) | caron simply soft | 5 |
| 9 | sage | rbg (80,183,145) | caron simply soft | 5 |
| 11 | pistashio | rbg (167,191,97) | caron simply soft | 5 |
|

### yarnweights

| id | weightNumber | weightName |
| --- | --- | --- |
| 1 | 0 | lace |
| 2 | 1 | super fine |
| 3 | 2 | fine |
| 4 | 3 | light/sports weight |
| 5 | 4 | medium/worst weight |
| 6 | 5 | bulky |
| 7 | 6 | super bulky |
|
