TAG=${1:-latest}
docker build -t voyagerwoo/demo-shoppingmall-front-service:${TAG} . && \
	docker push voyagerwoo/demo-shoppingmall-front-service:${TAG}