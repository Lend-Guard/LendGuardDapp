## Backend API
Backend for DApp

### How to run?
```
docker build . -t backend
docker run -e "DB_CONN=" -e "DEBANK_API_KEY=" -p 8000:8000 -t backend
```
