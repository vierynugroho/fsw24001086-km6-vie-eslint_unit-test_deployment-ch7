<h1 align="center">
  Chapter 7 - Challenge
</h1>

# Sebelum Test Lakukan Hal Berikut

### AuthenticationController.test.js

1. tambahkan token login
   ```
   //! login here: http://localhost:8000/documentation
   //? token from user:
   // "email": "johnny@binar.co.id",
   // "password": "123456"
   //? user id on database must be 1
   ```

### CarController.test.js

1. ubah id pada `mockRequest.params.id = 2;` pada handleUpdateCar (sesuaikan dengan data mobil yang ada pada database)
2. ubah id pada `mockRequest.params.id = 2;` pada handleDeleteCar (sesuaikan dengan data mobil yang ada pada database)
3. ##### atau bisa juga jalankan ulang migrasi dan seeder

## 😪catatan

- authentication controller terdapat 1 yang tidak dapat di test karena error
  ERROR: insert or update on table "Users" violates foreign key constraint "Users_roleId_fkey"
- karena error itu tidak bisa dilakukan testing karena data tidak bisa dimanipulasi melalui tes

# Last Coverage

| File                           | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ------------------------------ | --------- | ---------- | --------- | --------- | ------------------- |
| All files                      | 97.76     | 71.35      | 75.94     | 97.76     |
| app/controllers                | 99.48     | 68.54      | 73.48     | 99.48     |
| ApplicationController.js       | 100       | 100        | 100       | 100       |
| AuthenticationController.js    | 98.72     | 65.18      | 70.49     | 98.72     | 120-121             |
| CarController.js               | 100       | 68.9       | 75        | 100       | 2,62                |
| index.js                       | 100       | 100        | 100       | 100       |
| app/errors                     | 96.42     | 100        | 84.61     | 96.42     |
| ApplicationError.js            | 100       | 100        | 100       | 100       |
| CarAlreadyRentedError.js       | 84.61     | 100        | 50        | 84.61     | 9-10                |
| EmailNotRegisteredError.js     | 85.71     | 100        | 50        | 85.71     | 10-11               |
| InsufficientAccessError.js     | 100       | 100        | 100       | 100       |
| NotFoundError.js               | 100       | 100        | 100       | 100       |
| RecordNotFoundError.js         | 100       | 100        | 100       | 100       |
| WrongPasswordError.js          | 100       | 100        | 100       | 100       |
| index.js                       | 100       | 100        | 100       | 100       |
| app/models                     | 94.41     | 90.9       | 92.3      | 94.41     |
| car.js                         | 100       | 100        | 100       | 100       |
| index.js                       | 97.22     | 66.66      | 100       | 97.22     | 13                  |
| role.js                        | 100       | 100        | 100       | 100       |
| user.js                        | 78.04     | 100        | 75        | 78.04     | 17-25               |
| usercar.js                     | 100       | 100        | 100       | 100       |
| config                         | 100       | 100        | 100       | 100       |
| application.js                 | 100       | 100        | 100       | 100       |
| database.js                    | 100       | 100        | 100       | 100       |
| ------------------------------ | --------- | ---------- | --------- | --------- | ------------------- |

Test Suites: 4 passed, 4 total
Tests: 32 passed, 32 total
Snapshots: 0 total
Time: 8.198 s, estimated 10 s
Ran all test suites.

# Data Diri

|                  |                          |
| ---------------- | ------------------------ |
| ID Peserta       | **FSW2402KM6024**        |
| Nama Peserta     | **Viery Nugroho**        |
|                  |                          |
| Kelas            | **FSW 1**                |
|                  |                          |
| ID Fasil         | **F-FSW24001086**        |
| Nama Fasilitator | **Imam Taufiq Hermawan** |
|                  |                          |

# Fullstack Web Development

### KM x Binar Academy Batch 6

|                                                        |
| ------------------------------------------------------ |
| **Catatan**                                            |
| Submission Chapter 7 - Unit Testing API Car Management |
