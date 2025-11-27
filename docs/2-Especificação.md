# Especificações Do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

> Apresente uma visão geral do que será abordado nesta parte do
> documento, enumerando as técnicas e/ou ferramentas utilizadas para
> realizar a especificações do projeto

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em
se desenvolver profissionalmente através de um mestrado fora do país,
pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está
buscando uma agência que o ajude a encontrar universidades na Europa
que aceitem alunos estrangeiros.

Maria tem 31 anos, é cozinheira de restaurante, solteira e mãe de um filho. Gosta de cozinhar e sair com o filho em seus momentos livres. Apesar de ser independente e tranquila, busca se renovar profissionalmente e proporcionar uma vida melhor para o filho. Costuma fazer compras semanais no mercado e valoriza muito a economia, procurando produtos com preço acessível. Para ela, é importante que as informações sobre preços e validade dos alimentos estejam sempre visíveis e claras.

José Alberto tem 41 anos, é casado e trabalha como gerente de supermercado. Ganha em torno de R$ 4.500,00 por mês e gosta de assistir futebol. É uma pessoa mais fechada e dominante, com pouca familiaridade com tecnologia, mas muito preocupado em reduzir perdas no supermercado e aumentar as vendas. Frequentador de bairros e estádios de futebol, pensa em se aposentar e, no futuro, viver em uma roça. Precisa de sistemas simples e acessíveis que ajudem a otimizar sua gestão no trabalho.

Ana Paula Ferreira tem 34 anos, é casada, mãe de duas crianças de 6 e 9 anos, e trabalha como atendente de call center. Sua renda mensal gira em torno de R$ 2.800,00, e ela gosta de cozinhar pratos rápidos para a família. Prática e organizada, busca sempre economizar e garantir uma alimentação saudável para os filhos. Costuma usar o celular e o computador para pesquisar preços e promoções, e geralmente faz as compras à noite, após o trabalho. Sonha em equilibrar melhor as contas da família e oferecer mais conforto e lazer em casa, por isso procura por soluções claras e intuitivas que facilitem sua rotina de consumo.


> Enumere e detalhe as personas da sua solução. Para
> tanto, baseie-se tanto nos documentos disponibilizados na disciplina
> e/ou nos seguintes links:
>
> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)

**Mapa de Stakeholders**
- Pessoas Fundamentais - Consumidor e supermercados.
- Pessoas Importantes - Governo.
- Pessoas Influenciadoras - Anvisa.

>
> Lembre-se que você deve ser enumerar e descrever precisamente e
> personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Comprador  | me cadastrar no sistema          | que meus dados fiquem salvos e eu possa usar o site de forma personalizada.               |
|Cliente       |  visualizar todos os produtos logo na página inicial                 | economizar tempo e escolher rapidamente o que preciso comprar |
|Cliente        | filtrar os produtos por categoria                 | encontrar mais facilmente o que estou procurando. |
|Cliente        | adicionar e remover produtos do carrinho                | ter controle do que vou comprar.  |
|Cliente        | finalizar a compra e ver um resumo dos produtos escolhidos                 | confirmar minha decisão de compra. |
|Lojista       | alterar ou excluir um produto cadastrado                | manter a lista atualizada e evitar informações erradas. |

> Apresente aqui as histórias de usuário que são relevantes para o
> projeto de sua solução. As Histórias de Usuário consistem em uma
> ferramenta poderosa para a compreensão e elicitação dos requisitos
> funcionais e não funcionais da sua aplicação. Se possível, agrupe as
> histórias de usuário por contexto, para facilitar consultas
> recorrentes à essa parte do documento.
>
> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve fazer o cadastro do usuário. | ALTA | 
|RF-002| O sistema deve exibir produtos na página inicial.    | ALTA |
|RF-003| O sistema deve permitir que o usuário filtre os produtos.   | BAIXA |
|RF-004| O sistema deve permitir que o usuário salve os produtos para a compra | MÉDIA |
|RF-005|O usuário deve ser capaz de remover produtos do carrinho.   | ALTA |
|RF-006| O sistema deve permitir adicionar produtos no carrinho.    | ALTA |
|RF-007| O sistema deve permitir que o usuário finalize a compra.   | MÉDIA |
|RF-008| O sistema deve exibir uma confirmação antes de excluir um produto.   | BAIXA |
|RF-009| O sistema deve permitir visualizar os detalhes de um produto.   | MÉDIA |
|RF-010| O sistema deve permitir excluir um produto da loja depois do cadastro.   | MÉDIA |
|RF-011| O sistema deve permitir a alteração de dados de/do produto(s).   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema será publicado no GitHub Pages.  | MÉDIA | 
|RNF-002|O site deverá ser desenvolvido utilizando HTML, CSS e JavaScript para persistência em LocalStorage.  |  BAIXA | 
|RNF-003|O sistema deve ser responsivo para diferentes telas. | MÉDIA | 



## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


> Enumere as restrições à sua solução. Lembre-se de que as restrições
> geralmente limitam a solução candidata.
> 
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)


