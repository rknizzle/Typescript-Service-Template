url="localhost:$PORT/ping"

curl \
  -w "\n%{http_code}\n" \
  $url
