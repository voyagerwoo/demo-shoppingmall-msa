TAG=${1:-latest}
docker build -t voyagerwoo/demo-shoppingmall-coupon-service:${TAG} . && \
	docker push voyagerwoo/demo-shoppingmall-coupon-service:${TAG}