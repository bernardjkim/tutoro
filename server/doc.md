# Users

## Create A User

_API endpoint_

`POST hostname/api/user`

_HEADER VALUES_

| Header                                                    | Value                               |
| --------------------------------------------------------- | ----------------------------------- |
| `Content-Type` <br><span class="required">REQUIRED</span> | `application/x-www-form-urlencoded` |

_REQUSET PARAMETERS (form)_

| Element                                                | Detail                |
| ------------------------------------------------------ | --------------------- |
| `email` <br><span class="required">REQUIRED</span>     | ---                   |
| `password` <br><span class="required">REQUIRED</span>  | ---                   |
| `password2` <br><span class="required">REQUIRED</span> | Must match password2. |

### Response

A successful response contains an authorization token.

> Example JSON response

```json
{
  "success": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsI..."
}
```

_RESPONSE PARAMETERS_

| Element   | Detail               |
| --------- | -------------------- |
| `success` | ---                  |
| `token`   | Authorization token. |

## Get The Current User

_API endpoint_

`GET hostname/api/user/current`

_HEADER VALUES_

| Header                                                     | Value                     |
| ---------------------------------------------------------- | ------------------------- |
| `Authorization` <br><span class="required">REQUIRED</span> | User authorization token. |

### Response

A successful response contains a user's id and email

> Example JSON response

```json
{
  "id": "5c41009ba89d4306ea54db65",
  "email": "test@uw.edu"
}
```

_RESPONSE PARAMETERS_

| Element | Detail |
| ------- | ------ |
| `id`    | ---    |
| `email` | ---    |

## Get a User

_API endpoint_

`GET hostname/api/user/:id`

_REQUSET PARAMETERS_

| Element                                         | Detail                      |
| ----------------------------------------------- | --------------------------- |
| `id` <br><span class="required">REQUIRED</span> | Specified user's id to get. |

### Response

A successful response contains a user's id and email

> Example JSON response

```json
{
  "id": "5c41009ba89d4306ea54db65",
  "email": "test@uw.edu"
}
```

_RESPONSE PARAMETERS_

| Element | Detail |
| ------- | ------ |
| `id`    | ---    |
| `email` | ---    |

---

# Profiles

## Create A profile

_API endpoint_

`POST hostname/api/profile`

_HEADER VALUES_

| Header                                                     | Value                     |
| ---------------------------------------------------------- | ------------------------- |
| `Content-Type` <br><span class="required">REQUIRED</span>  | `multipart/form-data`     |
| `Authorization` <br><span class="required">REQUIRED</span> | User authorization token. |

_REQUSET PARAMETERS (form)_

| Element                                                 | Detail              |
| ------------------------------------------------------- | ------------------- |
| `firstName` <br><span class="required">REQUIRED</span>  | ---                 |
| `lastName` <br><span class="required">REQUIRED</span>   | ---                 |
| `phone` <br><span class="required">REQUIRED</span>      | ---                 |
| `major`                                                 | Array of majors.    |
| `coursesTaken`                                          | Array of courses.   |
| `locationPreferences`                                   | Array of locations. |
| `languagePreferences`                                   | Array of languages. |
| `enrollment` <br><span class="required">REQUIRED</span> | Enrollment status.  |
| `file`                                                  | Profile picture.    |

### Response

A successful response contains a user's profile

> Example JSON response

```json
{
  "success": true,
  "profile": {
    "major": [],
    "coursesTaken": [],
    "locationPreferences": [],
    "languagePreferences": [],
    "_id": "5c4108fed4e1d0100ec58ede",
    "userId": "5c4108fdd4e1d0100ec58edd",
    "firstName": "first",
    "lastName": "last",
    "phone": "5555555555",
    "enrollment": "Freshman",
    "image": "1547766014195-test.png",
    "__v": 0
  }
}
```

_RESPONSE PARAMETERS_

| Element   | Detail |
| --------- | ------ |
| `success` | ---    |
| `profile` | ---    |

## Get The Current Profile

_API endpoint_

`GET hostname/api/profile/current`

_HEADER VALUES_

| Header                                                     | Value                             |
| ---------------------------------------------------------- | --------------------------------- |
| `Authorization` <br><span class="required">REQUIRED</span> | `Bearer eyJhbGciOiJIUzI1NiIsI...` |

### Response

A successful response contains a user's profile

> Example JSON response

```json
{
  "success": true,
  "profile": {
    "major": [],
    "coursesTaken": [],
    "locationPreferences": [],
    "languagePreferences": [],
    "_id": "5c4108fed4e1d0100ec58ede",
    "userId": "5c4108fdd4e1d0100ec58edd",
    "firstName": "first",
    "lastName": "last",
    "phone": "5555555555",
    "enrollment": "Freshman",
    "image": "1547766014195-test.png",
    "__v": 0
  }
}
```

_RESPONSE PARAMETERS_

| Element   | Detail |
| --------- | ------ |
| `success` | ---    |
| `profile` | ---    |

## Get A Profile

_API endpoint_

`GET hostname/api/profile/:id`

