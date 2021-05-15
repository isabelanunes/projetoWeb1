const fs = require("fs");

fs.readFile("imagem.jpg", (erro, buffer) => {
  if (erro) {
    console.log(erro);
    return;
  }

  console.log("Arquivo lido");

  fs.writeFile("imagem2.jpg", buffer, (erro) => {
    if (erro) {
      console.log(erro);
      return;
    }

    console.log("Arquivo escrito com sucesso");
  });
});
