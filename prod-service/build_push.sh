TAG=${1:-latest}
docker build -t voyagerwoo/demo-shoppingmall-prod-service:${TAG} . && \
	docker push voyagerwoo/demo-shoppingmall-prod-service:${TAG}