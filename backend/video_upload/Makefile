start:
	python src/main.py

proto:
	python -m grpc_tools.protoc -I . --python_out=. ./src/pb/video_processing.proto
	python -m grpc_tools.protoc -I . --python_out=. ./src/pb/video_receiving.proto
