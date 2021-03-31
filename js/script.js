function busca_api() {
  console.log("entrou");
  var login = localStorage.getItem("login");
  var msg = document.getElementById("result");
  var button = document.getElementById("button_api");
  var search = document.getElementById("search");

  if (login == null) {
    var li = document.createElement("li");
    li.innerHTML =
      "Necessário estar logado para acessar pesquisa. Faça agora o " +
      "<a href=" +
      "login.html" +
      ">Login</a>";
    msg.appendChild(li);
  } else {
    button.addEventListener("click", function () {
      axios
        .get(
          "https://calendarific.com/api/v2/holidays?&api_key=bb433f717e522421e7b553183371f2c27a83feae&country=BR&year=" +
            search.value.substring(0, 4)
        )
        .then(function (res) {
          console.log(res.data.response.holidays);
          let docs = res.data.response.holidays;
          var i = 0;
          var control = 0;
          for (i; i < docs.length; i++) {
            if (docs[i].date.iso == search.value) {
              var li = document.createElement("li");
              li.innerHTML =
                "Date: " +
                docs[i].date.iso +
                "<br>" +
                "Name: " +
                docs[i].name +
                "<br>" +
                "Description: " +
                docs[i].description +
                "<br>" +
                "Country: " +
                docs[i].country.name +
                "<br>";

              msg.appendChild(li);
            } else {
              control++;
            }
          }

          if (control == i) {
            var li = document.createElement("li");
            li.innerHTML =
              "Não foram encontrados feriados correspondentes a data " +
              search.value;

            msg.appendChild(li);
          }
        });
    });
  }
}

function verificaEmail(email) {
  usuario = email.value.substring(0, email.value.indexOf("@")); // pega a primeira parte do email, usuario
  dominio = email.value.substring(
    email.value.indexOf("@") + 1,
    email.value.length
  ); // pega a segunda parte, o dominio

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search("@") == -1 &&
    dominio.search("@") == -1 &&
    usuario.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    return true;
  } else {
    return false;
  }
}

function cadastrar() {
  var btn_cadastrar = document.getElementById("button");
  var email = document.getElementById("email");
  var senha = document.getElementById("senha");
  var confsenha = document.getElementById("confsenha");

  var val_email = document.getElementById("email-verify");
  var val_senha = document.getElementById("senha-verify");
  var val_confsenha = document.getElementById("confsenha-verify");
  var aux_email = false;
  var aux_senha = false;

  email.addEventListener("keyup", function () {
    if (email.value == "") {
      val_email.innerHTML = "Email deve ser preenchido";
    } else if (verificaEmail(email)) {
      aux_email = true;
      val_email.innerHTML = "";
    } else {
      val_email.innerHTML = "Email inválido";
    }
  });

  senha.addEventListener("keyup", function () {
    if (senha.value == "") {
      val_senha.innerHTML = "Senha deve ser preenchida";
      val_confsenha.innerHTML = "";
    }

    if (senha.value.length < 4) {
      val_senha.innerHTML = "Senha inválida";
      val_confsenha.innerHTML = "";
    } else {
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "";
    }
  });

  confsenha.addEventListener("keyup", function () {
    if (senha.value == confsenha.value) {
      aux_senha = true;
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "";
    } else if (senha.value != confsenha.value) {
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "Senhas não conferem";
    } else {
      val_confsenha.innerHTML = "";
    }
  });

  // Para executar, deve usar o email = eve.holt@reqres.in e senha = pistol

  btn_cadastrar.addEventListener("click", function () {
    if (aux_email == true && aux_senha == true) {
      var json = axios
        .post("https://reqres.in/api/register", {
          email: email.value,
          password: senha.value,
        })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            alert("Cadastro realizado com sucesso");
            open("login.html");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}

function login() {
  alert("login");
  var form = document.getElementById("button_login");
  var username = document.getElementById("username");
  var passwd = document.getElementById("passwd");
  var verify_user = document.getElementById("verify_username");
  var verify_passwd = document.getElementById("verify_passwd");

  username.addEventListener("keyup", function () {
    if (verificaEmail(username)) {
      verify_user.innerHTML = "";
    } else {
      verify_user.innerHTML = "Não é um e-mail válido";
    }
  });

  passwd.addEventListener("keyup", function () {
    if (passwd.value.length < 3) {
      verify_passwd.innerHTML = "Não é uma senha válida";
    } else {
      verify_passwd.innerHTML = "";
    }
  });

  form.addEventListener("click", function (e) {
    var json = axios
      .post("https://reqres.in/api/login", {
        email: username.value,
        password: passwd.value,
      })
      .then(function (r) {
        if (r.status == 200) {
          alert("Login efetuado com sucesso");
          localStorage.setItem("login", username.value);
          localStorage.setItem(username.value, r.data.token);
          open("index.html");
        } else {
        }
      })
      .catch(function (error) {});
  });
}
