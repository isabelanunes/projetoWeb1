function busca_api() {
  console.log("entrou");
  var login = localStorage.getItem("login");
  var msg = document.getElementById("result");

  if (login == null) {
    var li = document.createElement("li");
    li.innerHTML =
      "Necessário estar logado para acessar pesquisa. Faça agora o " +
      "<a href=" +
      "login.html" +
      ">Login</a>";
    msg.appendChild(li);
  } else {
    //função da API com axios
  }
}


function verificaEmail(email) {
  usuario = email.value.substring(0, email.value.indexOf("@")); // pega a primeira parte do email, usuario
  dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length); // pega a segunda parte, o dominio

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {

    return true;
  }
  else {

    return false;
  }
}

function cadastrar() {
  var btn_cadastrar = document.getElementById('button');
  var email = document.getElementById('email')
  var senha = document.getElementById('senha')
  var confsenha = document.getElementById('confsenha')

  var val_email = document.getElementById('email-verify')
  var val_senha = document.getElementById('senha-verify')
  var val_confsenha = document.getElementById('confsenha-verify')
  var aux_email = false
  var aux_senha = false

  email.addEventListener("keyup", function () {

    if (email.value == '') {
      val_email.innerHTML = "Email deve ser preenchido";
    }

    else if (verificaEmail(email)) {
      aux_email = true;
      val_email.innerHTML = "";
    }

    else {
      val_email.innerHTML = "Email inválido";
    }

  });

  senha.addEventListener("keyup", function () {

    if (senha.value == '') {
      val_senha.innerHTML = "Senha deve ser preenchida";
      val_confsenha.innerHTML = "";
    }

    if (senha.value.length < 4) {
      val_senha.innerHTML = "Senha inválida";
      val_confsenha.innerHTML = "";
    }

    else {
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "";
    }

  });

  confsenha.addEventListener("keyup", function () {

    if (senha.value == confsenha.value) {
      aux_senha = true;
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "";
    }

    else if (senha.value != confsenha.value) {
      val_senha.innerHTML = "";
      val_confsenha.innerHTML = "Senhas não conferem";
    }

    else {
      val_confsenha.innerHTML = "";
    }

  });

  // Para executar, deve usar o email = eve.holt@reqres.in e senha = pistol

  btn_cadastrar.addEventListener("click", function () {

    if (aux_email == true && aux_senha == true) {
      var json = axios.post("https://reqres.in/api/register", {
        "email": email.value,
        "password": senha.value
      })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            alert("Cadastro realizado com sucesso");
            open('login.html');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  });
}
