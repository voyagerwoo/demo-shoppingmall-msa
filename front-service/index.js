const express = require('express')
const axios = require("axios")
const app = express()
const port = 8080

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
	const couponPrice = getCouponPrice(prod, coupons)
	return res.send({ prod, coupons, couponPrice }) 
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

function getCouponPrice(prod, coupons) {
	if (!coupons || coupons.length == 0)
		return prod.price 
	const firstCoupon = coupons[0]
	if (firstCoupon.type === 'RATE')
		return parseInt(prod.price * ((100 - firstCoupon.value) / 100))
	else if (firstCoupon.type === 'PRICE')
		return prod.price - firstCoupon.value
	return prod.price 
}

app.listen(port, () => console.log(`App listening on port ${port}!`))