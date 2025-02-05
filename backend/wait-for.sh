#!/bin/sh
# wait-for.sh

set -e

host="$1"
port="27017"
shift
cmd="$@"

until nc -z "$host" "$port"; do
  >&2 echo "MongoDB is unavailable - sleeping"
  sleep 1
done

>&2 echo "MongoDB is up - executing command"
exec $cmd
