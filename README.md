<div align="center">
  
  ![logo-picsfem](logo-picsfem.png)

  # PicsFem: sua comunidade feminina de fotografia
  
 <br>

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" style="height: 30px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" style="height: 30px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" style="height: 30px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" style="height: 30px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" alt="Node.js" style="height: 30px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" alt="Jest" style="height: 30px;"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" style="height: 30px;"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" style="height: 30px;"/>

  <br>
  
  **Status do Projeto:** _Concluído_ 

  Confira o resultado do projeto [aqui](https://amanda-holanda.github.io/SAP008-social-network/) ou no QR code a seguir:

  ![qrcode](qrcode.png)
  
</div>

## Índice

* [1. Resumo do projeto](#1-resumo-do-projeto)
* [2. Definição de produto](#2-definição-de-produto)
* [3. Pesquisas de usuário](#3-pesquisas-de-usuário)
* [4. Histórias de usuário](#4-histórias-de-usuário)
* [5. Desenho da Interface de Usuário](#5-desenho-da-interface-de-usuário)
  * [5.1 Protótipo de baixa fidelidade](#51-protótipo-de-baixa-fidelidade)
  * [5.2 Protótipos de alta fidelidade](#52-protótipos-de-alta-fidelidade)
* [6. Testes manuais e de usabilidade](#6-testes-manuais-e-de-usabilidade)
* [7. Objetivos de aprendizagem](#7-objetivos-de-aprendizagem)
* [8. Considerações Técnicas](#8-considerações-técnicas)
* [9. Sobre as Desenvolvedoras](#9-sobre-as-desenvolvedoras)

***

## 1. Resumo do projeto

O projeto Social Network foi o terceiro projeto desenvolvido no bootcamp da [Laboratoria](https://www.laboratoria.la/br). O seu principal objetivo era construir uma rede social que permitisse à qualquer usuário criar uma conta de acesso, logar-se com ela, criar, editar, deletar e dar *likes* em publicações. Além disso, a aplicação deveria ser construída com múltiplas telas em Vanilla JavaScript. 

A partir disso, construiu-se a PicsFem: uma rede social desenvolvida para mulheres amantes de fotografia. O seu objetivo principal é construir uma comunidade segura para que mulheres que amam fotografia possam: compartilhar conhecimentos e dicas; se apoiar; aperfeiçoar técnicas; além de debater e sanar dúvidas técnicas e não técnicas sobre o tema.

Neste projeto, desenvolvemos habilidades sobre autenticação com Firebase Auth, persistência de dados com Firestore e encaminhamento (rotas) de páginas ou componentes, e fomos apresentadas ao conceito de SPA (Single Page Application).

## 2. Definição de produto

PicsFem é uma rede social desenvolvida para mulheres amantes de fotografia. O seu objetivo principal é construir uma comunidade segura para que essas mulheres possam compartilhar conhecimento e ideias sobre o tema, além de poderem alavancar suas carreiras no mercado de fotografia, que ainda é marjoritariamente masculino.

Denominamos as usuárias de *"picfemers"* com o objetivo de torná-las mais conectadas com a comunidade e para que se sintam, ainda mais, pertecentes à rede.

## 3. Pesquisas de usuário

De acordo com pesquisas realizadas durante o desenvolvimento do projeto, relatou-se que mulheres fotógrafas possuem um grande desafio para adentrar no mercado de fotografia, pois este ainda é marjoritariamente masculino. Uma das futuras funcionalidades criadas seria a possibilidade de clientes poderem contratar mulheres fotógrafas para trabalhos freelancers através da PicsFem.

Um dos objetivos de aprendizagem do projeto era realizar entrevistas com os possíveis usuários. Para isso, utilizamos um form do google docs como ferramenta e neste criamos um formulário para compreender o perfil dos nossos possíveis usuários e analisar suas necessidades.
A priori, precisávamos conhecer o nosso público. Logo, iniciamos o questionário com perguntas como: nome, idade e como o usuário se identifica como pessoa. Dessa forma, foi identificado que nosso público seria majoritariamente feminino e em idades diversas.

<div align="center">

![1pesquisa](1-pesquisa.png)

</div>

Após a primeira identificação de nosso usuário, buscamos entender o seu perfil em relação ao propósito do site e a sua configuração pessoal, já que a aplicação web construída é voltada para o público amante de fotografia. Portanto, analisou-se as características vigentes e os possíveis interesses em utilizar o produto. Além disso, coletou-se: temas de interesse, relatos visando uma melhor usabilidade do produto e sugestões de possíveis implementações futuras.

<div align="center">

![2pesquisa](2-pesquisa.PNG)

</div>

Ao final da pesquisa, ficamos felizes com o resultado obtido, o qual foi muito importante para o direcionamento do desenvolvimento do projeto, além de nos dar uma melhor visão para implementações futuras na rede social, mediante possíveis investimentos.

## 4. Histórias de usuário

Após compreender melhor as necessidades de nossas usuárias, determinamos as Histórias de Usuário, que representam o que elas precisam na Rede Social.

### História de usuário 1: 
> "Como usuária, eu gostaria de fazer o login utilizando a minha conta do google, com o objetivo de otimizar o meu tempo."

* **Critérios de aceitação:**
  * página de login
  * página de cadastro

* **Definição de pronto:**
  * A história implementada foi testada com, pelo menos, 3 usuários e foram incorporados os melhoramentos necessários identificados nos testes de usabilidade
  * Finalizou-se a SPA (Single Page Application)
  * A página de login estava responsiva para todas as telas
  * Construiu-se o teste da função de logar com o google
  * Recebeu-se o code review de pelo menos uma parceira de equipe
  * Realizou-se o deploy utilizando o git tag.
  
* **Implementações após testes com usuárias:**
  * Tiramos a fotografia do layout da página de login para os tablets, pois o usuário relatou que o formulário não ficava tão legível, já que a imagem achatava o seu design
  * Colocamos o botão de voltar no formulário de criar conta, pois o usuário relatou que sentiu dificuldade em retornar para a página anterior, além de não ter ficado claro para ele como retornava

### História de usuário 2: 
> Eu como entusiasta de fotografias, gostaria de publicar dicas sobre edição de fotos com o objetivo de compartilhar meus conhecimentos com a comunidade. Porém, também, gostaria de editar ou removê-las depois, para melhorar a qualidade das publicações.

### História de usuário 3: 
> Como PicsFemer, eu gostaria de interagir com as minhas outras colegas de comunidade através de likes, com o objetivo de me conectar melhor com elas.

### História de usuário 4: 
> Como usuária de redes sociais, gostaria de poder sair da minha conta da PicsFem, com o objetivo de não deixar tantas contas de redes sociais abertas ao mesmo tempo. 

## 5. Desenho da Interface de Usuário

### 5.1 Protótipo de baixa fidelidade

![baixafidelidade](baixa-fidelidade.png)

### 5.2 Protótipos de alta fidelidade

![1altafidelidade](1-altafidelidade.png)
![2altafidelidade](2-altafidelidade.png)
![3altafidelidade](3-altafidelidade.png)
![4altafidelidade](4-altafidelidade.png)

## 6. Testes manuais e de usabilidade
Após fazermos os testes manuais e de usabilidade, incorporamos os feedbacks dados pelos usuários, e fizemos as seguintes mudanças.
#### 6.1. Tiramos a fotografia do layout da página de login para os tablets, pois o usuário relatou que o formulário não ficava tão legível, já que a imagem achatava o seu design.
#### 6.2. Colocamos o botão de voltar no formulário de criar conta, pois o usuário relatou que sentiu dificuldade em retornar para a página anterior, além de não ter ficado claro para ele como retornava.

## 7. Objetivos de aprendizagem
### Testes unitários e testes assíncronos
### Outros objetivos
### Trello/planejamento

## 8. Considerações Técnicas

## 8.1. Boilerplate

![boilerplate](src/img/boilerplatee.png)

## 8.2. Texto

## 8.3. Ferramentas utilizadas


## 9. Sobre as Desenvolvedoras
Projeto desenvolvido em equipe por: 
* Amanda Holanda: [Linkedin](https://www.linkedin.com/in/amandaholanda/) | [GitHub](https://github.com/amanda-holanda)
* Isabella Lima [Linkedin](https://www.linkedin.com/in/isa-bella-lima/) | [GitHub](https://github.com/Bellalimalima)
* Gleyciane Macena [Linkedin](https://www.linkedin.com/in/gleyciane-macena-costa/) | [GitHub](https://github.com/Gleyciane-Macena)
