const express = require('express')
const axios = require("axios")
const app = express()
const port = 3000

const PROFILE = process.env.PROFILE || "DEV"
const config = require("./config")[PROFILE]
console.log("PROFILE:", PROFILE)

app.get('/health', (req, res) => res.send({status: "OK"}))

app.get('/product-detail/:prodNo', async (req, res) => { 
	const prodNo = parseInt(req.params.prodNo)
	const prod = await getProd(prodNo)
	if (!prod)
			return res.status(404).send({msg: "상품이 없습니다."})
	const coupons = await getCoupons(prodNo);
	
	return res.send({ prod, coupons }) 
})

async function getProd(prodNo) {
	try {
		return (await axios.get(`${config.prodApiHost}/products/${prodNo}`)).data
	} catch (e) {
		console.log("## ERROR \n" + e)
		return null
	}
}

async function getCoupons(prodNo) {
	try {
		return (await axios.get(`${config.couponApiHost}/products/${prodNo}/coupons`)).data
	} catch (e) {
		console.log("## ERROR \n" + e)
		return []
	}
}

app.listen(port, () => console.log(`App listening on port ${port}!`))