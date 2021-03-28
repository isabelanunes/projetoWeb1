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
