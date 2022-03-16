class AuthController {
  static loginAction(req, res, next) {
    const VIEW_PATH = "auth/login";

    if (req.method !== "post") {
      return res.render(VIEW_PATH);
    }

    // validate and do something
  }

  static signupAction(req, res, next) {
    const VIEW_PATH = "auth/signup";

    if (req.method !== "post") {
      return res.render(VIEW_PATH);
    }
  }
}

module.exports = AuthController;
