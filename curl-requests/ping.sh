url="localhost:$PORT/ping"

curl \
  -v \
  -w "\n%{http_code}\n" \
  $url
