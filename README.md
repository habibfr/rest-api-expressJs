# PROJECT STRUCTURE

## applications

Pada folder application akan berisi 1 file yang bernama application yang mana isi dari file application hanya memuat global middleware, Selain itu dibuatnya file application juga untuk memisahkan file server atau main app yang berisi proses listen port(menjalankan applikasi).

Menggapa file application dan server harus dipisahkan ????  
Tujuan file tersebut dipisahkan karena unutuk mempermudah proses automation testing(unit test) karena by default ketika kita menggunakan jest sebagai unit test jest tidak dapat menjalankan unit test jika source(target/server) contain proses listeningport(menjalankan server)

jadi file server digunakan untuk listening port(start server) dan file application digunakan untuk melakukan automation test

## controllers

Pada Folder controllers disini akan memuat semua file controllers

## db

Folder db disini akan memuat 2 folder yaitu config dan models :

- **config:** pada folder ini akan memuat konfigurasi-konfigurasi dari database, misalnya seperti koneksi database, database pooling dan sebagainya
- **models:** pada folder ini akan memuat semua model atau repository yang digunakan untuk berinteraksi dengan database.

## errors

Pada folder errors akan memuat semua jenis execptions atau custom exceptions, misalnya kita membuat sebuah custum exception yang digunakan untuk menghadle data yang tidak ditemukan didalam database maka kita bisa membuat file custom exception tersebut pada folder errors.

## middlewares

Pada folder middlewares ini akan memuat semua jenis middleware mulai dari :

- buil-in-middleware
- exception-handler-middleware
- third-party-midddleware
- application-middleware

## routes

Didalam folder routes akan memuat semua routes

## services

Didalam folder services akan memuat semua service dan bisnis logic dari applikasi

## utils

Folder utils atau bisa disebut juga dengan helper akan memuat semua kode(codingan) yang kurang relavan dengan proses bisnis logic atau untuk menyimpan fungsi yang sifatnya reussable(dipakai berkali-kali)

## validations

Pada folder validations disini akan memuat file-file validation atau codingan yang digunakan untuk melakukan validasi

## tests

pada foldet tests ini akan memuat semua file automation test(unit test)

## conclustions

Degan demikian maka kode yang akan dikembangkan menjadi modular dan tiap-tiap file akan berfokus pada logic nya masing-masing dan tiap-tiap logic menjadi desentralize(terletak pada tempatnya masing-masing sesuai dengan kriterianya). Dengan demikian harapanya akan mempermudah proses maintanance kode, ketika kita perlu melakukan perubahan pada suatu logic misalnya **_"Ah....saya sepertinya butuh mengubah response dari exception ketika terjadi Error UsrnameNotFound"_** maka kita hanya perlu mambukan folder exception dan mengubahnya sesuai dengan case.

Pada dasarnya filosofi dari struktur folder tesebut menganut filosofi Rak atau lemari. yang mana pada lemari atau rak buku dsb akan memisahkan baju atau buku sesuai dengan tempatnya masing-masing misalnya ketika kita ingin menyimpan baju main, baju kerja, baju tidur kita akan memisahkan tempat-tempat baju tersebut sesuai dengan tempatnya yang tujuan agar mudah kita ingin mencarinya ... **_"Ahh.... aku mau kerja maka aku bisa mencari baju kerjaku di lemari sesuai pada tempat baju kerja diletakan :)"_**

**Sallam Penullis** : _Diatas merupakan best practice versi penulis berdasarkan case-case yang pernah dialami oleh penulis jikalau temen-temen memiliki bestpractice yang lain lets discus now guys:) cheerss: >\_<_

**_Writen by anata alliano_**

# API SPEC

# User register

## Request

```json
{
  "firstName": "audia",
  "lastName": "naila",
  "email": "naila@adams.co.id",
  "password": "randomPass"
}
```

# Response

```json
{
  "message": "Successfully register"
}
```

# User register does not valid

## Request

```json
{
  "firstName": "audia",
  "lastName": "naila",
  "email": "nailaadams.co.id",
  "password": "randomPass"
}
```

## Response

```json
{
  "message": [
    {
      "validation": "email",
      "code": "invalid_string",
      "message": "Invalid email",
      "path": ["email"]
    }
  ]
}
```

# Register with duplicate email

## Request

```json
{
  "firstName": "audia",
  "lastName": "naila",
  "email": "another@gmail.com",
  "password": "randomPass"
}
```

## Response

```json
{
  "message": "email with another@gmail.com alredy use, please use another email"
}
```

# Register and create address directly

## Request

