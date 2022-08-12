const express = require('Express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//
app.use(bodyParser.urlencoded({extended: true}));


main().catch(err => console.log(err));

//conexão ao BD
async function main() {
  try {
    await mongoose.connect("mongodb+srv://userapi:qlvd8Wei7wLSM5S0@cluster0.6ogcejv.mongodb.net/Ecommerce", {useNewUrlParser: true}, {useUnifiedTopology: true});
} catch (error) {
    handleError(error);
} };

//create a data schema
const usuarioSchema = {
    cpf_cnpj: String,
    nome: String,
    razao_social: String,
    telefone: String,
    foto_perfil: String,
    id_login: String
}

const usuario = mongoose.model("usuario", usuarioSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})


//o body-parser permite pegar do html o value de acordo com o name
//salvar no BD
app.post("/", function(req, res) {
    let newUsuario = new usuario({
        cpf_cnpj: req.body.cpf_cnpj,
        nome: req.body.nome,
        razao_social: req.body.razao_social,
        telefone: req.body.telefone,
        foto_perfil: req.body.foto_perfil,
        id_login: req.body.id_login
    });
    newUsuario.save();
    //atualiza pág
    res.redirect('/');
})

app.listen(3000, function(){
    console.log('server is running');
})