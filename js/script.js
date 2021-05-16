const heroku = "https://api-clone-picpay.herokuapp.com/";
const local = "http://localhost:3000/";
const var_api = local;


function logo() {
  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");
  var footer = document.getElementById("footer");
  var dialog = document.getElementById("dialog_index");

  wrapper_login.className = "desaparecer";
  wrapper_busca.className = "desaparecer";
  wrapper_cadastro.className = "desaparecer";
  wrapper_upload.className = "desaparecer";
  wrapper_index.className = "wrapper";
  footer.className = "footer";
  dialog.className = "desaparecer";
}

function iniciar() {
  var btn_logar = document.getElementById("btn_inicio");
  var login_mobile = document.getElementById("login_mobile");
  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");

  wrapper_login.className = "desaparecer";
  wrapper_busca.className = "desaparecer";
  wrapper_cadastro.className = "desaparecer";
  wrapper_upload.className = "desaparecer";
  btn_logar.addEventListener("click", function () {
    wrapper_index.className = "desaparecer";
    wrapper_login.className = "wrapper";
    wrapper_busca.className = "desaparecer";
    wrapper_cadastro.className = "desaparecer";
    wrapper_upload.className = "desaparecer";
  });

  login_mobile.addEventListener("click", function () {
    wrapper_index.className = "desaparecer";
    wrapper_login.className = "wrapper";
    wrapper_busca.className = "desaparecer";
    wrapper_cadastro.className = "desaparecer";
    wrapper_upload.className = "desaparecer";
  });
}

function pesquisar() {
  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");
  var token = localStorage.getItem("token");
  var dialog = document.getElementById("dialog_index");
  var mensagem = document.getElementById("mensagem_index");
  var btn_OK_index = document.getElementById("btn_OK_index");
  var btn_pesquisar = document.getElementById("btn_pesquisar");

  btn_pesquisar.addEventListener("click", function () {
    console.log("clicou");
    if (token == undefined) {
      mensagem.innerHTML =
        "Necessário estar logado para acessar pesquisa. Faça agora o login!";
      dialog.className = "dialog show";
    } else {
      wrapper_index.className = "desaparecer";
      wrapper_login.className = "desaparecer";
      wrapper_busca.className = "wrapper";
      wrapper_cadastro.className = "desaparecer";
      wrapper_upload.className = "desaparecer";
    }
  });

  btn_OK_index.addEventListener("click", function () {
    wrapper_index.className = "desaparecer";
    wrapper_login.className = "wrapper";
    wrapper_busca.className = "desaparecer";
    wrapper_cadastro.className = "desaparecer";
  });
}

function upload() {
  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");

  var dialog = document.getElementById("dialog_upload");
  var mensagem = document.getElementById("mensagem_upload");
  var btn_OK_upload = document.getElementById("btn_OK_upload");

  wrapper_index.className = "desaparecer";
  wrapper_login.className = "desaparecer";
  wrapper_busca.className = "desaparecer";
  wrapper_cadastro.className = "desaparecer";
  wrapper_upload.className = "wrapper";
  var button = document.getElementById("button_upload");
  var data = document.getElementById("input_data");
  var descricao = document.getElementById("input_descricao");
  var file = document.getElementById("button_escolher");
  var flag = 0;
  const formData = new FormData();

  button.onclick = function () {
    formData.append("file",file.files[0]);
    formData.append("data",data.value);
    formData.append("descricao",descricao.value);

    
    if (data.value.length > 0 && descricao.value.length > 0) { 
      axios
        .post(var_api + "upload",formData,{  headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          }})
        .then(function (response) {
          if (response.status == 200) {
            flag = 1;
            mensagem.innerHTML = "Upload realizado com Sucesso!";
            dialog.className = "dialog show";
          }
        })
        .catch(function (error) {
          mensagem.innerHTML = "Erro ao fazer upload!";
          dialog.className = "dialog show";
        });
    } else {
      mensagem.innerHTML = "Insira os dados!";
      dialog.className = "dialog show";
    } 

  }; 

  btn_OK_upload.addEventListener("click", function () {
    if(flag == 1){
      wrapper_index.className = "desaparecer";
      wrapper_login.className = "desaparecer";
      wrapper_busca.className = "wrapper";
      wrapper_cadastro.className = "desaparecer";
      wrapper_upload.className = "desaparecer"
    } else {
      dialog.className = "dialog";
    }
    
  });

}

function download(image){
  console.log(image);
  var img_busca = document.getElementById("img_busca");
  axios
      .get(var_api+"download/"+image)
      .then(function (res) {
        if(res){
          console.log(res);
          }
        else{
          console.log("Erro ao buscar a imagem!")
        }
      });
}


