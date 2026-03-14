"use strict"
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.")
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var _a
exports.__esModule = true
exports.loginViaUI =
  exports.logoutTestUser =
  exports.loginTestUser =
  exports.createTestUser =
    void 0
// tests/helpers/authHelper.ts
var test_1 = require("@playwright/test")
var testUser_1 = require("./testUser")
var signInPage_1 = require("tests/pages/authentication/signInPage")
var AUTH_URL =
  (_a = process.env.NEXT_PUBLIC_AUTH_URL) !== null && _a !== void 0
    ? _a
    : "http://localhost:3001"
var buildTestUser = function () {
  return {
    email: "testuser_" + Date.now() + "@test.com",
    password: "Test@" + Date.now(),
    firstName: "Test",
    lastName: "User",
  }
}
var apiCall = function (apiContext, method, endpoint, options) {
  if (options === void 0) {
    options = {}
  }
  return __awaiter(void 0, void 0, void 0, function () {
    var response
    return __generator(this, function (_a) {
      response = apiContext[method.toLowerCase()](
        "" + AUTH_URL + endpoint,
        options
      )
      //const body =  await response.json()
      return [2 /*return*/, response]
    })
  })
}
var authHeaders = function (accessToken) {
  return {
    Authorization: "Bearer " + accessToken,
  }
}
exports.createTestUser = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    var apiContext,
      userData,
      response,
      body,
      setPasswordRes,
      accessToken,
      refreshToken,
      user
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, test_1.request.newContext()]
        case 1:
          apiContext = _a.sent()
          userData = buildTestUser()
          _a.label = 2
        case 2:
          _a.trys.push([2, , 6, 8])
          return [
            4 /*yield*/,
            apiCall(apiContext, "POST", "/auth/register-email", {
              data: { email: userData.email },
            }),
          ]
        case 3:
          response = _a.sent()
          if (response.status() !== 201) {
            throw new Error(
              "Registration failed with status: " + response.status()
            )
          }
          return [4 /*yield*/, response.json()]
        case 4:
          body = _a.sent()
          return [
            4 /*yield*/,
            apiCall(apiContext, "PATCH", "/auth/set-password", {
              headers: authHeaders(body.access_token),
              data: {
                password: userData.password,
              },
            }),
          ]
        case 5:
          setPasswordRes = _a.sent()
          if (setPasswordRes.status() !== 200) {
            throw new Error(
              "Failed to set password with status: " + setPasswordRes.status()
            )
          }
          accessToken = body.access_token
          refreshToken = body.refresh_token
          user = {
            email: userData.email,
            password: userData.password,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }
          testUser_1.setTestUser(user)
          return [2 /*return*/, user]
        case 6:
          return [4 /*yield*/, apiContext.dispose()]
        case 7:
          _a.sent()
          return [7 /*endfinally*/]
        case 8:
          return [2 /*return*/]
      }
    })
  })
}
exports.loginTestUser = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    var apiContext, user, loginRes, loginData, updatedUser
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, test_1.request.newContext()]
        case 1:
          apiContext = _a.sent()
          user = testUser_1.getTestUser()
          _a.label = 2
        case 2:
          _a.trys.push([2, , 4, 6])
          return [
            4 /*yield*/,
            apiCall(apiContext, "POST", "/auth/login", {
              data: {
                email: user.email,
                password: user.password,
              },
            }),
          ]
        case 3:
          loginRes = _a.sent()
          if (loginRes.response.status() !== 200) {
            throw new Error(
              "Login failed with status: " + loginRes.response.status()
            )
          }
          loginData = loginRes.body
          updatedUser = __assign(__assign({}, user), {
            accessToken: loginData.access_token,
            refreshToken: loginData.refresh_token,
          })
          testUser_1.setTestUser(updatedUser)
          return [2 /*return*/, updatedUser]
        case 4:
          return [4 /*yield*/, apiContext.dispose()]
        case 5:
          _a.sent()
          return [7 /*endfinally*/]
        case 6:
          return [2 /*return*/]
      }
    })
  })
}
exports.logoutTestUser = function () {
  return __awaiter(void 0, void 0, Promise, function () {
    var apiContext, user
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, test_1.request.newContext()]
        case 1:
          apiContext = _a.sent()
          user = testUser_1.getTestUser()
          _a.label = 2
        case 2:
          _a.trys.push([2, , 4, 6])
          return [
            4 /*yield*/,
            apiCall(apiContext, "POST", "/auth/logout", {
              headers: authHeaders(user.accessToken),
            }),
          ]
        case 3:
          _a.sent()
          return [3 /*break*/, 6]
        case 4:
          return [4 /*yield*/, apiContext.dispose()]
        case 5:
          _a.sent()
          return [7 /*endfinally*/]
        case 6:
          return [2 /*return*/]
      }
    })
  })
}
function loginViaUI(page, email, password) {
  return __awaiter(this, void 0, Promise, function () {
    var signInPage
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          signInPage = new signInPage_1.SignInPage(page)
          return [4 /*yield*/, signInPage.navigateToSignIn()]
        case 1:
          _a.sent()
          return [4 /*yield*/, signInPage.enterEmail(email)]
        case 2:
          _a.sent()
          return [4 /*yield*/, signInPage.enterPassword(password)]
        case 3:
          _a.sent()
          return [4 /*yield*/, signInPage.clickSignInButton()]
        case 4:
          _a.sent()
          return [4 /*yield*/, signInPage.verifySignInOk()]
        case 5:
          _a.sent()
          return [2 /*return*/]
      }
    })
  })
}
exports.loginViaUI = loginViaUI
