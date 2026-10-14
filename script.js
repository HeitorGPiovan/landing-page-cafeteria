// ---------- Menu mobile ----------

const menuBotao = document.getElementById("menu-botao");
const menu = document.getElementById("menu");

menuBotao.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", aberto);
  menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu ao clicar em um link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
    menuBotao.setAttribute("aria-label", "Abrir menu");
  });
});

// ---------- Cardápio com abas ----------

const CARDAPIO = {
  cafes: [
    { nome: "Espresso", preco: 7 },
    { nome: "Cappuccino", preco: 12 },
    { nome: "Coado na hora", preco: 10 },
    { nome: "Latte", preco: 13 },
    { nome: "Mocha", preco: 14 },
    { nome: "Cold brew", preco: 15 },
  ],
  doces: [
    { nome: "Bolo de cenoura", preco: 11 },
    { nome: "Brownie", preco: 9 },
    { nome: "Cookie", preco: 8 },
    { nome: "Torta de limão", preco: 13 },
  ],
  salgados: [
    { nome: "Pão de queijo", preco: 6 },
    { nome: "Croissant", preco: 10 },
    { nome: "Misto quente", preco: 14 },
    { nome: "Quiche", preco: 16 },
  ],
};

const listaCardapio = document.getElementById("lista-cardapio");
const abas = document.querySelectorAll(".aba");

const formatarPreco = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function mostrarCategoria(categoria) {
  listaCardapio.innerHTML = CARDAPIO[categoria]
    .map(
      (item) => `
      <li class="item">
        <span class="item__nome">${item.nome}</span>
        <span class="item__pontos" aria-hidden="true"></span>
        <span class="item__preco">${formatarPreco(item.preco)}</span>
      </li>`
    )
    .join("");
}

abas.forEach((aba) => {
  aba.addEventListener("click", () => {
    abas.forEach((a) => {
      a.classList.toggle("ativa", a === aba);
      a.setAttribute("aria-selected", a === aba);
    });
    mostrarCategoria(aba.dataset.categoria);
  });
});

mostrarCategoria("cafes");

// ---------- Animação ao rolar (Intersection Observer) ----------

const elementos = document.querySelectorAll(".revelar");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elementos.forEach((el) => observador.observe(el));
} else {
  elementos.forEach((el) => el.classList.add("visivel"));
}

// ---------- Newsletter (validação no front-end) ----------

const formNewsletter = document.getElementById("form-newsletter");
const inputEmail = document.getElementById("email");
const msgNewsletter = document.getElementById("msg-newsletter");

formNewsletter.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim());

  if (!emailValido) {
    msgNewsletter.textContent = "Digite um e-mail válido.";
    inputEmail.focus();
    return;
  }

  // Projeto de estudo: nenhum dado é enviado para servidor
  msgNewsletter.textContent = "Obrigado! Você receberá nossas novidades.";
  formNewsletter.reset();
});
