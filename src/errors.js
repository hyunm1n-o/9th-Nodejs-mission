// 중복 이메일
export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 유저 에러
export class UserNotFoundError extends Error {
  errorCode = "U002";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 가게 에러
export class StoreNotFoundError extends Error {
  errorCode = "S001";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션 에러
export class MissionNotFoundError extends Error {
  errorCode = "M001";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션 상태 에러
export class MissionNotInProgressError extends Error {
  errorCode = "M002";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 중복 미션 에러
export class DuplicateMissionError extends Error {
  errorCode = "M003";
  statusCode = 409;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}