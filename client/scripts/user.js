export default class UserRegister {
  constructor() {}
  initialize() {
    let signout = document.querySelector(".signout");

    if (signout) {
      signout.addEventListener("click", this.signout);
    }
  }
  renderLogin() {
    let fragment = document.createElement("template"),
      parentElement = document.querySelector(".signup"),
      template = this.getLoginTemplate();

    fragment.innerHTML = template;
    parentElement.appendChild(fragment.content);
    this.login();
  }
  renderRegister() {
    let fragment = document.createElement("template"),
      parentElement = document.querySelector(".signup"),
      template = this.getRegisterTemplate();

    fragment.innerHTML = template;
    parentElement.appendChild(fragment.content);
    this.registerEvents();
  }
  registerEvents() {
    let passwordField = document.querySelector('[name="password"]'),
      confirmPasswordField = document.querySelector(
        '[name="confirm-password"]'
      ),
      submitBtn = document.querySelector(".submit-signup");

    passwordField.addEventListener("focusout", this.comparePassword.bind(this));
    confirmPasswordField.addEventListener(
      "focusout",
      this.comparePassword.bind(this)
    );
    submitBtn.addEventListener("click", this.register.bind(this));
  }
  comparePassword() {
    let passwordField = document.querySelector('[name="password"]'),
      confirmPasswordField = document.querySelector(
        '[name="confirm-password"]'
      );

    if (
      passwordField.value &&
      confirmPasswordField.value &&
      passwordField.value != confirmPasswordField.value
    ) {
      this.showErrorMessage("Password doesnot match with confirm password");
    } else {
      return true;
    }
  }
  showErrorMessage(msg) {
    let errDiv = document.querySelector(".error");

    errDiv.innerHTML = msg;
    errDiv.classList.add("active");
    setTimeout(() => {
      errDiv.classList.remove("active");
    }, 5000);
    errDiv.focus();
  }

  showSuccessMessage(msg) {
    let successDiv = document.querySelector(".success");

    successDiv.innerHTML = msg;
    successDiv.classList.add("active");
    setTimeout(() => {
      successDiv.classList.remove("active");
    }, 5000);
    successDiv.focus();
  }

  getLoginTemplate() {
    return `<div class="left-side col-5 col-s-12">
      <h2 class="title">Login</h2>
      <span>Get access to your Ordrs, Wishlist and Recommendations</span>
    </div>
    <div class="right-side col-5 col-s-12">
      <div class="error"></div>
      <form action="" class="login-form">
        <label>
          <input
            type="email"
            name="email"
            required="required"
            onkeyup="this.setAttribute('data-value', this.value);"
          />
          <span>Email</span>
        </label>
        <label>
          <input type="password" name="password" required="required" />
          <span>Password</span>
        </label>
        <button type="submit" class="submit">Login</button>
      </form>
    </div>`;
  }

  getRegisterTemplate() {
    return `<div class="left-side col-5 col-s-12">
        <h2 class="title">SignUp</h2>
        <span>We donot share your personal details with anyone.</span>
    </div>
    <div class="right-side col-5 col-s-12">
        <div class="error"></div>
        <div class="success"></div>
        <form action="" class="login-form">
        <label>
            <input type="text" name="firstname" required="required" />
            <span>FirstName</span>
        </label>
        <label>
            <input type="text" name="lastname" required="required" />
            <span>LastName</span>
        </label>
        <label>
            <input
            type="email"
            name="email"
            required="required"
            onkeyup="this.setAttribute('data-value', this.value);"
            />
            <span>Email</span>
        </label>
        <label>
            <input type="password" name="password" required="required" />
            <span>Password</span>
        </label>
        <label>
            <input
            type="password"
            name="confirm-password"
            required="required"
            />
            <span>Confirm Password</span>
        </label>
        <button type="submit" class="submit-signup">Signup</button>
        </form>
    </div>`;
  }
  login() {
    let self = this,
      submitBtn = document.querySelector(".submit");

    if (submitBtn) {
      submitBtn.addEventListener("click", function (e) {
        let email = document.querySelector('input[name="email"]:valid'),
          password = document.querySelector('input[name="password"]:valid');

        if (email && password && email.value && password.value) {
          e.preventDefault();
          // For Sample purpose save the login details in LocalStorage without encrypt
          if (window.localStorage) {
            if (localStorage.getItem("users")) {
              let users = JSON.parse(localStorage.getItem("users")),
                user = users.filter((user) => user.email == email.value),
                restArr = users.filter((user) => user.email != email.value);

              if (user.length == 0) {
                self.showErrorMessage("This email does not exist !");
              } else {
                if (
                  user[0].email == email.value &&
                  user[0].password == password.value
                ) {
                  user[0].loggedIn = true;
                  restArr.push(user[0]);
                  localStorage.setItem("users", JSON.stringify(restArr));
                  window.location.href = "./product";
                } else {
                  self.showErrorMessage(
                    "Check your username and password doesnot match!"
                  );
                }
              }
            }
          }
        }
      });
    }
  }
  register(e) {
    let email = document.querySelector('input[name="email"]:valid'),
      password = document.querySelector('input[name="password"]:valid'),
      confirmPassword = document.querySelector(
        'input[name="confirm-password"]:valid'
      ),
      firstName = document.querySelector('input[name="firstname"]:valid'),
      lastName = document.querySelector('input[name="lastname"]:valid');

    if (
      email &&
      password &&
      confirmPassword &&
      firstName &&
      lastName &&
      email.value &&
      password.value &&
      confirmPassword.value &&
      firstName.value &&
      lastName.value &&
      this.comparePassword() == true
    ) {
      e.preventDefault();
      // For Sample purpose save the login details in LocalStorage without encrypt
      this.addUser({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      });
    } else if (!this.comparePassword()) {
      e.preventDefault();
    }
  }

  // For Sample purpose save the login details in LocalStorage
  addUser(userDetails) {
    if (window.localStorage) {
      if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users")),
          user = users.filter((user) => user.email == userDetails.email);

        if (user.length == 0) {
          users.push(userDetails);
          localStorage.setItem("users", JSON.stringify(users));
          this.showSuccessMessage(
            "You have successfully Registered your account! Login now."
          );
          document.querySelector(".login-form").reset();
        } else {
          this.showErrorMessage("Already Email Exist");
        }
      } else {
        localStorage.setItem("users", JSON.stringify([userDetails]));
        this.showSuccessMessage(
          "You have successfully Registered your account! Login now."
        );
      }
    }
  }
  static getLoggedUser() {
    if (window.localStorage) {
      if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users")),
          user = users.filter((user) => user.loggedIn == true);

        return user;
      }
    }
    return [];
  }
  signout() {
    if (window.localStorage && localStorage.getItem("users")) {
      let users = JSON.parse(localStorage.getItem("users")),
        user = users.filter((user) => user.loggedIn == true),
        restArr = users.filter((user) => user.loggedIn != true);

      user[0].loggedIn = false;
      restArr.push(user[0]);
      localStorage.setItem("users", JSON.stringify(restArr));
      localStorage.setItem("users", JSON.stringify(restArr));
    }
    window.location.href = "/login";
  }
}
