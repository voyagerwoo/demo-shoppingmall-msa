const express = require('express')
const app = express()
const port = 3002

const coupons = [
	{
		"id": 1,
		"type": "RATE",
		"prodNos": [1, 2, 3],
		"value": 3,
	},
	{ "id": 2,
		"type": "PRICE",
		"prodNos": [2],
		"value": 1000,
	}
]

app.get('/products/:prodNo/coupons', (req, res) => { 
	const prodNo = parseInt(req.params.prodNo)
	if (!prodNo)
		return res.status(400).send("상품 번호가 유효하지 않습니다.")
	
	const results = coupons.filter(c => c.prodNos.includes(prodNo))
	return res.send(results) 
})

app.listen(port, () => console.log(`App listening on port ${port}!`))