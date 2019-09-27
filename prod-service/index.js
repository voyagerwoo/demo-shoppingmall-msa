const express = require('express')
const app = express()
const port = 3001

const products = {
	"1": {
		"name": "LG 17인치 모니터",
		"category": "PC 주변기기",
		"desc": "LG 모니터 너무 좋아요."
	},
	"2": {
		"name": "LG 19인치 모니터",
		"category": "PC 주변기기",
		"desc": "LG 모니터 너무 좋아요."
	},
	"3": {
		"name": "맥북 프로 15인치",
		"category": "랩탑/노트북",
		"desc": "맥북 좋아요!"
	},
	"2": {
		"name": "공유기",
		"category": "PC 주변기기",
		"desc": "공유 잘됩니다."
	}
}

app.get('/health', (req, res) => res.send({status: "OK"}))

app.get('/products/:prodNo', (req, res) => { 
	const { prodNo } = req.params
	const prod = products[prodNo]
	if (!prod)
		return res.status(404).send("상품이 없습니다.")
	return res.send(prod) 
})

app.listen(port, () => console.log(`App listening on port ${port}!`))