function busca_api() {
  var msg = document.getElementById("result");
  var button = document.getElementById("button_api");
  var search = document.getElementById("search");
  var button_upload = document.getElementById("btn_upload_page");

  var dialog = document.getElementById("dialog_busca");
  var mensagem = document.getElementById("mensagem_busca");
  var btn_OK_busca = document.getElementById("btn_OK_busca");


  button.addEventListener("click", function () {
    console.log(search.value);
    if(search.value != ''){
      axios
        .post(
          var_api+"upload/data",{
            data: search.value,
          }
        )
        .then(function (res) {
          if(res.data != null){
          console.log(res);
              msg.innerHTML =
                "Data: " +
                res.data.data +
                "<br>" +
                "Descrição: " +
                res.data.descricao +
                "<br>" + 
                `<img src="${var_api}download/${res.data.image_name}" width=300 height=200>`

            //  download()
            }
          else{
            msg.innerHTML =
              "Não foram encontrados eventos correspondentes a data " +
              search.value;
          }
        });
    } else {
      mensagem.innerHTML = "Selecione uma data!";
      dialog.className = "dialog show";
    }

  });

  button_upload.addEventListener("click", function () {

    var token = localStorage.getItem("token");
    console.log(token);
    axios
      .get(var_api + "adm", {
          headers: {
            "Authorization" : token
          },
      })
      .then(function (r) {
        if (r.status == 200) {
          upload();
        }

        else if(r.status == 403){
          mensagem.innerHTML = "Usuário não tem permissão!";
          dialog.className = "dialog show";
        }
      })
      .catch(function (error) {
        mensagem.innerHTML = "Usuário não tem permissão!";
        dialog.className = "dialog show";
      });

  }); 

  btn_OK_busca.addEventListener("click", function () {
    dialog.className = "dialog";
  });
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
  var dialog = document.getElementById("dialog_cadastro");
  var mensagem = document.getElementById("mensagem_cadastro");
  var btn_OK = document.getElementById("btn_OK_cadastro");
  var resposta = 400;

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
      email.classList.toggle("toggleFocusRed");
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
      confsenha.classList.toggle("toggleFocusRed");
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
        .post(var_api + "users", {
          email: email.value,
          password: senha.value,
        })
        .then(function (response) {
          if (response.status == 200) {
            /*alert("Cadastro realizado com sucesso");*/
            mensagem.innerHTML = "Cadastro realizado com sucesso!";
            dialog.className = "dialog show";
            resposta = response.status;
          }
        })
        .catch(function (error) {
          mensagem.innerHTML = "Erro ao cadastrar! Tente novamente!";
          dialog.className = "dialog show";
          resposta = 400;
        });
    } else {
      mensagem.innerHTML = "Usuário e/ou senha inválidos! Tente novamente!";
      dialog.className = "dialog show";
      resposta = 400;
    }
  });

  btn_OK.addEventListener("click", function () {
    dialog.className = "dialog";

    if (resposta == 200) {
      var wrapper_index = document.getElementById("wrapper_index");
      var wrapper_login = document.getElementById("wrapper_login");
      var wrapper_busca = document.getElementById("wrapper_busca");
      var wrapper_cadastro = document.getElementById("wrapper_cadastro");

      wrapper_index.className = "desaparecer";
      wrapper_login.className = "wrapper";
      wrapper_busca.className = "desaparecer";
      wrapper_cadastro.className = "desaparecer";
    }
  });
}

function login() {
  var form = document.getElementById("button_login");
  var username = document.getElementById("username_login");
  var passwd = document.getElementById("passwd_login");
  var verify_user = document.getElementById("verify_username_login");
  var verify_passwd = document.getElementById("verify_passwd_login");
  var resposta = 400;
  var btn_OK = document.getElementById("btn_OK_login");
  var dialog = document.getElementById("dialog_login");
  var mensagem = document.getElementById("mensagem_login");

  username.addEventListener("keyup", function () {
    if (verificaEmail(username)) {
      verify_user.innerHTML = "";
    } else {
      username.classList.toggle("toggleFocusRed");
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
    if (verificaEmail(username) && passwd.value.length >= 3) {
      var json = axios
        .post(var_api + "login", {
          email: username.value,
          password: passwd.value,
        })
        .then(function (r) {
          if (r.status == 200) {
            /*alert("Login efetuado com sucesso");*/
            console.log("Cadastro");
            localStorage.setItem("token", r.data.token);
            mensagem.innerHTML = "Login realizado com sucesso!";
            dialog.className = "dialog show";
            resposta = r.status;
          }
        })
        .catch(function (error) {
          console.log("Erro");
          mensagem.innerHTML = "Usuário e/ou senha incorretos!";
          dialog.className = "dialog show";
          resposta = 400;
        });
    } else {
      mensagem.innerHTML = "Usuário e/ou senha inválidos!";
      dialog.className = "dialog show";
      resposta = 400;
    }
  });

  btn_OK.addEventListener("click", function () {
    dialog.className = "dialog";
    var wrapper_busca = document.getElementById("wrapper_busca");
    var wrapper_login = document.getElementById("wrapper_login");
    var wrapper_index = document.getElementById("wrapper_index");
    var wrapper_cadastro = document.getElementById("wrapper_cadastro");
    var wrapper_upload = document.getElementById("wrapper_upload");

    if (resposta == 200) {
      //open("index.html");

      wrapper_busca.className = "wrapper";
      wrapper_login.className = "desaparecer";
      wrapper_index.className = "desaparecer";
      wrapper_cadastro.className = "desaparecer";
      wrapper_upload.className = "desaparecer";
      
    }
  });
}

function cadastro() {
  var link_cadastrar = document.getElementById("link_cadastrar");

  var wrapper_index = document.getElementById("wrapper_index");
  var wrapper_login = document.getElementById("wrapper_login");
  var wrapper_busca = document.getElementById("wrapper_busca");
  var wrapper_cadastro = document.getElementById("wrapper_cadastro");
  var wrapper_upload = document.getElementById("wrapper_upload");

  link_cadastrar.addEventListener("click", function () {
    wrapper_cadastro.className = "wrapper";
    wrapper_login.className = "desaparecer";
    wrapper_busca.className = "desaparecer";
    wrapper_index.className = "desaparecer";
    wrapper_upload.className = "desaparecer";
  });
}

function mobile() {
  var footer = document.getElementById("footer");
  footer.className = "desaparecer";
}