```json
{
  "firstName": "abdillah",
  "lastName": "Alli",
  "email": "another@gmail.com",
  "password": "secreet-pass",
  "Address": {
    "country": "Indonesian",
    "province": "East java",
    "city": "Surabaya",
    "vilage": "Konoha"
  }
}
```

## Response

```json
{
  "message": "Successfully register"
}
```

# Register and create address invalid

## Request

```json
{
  "firstName": 23498732,
  "lastName": "Alli",
  "email": "another@gmail.com",
  "password": "secreet-pass",
  "Address": {
    "country": "Indonesian",
    "province": "East java",
    "city": "Surabaya",
    "vilage": "Konoha"
  }
}
```

## Response

```json
{
  "message": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["firstName"],
      "message": "Expected string, received number"
    }
  ]
}
```

# Login

## Request

```json
{
  "email": "naila@adams.co.id",
  "password": "randomPass"
}
```

## Response

```json
{
  "message": "successfully login",
  "token": "546fa1df-274e-4fae-937c-e6ca6d13d38e"
}
```

# Invalid login

## Request

```json
{
  "email": "nailaadams.co.id",
  "password": "randomPass"
}
```

## Response

invalid type

```json
{
  "message": [
    {
      "validation": "email",
      "code": "invalid_string",
      "message": "Invalid email",
      "path": ["email"]
    }
  ]
}
```

# Logi with wrong account

## Request

```json
{
  "email": "naila@adams.co.id",
  "password": "randomPass"
}
```

## Response

```json
{
  "message": "email or password wrong"
}
```

# Login with invalid type

## Request

```json
{
  "email": "somethingadams.co.id",
  "password": 1342254
}
```

## Response

```json
{
  "message": [
    {
      "validation": "email",
      "code": "invalid_string",
      "message": "Invalid email",
      "path": ["email"]
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["password"],
      "message": "Expected string, received number"
    }
  ]
}
```

# Login suucessfully

## Request

```json
{
  "email": "naila@adams.co.id",
  "password": "randomPass"
}
```

## Response

```json
{
  "message": "successfully login",
  "token": "650b6ba2-1952-4a32-a62f-7dbd29ad2a31"
}
```

# Create product

Required : X-API-TOKEN

## Requst

```json
{
  "name": "Rinso",
  "category": "Sembako"
}
```

## Response

```json
{
  "secureId": "31253071-1eff-4828-8d60-d6ebf24dac77",
  "id": 15,
  "name": "Rinso",
  "category": "Sembako",
  "updatedAt": "2024-05-23T05:36:32.747Z",
  "createdAt": "2024-05-23T05:36:32.747Z"
}
```

# Create address

Required: X-API-TOKEN

## Request

```json
{
  "country": "Indonesian",
  "province": "East java",
  "city": "Surabaya",
  "vilage": "Konoha"
}
```

## Response

```json
{
  "secureId": "ee976e56-d5d5-425e-a502-3b19292ea8aa",
  "id": 39,
  "country": "Indonesian",
  "province": "East java",
  "city": "Surabaya",
  "vilage": "Konoha",
  "UserId": 79,
  "updatedAt": "2024-05-23T05:38:19.072Z",
  "createdAt": "2024-05-23T05:38:19.072Z"
}
```

# Do Transaction(buy product)

Required: X-API-TOKEN

## Request

```json
{
  "productId": 14
}
```

## Response

```json
{
  "secureId": "545ce2e2-e182-4467-8ba9-38fcb2fcaa5f",
  "id": 12,
  "buyer": "abdillah",
  "product": "Rinso",
  "country": "Indonesian",
  "province": "East java",
  "city": "Surabaya",
  "vilage": "Konoha",
  "updatedAt": "2024-05-23T05:43:31.203Z",
  "createdAt": "2024-05-23T05:43:31.203Z"
}
```

# get all transaction

Required: X-API-TOKEN

## Rquest

`GET  http://localhost:9000/v1/transaction`

## Response

```json
[
  {
    "id": 11,
    "secureId": "8335e4d6-d876-440c-8417-08c59ff3774f",
    "product": "Rinso",
    "buyer": "abdillah",
    "country": "Indonesian",
    "province": "East java",
    "city": "Surabaya",
    "vilage": "Konoha",
    "createdAt": "2024-05-23T02:59:13.478Z",
    "updatedAt": "2024-05-23T02:59:13.478Z"
  },
  {
    "id": 12,
    "secureId": "545ce2e2-e182-4467-8ba9-38fcb2fcaa5f",
    "product": "Rinso",
    "buyer": "abdillah",
    "country": "Indonesian",
    "province": "East java",
    "city": "Surabaya",
    "vilage": "Konoha",
    "createdAt": "2024-05-23T05:43:31.203Z",
    "updatedAt": "2024-05-23T05:43:31.203Z"
  }
]
```