_REQUSET PARAMETERS_

| Element                                         | Detail                      |
| ----------------------------------------------- | --------------------------- |
| `id` <br><span class="required">REQUIRED</span> | Specified user's id to get. |

### Response

A successful response contains a user's profile

> Example JSON response

```json
{
  "success": true,
  "profile": {
    "major": [],
    "coursesTaken": [],
    "locationPreferences": [],
    "languagePreferences": [],
    "_id": "5c4108fed4e1d0100ec58ede",
    "userId": "5c4108fdd4e1d0100ec58edd",
    "firstName": "first",
    "lastName": "last",
    "phone": "5555555555",
    "enrollment": "Freshman",
    "image": "1547766014195-test.png",
    "__v": 0
  }
}
```

_RESPONSE PARAMETERS_

| Element   | Detail |
| --------- | ------ |
| `success` | ---    |
| `profile` | ---    |

---

# Sessions

## Create A Session

_API endpoint_

`POST hostname/api/session`

_HEADER VALUES_

| Header                                                    | Value                               |
| --------------------------------------------------------- | ----------------------------------- |
| `Content-Type` <br><span class="required">REQUIRED</span> | `application/x-www-form-urlencoded` |

_REQUSET PARAMETERS (form)_

| Element                                               | Detail |
| ----------------------------------------------------- | ------ |
| `email` <br><span class="required">REQUIRED</span>    | ---    |
| `password` <br><span class="required">REQUIRED</span> | ---    |

### Response

A successful response contains an authorization token.

> Example JSON response

```json
{
  "success": true,
  "token": "Bearer eyJhbGciOiJIUzI1NiIsI..."
}
```

_RESPONSE PARAMETERS_

| Element   | Detail               |
| --------- | -------------------- |
| `success` | ---                  |
| `token`   | Authorization token. |

---

# Languages

## Get A List Of Languages

_API endpoint_

`GET hostname/api/language`

### Response

A successful response contains a list of languages.

> Example JSON response

```json
{
  "success": true,
  "languages": [
    { "tag": "ab", "name": "Abkhaz", "nativeName": "аҧсуа" },
    { "tag": "aa", "name": "Afar", "nativeName": "Afaraf" },
    { "tag": "af", "name": "Afrikaans", "nativeName": "Afrikaans" },
    `...`
  ]
}
```

_RESPONSE PARAMETERS_

| Element     | Detail              |
| ----------- | ------------------- |
| `success`   | ---                 |
| `languages` | Array of languages. |

---

# Locations

## Get A List Of Locations

_API endpoint_

`GET hostname/api/locations`

### Response

A successful response contains a list of locations.

> Example JSON response

```json
{
  "success": true,
  "locations": [
    { "tag": "AER", "name": "Aerospace & Engineering Research Building" },
    { "tag": "ALB", "name": "Allen Library" },
    { "tag": "AND", "name": "Anderson Hall" },
    `...`
  ]
}
```

_RESPONSE PARAMETERS_

| Element     | Detail              |
| ----------- | ------------------- |
| `success`   | ---                 |
| `locations` | Array of locations. |

---

# Majors

## Get A List Of Majors

_API endpoint_

`GET hostname/api/majors`

### Response

A successful response contains a list of majors.

> Example JSON response

```json
{
  "success": true,
  "majors": [
    { "name": "Aeronautics and Astronautics" },
    { "name": "American Ethnic Studies" },
    { "name": "American Indian Studies" },
    `...`
  ]
}
```

_RESPONSE PARAMETERS_

| Element   | Detail           |
| --------- | ---------------- |
| `success` | ---              |
| `majors`  | Array of majors. |

---

# Courses

## Get A List Of Courses Names

_API endpoint_

`GET hostname/api/course`

### Response

A successful response contains a list of courses names.

> Example JSON response

```json
{
  "success": true,
  "courseNames": [
    { "name": "AFRAM" },
    { "name": "CMS" },
    { "name": "CHID" },
    `...`
  ]
}
```

_RESPONSE PARAMETERS_

| Element       | Detail                 |
| ------------- | ---------------------- |
| `success`     | ---                    |
| `courseNames` | Array of course names. |

## Get A List Of Courses

_API endpoint_

`GET hostname/api/course/:name`

_REQUSET PARAMETERS_

| Element                                           | Detail       |
| ------------------------------------------------- | ------------ |
| `name` <br><span class="required">REQUIRED</span> | Course name. |

### Response

A successful response contains a list of courses with specified name.

> Example JSON response

```json
{
  "success": true,
  "courses": [
    {
      "name": "AFRAM",
      "number": 101,
      "title": "Introduction to African American Studies"
    },
    {
      "name": "AFRAM",
      "number": 150,
      "title": "Introduction to African American History"
    },
    {
      "name": "AFRAM",
      "number": 214,
      "title": "Introduction African American Literature"
    },
    `...`
  ]
}
```

_RESPONSE PARAMETERS_

| Element   | Detail           |
| --------- | ---------------- |
| `success` | ---              |
| `course`  | Array of course. |

---

# Language
